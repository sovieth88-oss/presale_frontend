import React from 'react';
import { useAccount } from 'wagmi';

interface StatsSectionProps {
  presaleStats: {
    totalRaised: string;
    totalWithdrawn: string;
    totalParticipants: number;
    contractBalance: string;
    softcap: string;
    hardcap: string;
    progressPercentage: number;
    softcapProgressPercentage: number;
    softcapReached: boolean;
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
          SoviETH War Chest <span style={titleSpanStyle}>(Live Data)</span>
        </h2>
        <p style={subtitleStyle}>
          Real-time intelligence on the people's revolution and your comrade status
        </p>

        {/* Global Presale Stats */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={sectionTitleStyle}>Revolutionary Treasury Status</h3>
          <div style={gridStyle}>
            <StatCard
              title="Raised"
              value={`${presaleStats.totalRaised} ETH`}
              subtitle={`${presaleStats.progressPercentage}% of target`}
              highlight
              emoji="🚀"
            />
            <StatCard
              title="Soft/Hard Cap"
              value={`${presaleStats.softcap}/${presaleStats.hardcap} ETH`}
              subtitle={presaleStats.softcapReached ? "✅ Softcap achieved!" : "Min/Max funding goals"}
              emoji="🎯"
            />
            <StatCard
              title="Participants"
              value={`${presaleStats.totalParticipants} comrades`}
              subtitle="enlisted"
              emoji="👥"
            />
            <StatCard
              title="Contract Balance"
              value={`${presaleStats.contractBalance} ETH`}
              subtitle="War chest balance"
              emoji="💰"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div style={progressSectionStyle}>
          <div style={progressHeaderStyle}>
            <span style={progressLabelStyle}>Progress</span>
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
            <span style={{ color: '#fbbf24' }}>{presaleStats.softcap} ETH (Softcap)</span>
            <span>{presaleStats.hardcap} ETH</span>
          </div>
        </div>

        {/* User Stats (if connected) */}
        {isConnected && address && (
          <div>
            <h3 style={sectionTitleStyle}>Your Comrade Status</h3>
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
                title="Comrade Status"
                value={userStats.isWhitelisted ? "Cleared for ranks" : "Not Listed"}
                subtitle={userStats.isWhitelisted ? "Ready to enlist" : "Contact command"}
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
              <li style={{ marginBottom: '8px' }}>• Only whitelisted comrades may enlist</li>
              <li style={{ marginBottom: '8px' }}>• No fixed end — presale continues until hardcap</li>
              <li style={{ marginBottom: '8px' }}>• Tokens distributed after Uniswap deployment</li>
              <li>• Command can withdraw for treasury needs</li>
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
              <li style={{ marginBottom: '8px' }}>🔒 Immutable + audited contracts</li>
              <li style={{ marginBottom: '8px' }}>📈 On-chain progress tracking</li>
              <li style={{ marginBottom: '8px' }}>🪧 Transparent allocation — no tricks</li>
              <li style={{ marginBottom: '8px' }}>⛔ Emergency pause (multisig control)</li>
              <li>🛡️ Community-led treasury, not individuals</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;