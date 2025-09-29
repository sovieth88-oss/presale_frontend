import React, { useState } from 'react';
import { isAddress } from 'viem';

interface WhitelistCheckerProps {
  onCheckWhitelist: (address: string) => Promise<boolean>;
  isChecking: boolean;
}

const WhitelistChecker: React.FC<WhitelistCheckerProps> = ({
  onCheckWhitelist,
  isChecking
}) => {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<{ address: string; isWhitelisted: boolean } | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setError('');
    setResult(null);

    if (!address) {
      setError('Please enter an address');
      return;
    }

    if (!isAddress(address)) {
      setError('Invalid Ethereum address');
      return;
    }

    try {
      const isWhitelisted = await onCheckWhitelist(address);
      setResult({ address, isWhitelisted });
    } catch (error) {
      setError('Failed to check whitelist status');
      console.error('Whitelist check error:', error);
    }
  };

  const handleClear = () => {
    setAddress('');
    setResult(null);
    setError('');
  };

  const sectionStyle: React.CSSProperties = {
    padding: '80px 0',
    background: '#000000'
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '20px'
  };

  const titleSpanStyle: React.CSSProperties = {
    color: '#dc2626'
  };

  const subtitleStyle: React.CSSProperties = {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '40px',
    fontSize: '16px'
  };

  const checkerCardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
    backdropFilter: 'blur(10px)'
  };

  const inputSectionStyle: React.CSSProperties = {
    marginBottom: '30px'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '12px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500'
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '15px',
    alignItems: 'stretch'
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '15px',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  const checkButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #dc2626 0%, #991b1b 100%)',
    border: 'none',
    borderRadius: '12px',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    cursor: isChecking ? 'not-allowed' : 'pointer',
    opacity: isChecking ? 0.7 : 1,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap'
  };

  const resultCardStyle: React.CSSProperties = {
    padding: '30px',
    borderRadius: '16px',
    textAlign: 'center',
    marginBottom: '20px',
    border: '1px solid',
    borderColor: result?.isWhitelisted ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)',
    background: result?.isWhitelisted ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '48px',
    marginBottom: '20px'
  };

  const resultTitleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: result?.isWhitelisted ? '#22c55e' : '#ef4444'
  };

  const addressStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    marginBottom: '15px'
  };

  const resultMessageStyle: React.CSSProperties = {
    color: result?.isWhitelisted ? '#86efac' : '#fca5a5',
    fontSize: '16px'
  };

  const actionButtonsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px'
  };

  const clearButtonStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '12px 24px',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const buyButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #dc2626 0%, #991b1b 100%)',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600'
  };

  const errorStyle: React.CSSProperties = {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.5)',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#ef4444'
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>
          Whitelist <span style={titleSpanStyle}>Checker</span>
        </h2>
        <p style={subtitleStyle}>
          Check if your address is whitelisted for the Sovieth presale
        </p>

        <div style={checkerCardStyle}>
          {/* Address Input */}
          <div style={inputSectionStyle}>
            <label style={labelStyle}>Ethereum Address</label>
            <div style={inputContainerStyle}>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x1234...abcd"
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = '#dc2626'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
              />
              <button
                onClick={handleCheck}
                disabled={isChecking}
                style={checkButtonStyle}
                onMouseEnter={(e) => {
                  if (!isChecking) {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #991b1b 0%, #7f1d1d 100%)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isChecking) {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #dc2626 0%, #991b1b 100%)';
                  }
                }}
              >
                {isChecking ? 'Checking...' : 'Check'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={errorStyle}>
              <p>{error}</p>
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div style={resultCardStyle}>
              <div style={iconStyle}>
                {result.isWhitelisted ? '✅' : '❌'}
              </div>
              <h3 style={resultTitleStyle}>
                {result.isWhitelisted ? 'Whitelisted!' : 'Not Whitelisted'}
              </h3>
              <p style={addressStyle}>
                Address: {result.address.slice(0, 6)}...{result.address.slice(-4)}
              </p>
              <p style={resultMessageStyle}>
                {result.isWhitelisted
                  ? 'You are eligible to participate in the presale!'
                  : 'This address is not currently whitelisted for the presale.'}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {result && (
            <div style={actionButtonsStyle}>
              <button
                onClick={handleClear}
                style={clearButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                Check Another Address
              </button>
              {result.isWhitelisted && (
                <button
                  onClick={() => {
                    const buyButton = document.querySelector('[data-buy-button]') as HTMLButtonElement;
                    if (buyButton) {
                      buyButton.click();
                    }
                  }}
                  style={buyButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #991b1b 0%, #7f1d1d 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #dc2626 0%, #991b1b 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Buy Tokens Now
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhitelistChecker;