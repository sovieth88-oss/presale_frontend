import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import {
  PRESALE_CONTRACT_ABI,
  getContractAddress,
  formatEthValue,
  calculateProgress,
  handleContractError
} from '../utils/contractUtils';

export interface PresaleStats {
  totalRaised: string;
  totalWithdrawn: string;
  totalParticipants: number;
  contractBalance: string;
  hardcap: string;
  tokenPrice: string;
  maxPurchase: string;
  progressPercentage: number;
  isPaused: boolean;
}

export interface UserStats {
  contribution: string;
  tokenAllocation: string;
  isWhitelisted: boolean;
}

export const usePresaleContract = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { writeContract, data: hash, isPending: isWritePending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [contractAddress, setContractAddress] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [presaleStats, setPresaleStats] = useState<PresaleStats>({
    totalRaised: '0',
    totalWithdrawn: '0',
    totalParticipants: 0,
    contractBalance: '0',
    hardcap: '100',
    tokenPrice: '0.001',
    maxPurchase: '5',
    progressPercentage: 0,
    isPaused: false
  });
  const [userStats, setUserStats] = useState<UserStats>({
    contribution: '0',
    tokenAllocation: '0',
    isWhitelisted: false
  });

  // Get contract address based on current chain
  useEffect(() => {
    try {
      const addr = getContractAddress(chainId);
      setContractAddress(addr);
      setError('');
    } catch (err) {
      setError('Unsupported network. Please switch to a supported network.');
      setContractAddress('');
    }
  }, [chainId]);

  // Contract read configurations
  const contractConfig = {
    address: contractAddress as `0x${string}`,
    abi: PRESALE_CONTRACT_ABI,
  };

  // Read contract data
  const { data: presaleData, refetch: refetchPresaleStats } = useReadContract({
    ...contractConfig,
    functionName: 'getPresaleStats',
    query: { enabled: !!contractAddress }
  });

  const { data: hardcapData } = useReadContract({
    ...contractConfig,
    functionName: 'hardcap',
    query: { enabled: !!contractAddress }
  });

  const { data: tokenPriceData } = useReadContract({
    ...contractConfig,
    functionName: 'tokenPrice',
    query: { enabled: !!contractAddress }
  });


  const { data: maxPurchaseData } = useReadContract({
    ...contractConfig,
    functionName: 'maxPurchase',
    query: { enabled: !!contractAddress }
  });

  const { data: userData, refetch: refetchUserStats } = useReadContract({
    ...contractConfig,
    functionName: 'getUserInfo',
    args: address ? [address] : undefined,
    query: { enabled: !!contractAddress && !!address }
  });

  // Update presale stats when data changes
  useEffect(() => {
    if (presaleData && hardcapData && tokenPriceData && maxPurchaseData) {
      // Type check and ensure data is properly formatted
      const statsArray = Array.isArray(presaleData) ? presaleData : [];
      if (statsArray.length >= 5) {
        const [totalRaised, totalWithdrawn, totalParticipants, contractBalance, isPaused] = statsArray;

        // Helper function to safely convert to bigint
        const safeBigInt = (value: any): bigint => {
          if (typeof value === 'bigint') return value;
          if (typeof value === 'string' || typeof value === 'number') return BigInt(value);
          return BigInt(0);
        };

        const raisedEth = formatEthValue(safeBigInt(totalRaised));
        const hardcapEth = formatEthValue(safeBigInt(hardcapData));

        setPresaleStats({
          totalRaised: raisedEth,
          totalWithdrawn: formatEthValue(safeBigInt(totalWithdrawn)),
          totalParticipants: Number(totalParticipants || 0),
          contractBalance: formatEthValue(safeBigInt(contractBalance)),
          hardcap: hardcapEth,
          tokenPrice: formatEthValue(safeBigInt(tokenPriceData)),
          maxPurchase: formatEthValue(safeBigInt(maxPurchaseData)),
          progressPercentage: calculateProgress(raisedEth, hardcapEth),
          isPaused: Boolean(isPaused)
        });
      }
    }
  }, [presaleData, hardcapData, tokenPriceData, maxPurchaseData]);

  // Update user stats when data changes
  useEffect(() => {
    if (userData && isConnected) {
      // Type check and ensure data is properly formatted
      const userArray = Array.isArray(userData) ? userData : [];
      if (userArray.length >= 3) {
        const [contribution, tokenAllocation, isWhitelisted] = userArray;

        // Helper function to safely convert to bigint
        const safeBigInt = (value: any): bigint => {
          if (typeof value === 'bigint') return value;
          if (typeof value === 'string' || typeof value === 'number') return BigInt(value);
          return BigInt(0);
        };

        setUserStats({
          contribution: formatEthValue(safeBigInt(contribution)),
          tokenAllocation: formatEthValue(safeBigInt(tokenAllocation)),
          isWhitelisted: Boolean(isWhitelisted)
        });
      }
    } else {
      setUserStats({
        contribution: '0',
        tokenAllocation: '0',
        isWhitelisted: false
      });
    }
  }, [userData, isConnected]);

  // Buy tokens function
  const buyTokens = async (ethAmount: string) => {
    if (!contractAddress) {
      throw new Error('Contract not available on this network');
    }

    try {
      setError('');
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: PRESALE_CONTRACT_ABI,
        functionName: 'buyTokens',
        value: parseEther(ethAmount)
      });
    } catch (err: any) {
      const errorMessage = handleContractError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Check whitelist status
  const checkWhitelist = async (_userAddress: string): Promise<boolean> => {
    if (!contractAddress) {
      throw new Error('Contract not available on this network');
    }

    try {
      const { data } = await refetchUserStats();
      if (data && Array.isArray(data) && data.length >= 3) {
        const [, , isWhitelisted] = data;
        return Boolean(isWhitelisted);
      }
      return false;
    } catch (err) {
      console.error('Error checking whitelist:', err);
      throw err;
    }
  };

  // Admin functions
  const withdrawETH = async (amount: string, recipient: string) => {
    if (!contractAddress) {
      throw new Error('Contract not available on this network');
    }

    try {
      setError('');
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: PRESALE_CONTRACT_ABI,
        functionName: 'withdrawETH',
        args: [parseEther(amount), recipient as `0x${string}`]
      });
    } catch (err: any) {
      const errorMessage = handleContractError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const addToWhitelist = async (addresses: string[]) => {
    if (!contractAddress) {
      throw new Error('Contract not available on this network');
    }

    try {
      setError('');
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: PRESALE_CONTRACT_ABI,
        functionName: 'addToWhitelist',
        args: [addresses as `0x${string}`[]]
      });
    } catch (err: any) {
      const errorMessage = handleContractError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const removeFromWhitelist = async (addresses: string[]) => {
    if (!contractAddress) {
      throw new Error('Contract not available on this network');
    }

    try {
      setError('');
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: PRESALE_CONTRACT_ABI,
        functionName: 'removeFromWhitelist',
        args: [addresses as `0x${string}`[]]
      });
    } catch (err: any) {
      const errorMessage = handleContractError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const pausePresale = async () => {
    if (!contractAddress) {
      throw new Error('Contract not available on this network');
    }

    try {
      setError('');
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: PRESALE_CONTRACT_ABI,
        functionName: 'pausePresale'
      });
    } catch (err: any) {
      const errorMessage = handleContractError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const unpausePresale = async () => {
    if (!contractAddress) {
      throw new Error('Contract not available on this network');
    }

    try {
      setError('');
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: PRESALE_CONTRACT_ABI,
        functionName: 'unpausePresale'
      });
    } catch (err: any) {
      const errorMessage = handleContractError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updatePresaleConfig = async (
    hardcap: string,
    tokenPrice: string,
    maxPurchase: string
  ) => {
    if (!contractAddress) {
      throw new Error('Contract not available on this network');
    }

    try {
      setError('');
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: PRESALE_CONTRACT_ABI,
        functionName: 'updatePresaleConfig',
        args: [
          parseEther(hardcap),
          parseEther(tokenPrice),
          parseEther(maxPurchase)
        ]
      });
    } catch (err: any) {
      const errorMessage = handleContractError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Refresh data
  const refreshData = () => {
    refetchPresaleStats();
    refetchUserStats();
  };

  return {
    // State
    presaleStats,
    userStats,
    contractAddress,
    error,

    // Transaction states
    isPurchasing: isWritePending || isConfirming,
    isConfirmed,
    transactionHash: hash,

    // Functions
    buyTokens,
    checkWhitelist,
    refreshData,

    // Admin functions
    withdrawETH,
    addToWhitelist,
    removeFromWhitelist,
    pausePresale,
    unpausePresale,
    updatePresaleConfig,

    // Utils
    clearError: () => setError('')
  };
};