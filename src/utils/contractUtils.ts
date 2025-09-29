export const PRESALE_CONTRACT_ABI = [
  // Read functions
  "function softcap() view returns (uint256)",
  "function hardcap() view returns (uint256)",
  "function tokenPrice() view returns (uint256)",
  "function maxPurchase() view returns (uint256)",
  "function totalRaised() view returns (uint256)",
  "function totalWithdrawn() view returns (uint256)",
  "function totalParticipants() view returns (uint256)",
  "function whitelist(address) view returns (bool)",
  "function contributions(address) view returns (uint256)",
  "function tokenAllocations(address) view returns (uint256)",
  "function paused() view returns (bool)",
  "function owner() view returns (address)",

  // View functions
  "function isWhitelisted(address user) view returns (bool)",
  "function isSoftcapReached() view returns (bool)",
  "function getPresaleStats() view returns (uint256 _softcap, uint256 _hardcap, uint256 _totalRaised, uint256 _totalWithdrawn, uint256 _totalParticipants, uint256 _contractBalance, bool _isPaused, bool _softcapReached)",
  "function getUserInfo(address user) view returns (uint256 contribution, uint256 tokenAllocation, bool isWhitelistedUser)",

  // Write functions
  "function buyTokens() payable",
  "function addToWhitelist(address[] addresses)",
  "function removeFromWhitelist(address[] addresses)",
  "function withdrawETH(uint256 amount, address payable to)",
  "function updatePresaleConfig(uint256 _softcap, uint256 _hardcap, uint256 _tokenPrice, uint256 _maxPurchase)",
  "function pausePresale()",
  "function unpausePresale()",
  "function emergencyWithdraw()",

  // Events
  "event TokensPurchased(address indexed buyer, uint256 ethAmount, uint256 tokenAmount)",
  "event WhitelistAdded(address[] addresses)",
  "event WhitelistRemoved(address[] addresses)",
  "event ETHWithdrawn(uint256 amount, address indexed to)",
  "event SoftcapReached(uint256 totalRaised)",
  "event PresaleConfigUpdated(uint256 softcap, uint256 hardcap, uint256 tokenPrice, uint256 maxPurchase)",
] as const;

// Contract addresses - Update these after deployment
export const CONTRACT_ADDRESSES = {
  // Update these addresses after deploying to respective networks
  mainnet: "",
  testnet: "0x4A352D535A417cbec0Ab529F7A438669702FBB8C", // Testnet
  localhost: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Local development
  hardhat: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Hardhat local network
} as const;

// Network configuration
export const SUPPORTED_CHAINS = {
  mainnet: 1,
  testnet: 97,
  localhost: 31337,
  hardhat: 31337,
} as const;

// Helper function to get contract address based on chain ID
export const getContractAddress = (chainId: number): string => {
  switch (chainId) {
    case SUPPORTED_CHAINS.mainnet:
      return CONTRACT_ADDRESSES.mainnet;
    case SUPPORTED_CHAINS.testnet:
      return CONTRACT_ADDRESSES.testnet;
    case SUPPORTED_CHAINS.localhost:
    case SUPPORTED_CHAINS.hardhat:
      return CONTRACT_ADDRESSES.localhost || CONTRACT_ADDRESSES.hardhat;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};

// Helper function to format ETH values
export const formatEthValue = (value: bigint, decimals: number = 4): string => {
  const ethValue = Number(value) / 1e18;
  return ethValue.toFixed(decimals);
};

// Helper function to parse ETH values
export const parseEthValue = (value: string): bigint => {
  return BigInt(Math.floor(parseFloat(value) * 1e18));
};

// Helper function to calculate token amount
export const calculateTokenAmount = (
  ethAmount: string,
  tokenPrice: string
): string => {
  if (!ethAmount || !tokenPrice || parseFloat(tokenPrice) === 0) {
    return "0";
  }

  const tokens = parseFloat(ethAmount) / parseFloat(tokenPrice);
  return tokens.toFixed(6);
};

// Helper function to calculate progress percentage
export const calculateProgress = (raised: string, hardcap: string): number => {
  if (!raised || !hardcap || parseFloat(hardcap) === 0) {
    return 0;
  }

  const progress = (parseFloat(raised) / parseFloat(hardcap)) * 100;
  return Math.min(progress, 100);
};

// Validation helpers
export const validateEthAmount = (
  amount: string,
  maxPurchase: string,
  userBalance: string
): { isValid: boolean; error?: string } => {
  const amountNum = parseFloat(amount);
  const maxNum = parseFloat(maxPurchase);
  const balanceNum = parseFloat(userBalance);

  if (!amount || amountNum <= 0) {
    return { isValid: false, error: "Please enter a valid amount" };
  }

  if (amountNum > maxNum) {
    return { isValid: false, error: `Maximum purchase is ${maxPurchase} ETH` };
  }

  if (amountNum > balanceNum) {
    return { isValid: false, error: "Insufficient balance" };
  }

  return { isValid: true };
};

// Error handling helper
export const handleContractError = (error: any): string => {
  if (error?.message?.includes("user rejected")) {
    return "Transaction was rejected by user";
  }

  if (error?.message?.includes("insufficient funds")) {
    return "Insufficient funds for transaction";
  }

  if (error?.message?.includes("Address not whitelisted")) {
    return "Your address is not whitelisted for this presale";
  }

  if (error?.message?.includes("Above maximum purchase")) {
    return "Purchase amount exceeds maximum allowed";
  }

  if (error?.message?.includes("Would exceed hardcap")) {
    return "Purchase would exceed presale hardcap";
  }

  if (error?.message?.includes("Presale is paused")) {
    return "Presale is currently paused";
  }

  // Generic fallback
  return error?.message || "Transaction failed. Please try again.";
};
