import React from 'react';
import { useAccount } from 'wagmi';

interface StatsSectionProps {
  presaleStats: {
    totalRaised: string;
    totalWithdrawn: string;
    totalParticipants: number;
    contractBalance: string;
    hardcap: string;
    progressPercentage: number;
  };
  userStats: {
    contribution: string;
    tokenAllocation: string;
    isWhitelisted: boolean;
  };
}

const StatsSection: React.FC<StatsSectionProps> = ({ presaleStats, userStats }) => {
  const { address, isConnected } = useAccount();

  const StatCard: React.FC<{
    title: string;
    value: string;
    subtitle?: string;
    highlight?: boolean;
    emoji?: string;
  }> = ({ title, value, subtitle, highlight = false, emoji }) => {
    const cardStyle: React.CSSProperties = {
      background: highlight ? 'rgba(220, 38, 38, 0.1)' : 'rgba(255, 255, 255, 0.05)',
      border: highlight ? '1px solid rgba(220, 38, 38, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      padding: '24px',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    };

    const emojiStyle: React.CSSProperties = {
      fontSize: '28px',
      marginBottom: '12px',
      display: 'block',
      textAlign: 'center',
      filter: highlight ? 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))' : 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))'
    };

    const titleStyle: React.CSSProperties = {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px',
      textAlign: 'center'
    };

    const valueStyle: React.CSSProperties = {
      fontSize: '24px',
      fontWeight: 'bold',
      color: highlight ? '#dc2626' : '#ffffff',
      marginBottom: '4px'
    };

    const subtitleStyle: React.CSSProperties = {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '12px'
    };

    return (
      <div
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.background = highlight
            ? 'rgba(220, 38, 38, 0.15)'
            : 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.borderColor = highlight
            ? 'rgba(220, 38, 38, 0.7)'
            : 'rgba(255, 255, 255, 0.3)';
          e.currentTarget.style.boxShadow = highlight
            ? '0 20px 40px rgba(220, 38, 38, 0.2)'
            : '0 20px 40px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.background = highlight
            ? 'rgba(220, 38, 38, 0.1)'
            : 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = highlight
            ? 'rgba(220, 38, 38, 0.5)'
            : 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {emoji && <span style={emojiStyle}>{emoji}</span>}
        <h3 style={titleStyle}>{title}</h3>
        <p style={valueStyle}>{value}</p>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      </div>
    );
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
    marginBottom: '60px',
    fontSize: '16px',
    maxWidth: '600px',
    margin: '0 auto 60px auto'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '30px'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '60px'
  };

  const progressSectionStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto 60px auto'
  };

  const progressHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  };

  const progressLabelStyle: React.CSSProperties = {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '16px'
  };

  const progressValueStyle: React.CSSProperties = {
    color: '#dc2626',
    fontWeight: 'bold',
    fontSize: '18px'
  };

  const progressBarContainerStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    height: '24px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const progressBarStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #dc2626 0%, #991b1b 100%)',
    height: '100%',
    borderRadius: '20px',
    width: `${presaleStats.progressPercentage}%`,
    transition: 'width 1s ease-in-out',
    position: 'relative'
  };

  const progressLabelsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)'
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>
          Presale <span style={titleSpanStyle}>Statistics</span>
        </h2>
        <p style={subtitleStyle}>
          Real-time data about the Sovieth presale progress and your participation
        </p>

        {/* Global Presale Stats */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={sectionTitleStyle}>Global Presale Data</h3>
          <div style={gridStyle}>
            <StatCard
              title="Total Raised"
              value={`${presaleStats.totalRaised} ETH`}
              subtitle={`${presaleStats.progressPercentage}% of hardcap`}
              highlight
              emoji="🚀"
            />
            <StatCard
              title="Hardcap"
              value={`${presaleStats.hardcap} ETH`}
              subtitle="Maximum funding goal"
              emoji="🎯"
            />
            <StatCard
              title="Participants"
              value={presaleStats.totalParticipants.toString()}
              subtitle="Unique contributors"
              emoji="👥"
            />
            <StatCard
              title="Available Balance"
              value={`${presaleStats.contractBalance} ETH`}
              subtitle="Contract balance"
              emoji="💰"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div style={progressSectionStyle}>
          <div style={progressHeaderStyle}>
            <span style={progressLabelStyle}>Presale Progress</span>
            <span style={progressValueStyle}>{presaleStats.progressPercentage}%</span>
          </div>
          <div style={progressBarContainerStyle}>
            <div style={progressBarStyle}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255, 255, 255, 0.2)',
                animation: 'pulse 2s infinite'
              }}></div>
            </div>
          </div>
          <div style={progressLabelsStyle}>
            <span>0 ETH</span>
            <span>{presaleStats.hardcap} ETH</span>
          </div>
        </div>

        {/* User Stats (if connected) */}
        {isConnected && address && (
          <div>
            <h3 style={sectionTitleStyle}>Your Participation</h3>
            <div style={{ ...gridStyle, maxWidth: '900px', margin: '0 auto 40px auto' }}>
              <StatCard
                title="Your Contribution"
                value={`${userStats.contribution} ETH`}
                subtitle="Total invested"
                emoji="💸"
              />
              <StatCard
                title="Token Allocation"
                value={`${parseFloat(userStats.tokenAllocation).toLocaleString()}`}
                subtitle="SOVIETH tokens"
                highlight
                emoji="💎"
              />
              <StatCard
                title="Whitelist Status"
                value={userStats.isWhitelisted ? "Approved" : "Not Listed"}
                subtitle={userStats.isWhitelisted ? "Eligible to buy" : "Contact team"}
                emoji={userStats.isWhitelisted ? "✅" : "❌"}
              />
            </div>

            {/* User Address Display */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '20px',
                maxWidth: '400px',
                margin: '0 auto',
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginBottom: '8px' }}>
                  Connected Address
                </p>
                <p style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: '14px' }}>
                  {address.slice(0, 6)}...{address.slice(-4)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Not Connected State */}
        {!isConnected && (
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '40px',
              maxWidth: '400px',
              margin: '0 auto',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔗</div>
              <h3 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '12px' }}>
                Connect Your Wallet
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                Connect your wallet to view your personal presale statistics and participation details.
              </p>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginTop: '60px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '32px'
          }}>
            <h4 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '16px' }}>
              📊 How It Works
            </h4>
            <ul style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              lineHeight: '1.6',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>• Only whitelisted addresses can participate</li>
              <li style={{ marginBottom: '8px' }}>• No time limit - presale runs until manually stopped</li>
              <li style={{ marginBottom: '8px' }}>• Tokens will be distributed after launch</li>
              <li>• Admin can withdraw funds before hardcap</li>
            </ul>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '32px'
          }}>
            <h4 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '16px' }}>
              🎯 Key Features
            </h4>
            <ul style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              lineHeight: '1.6',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>• Secure smart contract with audited code</li>
              <li style={{ marginBottom: '8px' }}>• Real-time progress tracking</li>
              <li style={{ marginBottom: '8px' }}>• Transparent allocation system</li>
              <li>• Emergency pause functionality</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;