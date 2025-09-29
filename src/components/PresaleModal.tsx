import React, { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';

interface PresaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: string) => Promise<void>;
  tokenPrice: string;
  maxPurchase: string;
  isWhitelisted: boolean;
  isPurchasing: boolean;
}

const PresaleModal: React.FC<PresaleModalProps> = ({
  isOpen,
  onClose,
  onPurchase,
  tokenPrice,
  maxPurchase,
  isWhitelisted,
  isPurchasing
}) => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [ethAmount, setEthAmount] = useState('0.1');
  const [tokenAmount, setTokenAmount] = useState('0');

  // Calculate token amount when ETH amount changes
  useEffect(() => {
    if (ethAmount && tokenPrice && parseFloat(tokenPrice) > 0) {
      const tokens = parseFloat(ethAmount) / parseFloat(tokenPrice);
      setTokenAmount(tokens.toFixed(6));
    } else {
      setTokenAmount('0');
    }
  }, [ethAmount, tokenPrice]);

  const handlePurchase = async () => {
    if (!isWhitelisted) {
      alert('Address not whitelisted');
      return;
    }

    if (parseFloat(ethAmount) <= 0) {
      alert('Please enter a valid purchase amount');
      return;
    }

    if (parseFloat(ethAmount) > parseFloat(maxPurchase)) {
      alert(`Maximum purchase is ${maxPurchase} ETH`);
      return;
    }

    try {
      await onPurchase(ethAmount);
      onClose();
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  if (!isOpen) return null;

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalContentStyle: React.CSSProperties = {
    background: '#000000',
    border: '1px solid rgba(220, 38, 38, 0.3)',
    borderRadius: '20px',
    maxWidth: '480px',
    width: '90%',
    margin: '20px',
    overflow: 'hidden'
  };

  const modalHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 30px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const modalTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ffffff',
    margin: 0
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    color: '#ffffff'
  };

  const modalBodyStyle: React.CSSProperties = {
    padding: '30px'
  };

  const balanceStyle: React.CSSProperties = {
    marginBottom: '20px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600'
  };

  const inputSectionStyle: React.CSSProperties = {
    marginBottom: '20px'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500'
  };

  const inputDropdownStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    overflow: 'hidden'
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    padding: '15px',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none'
  };

  const tokenDropdownStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    fontWeight: '600'
  };

  const tokenListStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0',
    fontSize: '14px'
  };

  const tokenListItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    color: '#ffffff'
  };

  const approveButtonStyle: React.CSSProperties = {
    width: '100%',
    background: 'linear-gradient(90deg, #dc2626 0%, #991b1b 100%)',
    border: 'none',
    borderRadius: '50px',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#ffffff',
    cursor: isPurchasing || !isWhitelisted ? 'not-allowed' : 'pointer',
    opacity: isPurchasing || !isWhitelisted ? 0.6 : 1,
    transition: 'all 0.3s ease'
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeaderStyle}>
          <h1 style={modalTitleStyle}>Be an early investor</h1>
          <button style={closeButtonStyle} onClick={onClose}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div style={modalBodyStyle}>
          <h5 style={balanceStyle}>
            BALANCE : <span style={{ color: isWhitelisted ? '#22c55e' : '#ef4444' }}>
              {balance ? `${parseFloat(formatEther(balance.value)).toFixed(4)} ETH` : '0 ETH'}
            </span>
          </h5>

          <div style={inputSectionStyle}>
            <label style={labelStyle}>Amount</label>
            <div style={inputDropdownStyle}>
              <input
                type="number"
                placeholder="0"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                style={inputStyle}
                step="0.001"
                min="0"
              />
              <div style={tokenDropdownStyle}>
                <span>ETH</span>
              </div>
            </div>
          </div>

          <div style={inputSectionStyle}>
            <label style={labelStyle}>Get Amount (SOVIETH)</label>
            <input
              type="text"
              value={tokenAmount}
              disabled
              style={{
                ...inputStyle,
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '15px'
              }}
            />
          </div>

          <ul style={tokenListStyle}>
            <li style={tokenListItemStyle}>
              <span>Price</span>
              <span>{tokenPrice} ETH</span>
            </li>
            <li style={tokenListItemStyle}>
              <span>Status</span>
              <span style={{ color: isWhitelisted ? '#22c55e' : '#ef4444' }}>
                {isWhitelisted ? 'Whitelisted' : 'Not Whitelisted'}
              </span>
            </li>
            <li style={tokenListItemStyle}>
              <span>Total Amount</span>
              <span>{tokenAmount} SOVIETH</span>
            </li>
          </ul>

          <button
            style={approveButtonStyle}
            onClick={handlePurchase}
            disabled={!isWhitelisted || isPurchasing || !ethAmount || parseFloat(ethAmount) <= 0}
            onMouseEnter={(e) => {
              if (!isPurchasing && isWhitelisted) {
                e.currentTarget.style.background = 'linear-gradient(90deg, #991b1b 0%, #7f1d1d 100%)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isPurchasing && isWhitelisted) {
                e.currentTarget.style.background = 'linear-gradient(90deg, #dc2626 0%, #991b1b 100%)';
              }
            }}
          >
            {isPurchasing ? 'Processing...' : !isWhitelisted ? 'Not Whitelisted' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresaleModal;