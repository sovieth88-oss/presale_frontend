import React, { useState, useEffect, useCallback } from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

interface HeaderProps {
  onBuyNowClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletReady, setIsWalletReady] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const { isConnected, isConnecting, isReconnecting, address, connector } =
    useAccount();

  // Alternative verification using provider check
  const verifyWalletProvider = useCallback(async () => {
    if (!isConnected || !address || !connector) return;

    setIsVerifying(true);
    try {
      const provider = await connector.getProvider();

      // Test if provider is responsive
      if (provider && typeof (provider as any).request === "function") {
        // Try a simple eth_accounts call
        const accounts = await (provider as any).request({
          method: "eth_accounts",
        });

        if (
          accounts &&
          accounts.length > 0 &&
          accounts[0].toLowerCase() === address.toLowerCase()
        ) {
          setIsWalletReady(true);
        } else {
          setIsWalletReady(false);
        }
      } else {
        setIsWalletReady(false);
      }
    } catch (error) {
      console.log("Provider verification failed:", error);
      setIsWalletReady(false);
    } finally {
      setIsVerifying(false);
    }
  }, [isConnected, address, connector]);

  // Check wallet readiness when connection state changes
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isConnected && address && !isConnecting && !isReconnecting) {
      // Give a brief moment for wallet to fully initialize
      timeoutId = setTimeout(() => {
        // Use provider verification instead of signature for less intrusive check
        verifyWalletProvider();
      }, 500);
    } else {
      setIsWalletReady(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [
    isConnected,
    address,
    isConnecting,
    isReconnecting,
    verifyWalletProvider,
  ]);

  // Retry verification periodically if wallet appears connected but not ready
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (
      isConnected &&
      address &&
      !isWalletReady &&
      !isVerifying &&
      !isConnecting &&
      !isReconnecting
    ) {
      intervalId = setInterval(() => {
        verifyWalletProvider();
      }, 2000); // Check every 2 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [
    isConnected,
    address,
    isWalletReady,
    isVerifying,
    isConnecting,
    isReconnecting,
    verifyWalletProvider,
  ]);

  const headerStyle: React.CSSProperties = {
    background: "#000000",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottom: "1px solid rgba(220, 38, 38, 0.3)",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  };

  const headerInnerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "80px",
  };

  const logoStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffffff",
    textDecoration: "none",
  };

  const headerRightStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const headerLinkStyle: React.CSSProperties = {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    transition: "color 0.3s ease",
  };

  const connectWalletBtnStyle: React.CSSProperties = {
    background: "linear-gradient(90deg, #dc2626 0%, #991b1b 100%)",
    backdropFilter: "blur(10px)",
    borderRadius: "25px",
    padding: "12px 24px",
    border: "none",
    fontWeight: "700",
    fontSize: "14px",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: "140px",
    justifyContent: "center",
  };

  const mobileMenuStyle: React.CSSProperties = {
    position: "fixed",
    top: "80px",
    left: 0,
    right: 0,
    background: "#000000",
    borderTop: "1px solid rgba(220, 38, 38, 0.3)",
    padding: "20px",
    display: isMenuOpen ? "block" : "none",
    zIndex: 999,
  };

  const getConnectionStatus = () => {
    if (isConnecting || isReconnecting) {
      return { status: "connecting", text: "Connecting..." };
    }

    if (isConnected && address) {
      if (isVerifying) {
        return { status: "verifying", text: "Verifying..." };
      }

      if (isWalletReady) {
        return { status: "ready", text: "Connected" };
      }

      return { status: "pending", text: "Initializing..." };
    }

    return { status: "disconnected", text: "Connect Wallet" };
  };

  const getButtonContent = (
    _isConnected: boolean,
    _isConnecting: boolean,
    truncatedAddress: string | undefined,
    ensName: string | undefined
  ) => {
    const connectionStatus = getConnectionStatus();

    // Show loading spinner for any loading state
    if (
      connectionStatus.status === "connecting" ||
      connectionStatus.status === "verifying" ||
      connectionStatus.status === "pending"
    ) {
      return (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              border: "2px solid transparent",
              borderTop: "2px solid #ffffff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          {connectionStatus.text}
        </span>
      );
    }

    // Show connected state only when wallet is fully ready
    if (connectionStatus.status === "ready" && (truncatedAddress || ensName)) {
      return (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              background: "#22c55e",
              borderRadius: "50%",
            }}
          />
          <span>{ensName ?? truncatedAddress}</span>
        </span>
      );
    }

    // Default connect button
    return (
      <>
        Connect <span>Wallet</span>
      </>
    );
  };

  const isButtonDisabled = () => {
    const status = getConnectionStatus().status;
    return (
      status === "connecting" || status === "verifying" || status === "pending"
    );
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <header style={headerStyle}>
        <div style={containerStyle}>
          <div style={headerInnerStyle}>
            <a href="/" style={logoStyle}>
              {/* SOVIETH */}
              <img
                loading="lazy"
                src="/site_logo_2.svg"
                alt="Memecoin Site Logo"
              />
            </a>

            <div style={headerRightStyle}>
              <a
                href="/whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={headerLinkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
              >
                Whitepaper
              </a>

              <ConnectKitButton.Custom>
                {({
                  isConnected,
                  isConnecting,
                  show,
                  truncatedAddress,
                  ensName,
                }) => (
                  <button
                    onClick={() => {
                      if (!isButtonDisabled()) {
                        // If wallet appears connected but not ready, try to verify again
                        if (isConnected && !isWalletReady) {
                          verifyWalletProvider();
                        } else {
                          show?.();
                        }
                      }
                    }}
                    style={{
                      ...connectWalletBtnStyle,
                      opacity: isButtonDisabled() ? 0.7 : 1,
                      cursor: isButtonDisabled() ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!isButtonDisabled()) {
                        e.currentTarget.style.background =
                          "linear-gradient(90deg, #991b1b 0%, #7f1d1d 100%)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(90deg, #dc2626 0%, #991b1b 100%)";
                    }}
                    disabled={isButtonDisabled()}
                    title={
                      isConnected && !isWalletReady
                        ? "Wallet detected but not ready. Click to retry verification."
                        : ""
                    }
                  >
                    {getButtonContent(
                      isConnected,
                      isConnecting,
                      truncatedAddress,
                      ensName
                    )}
                  </button>
                )}
              </ConnectKitButton.Custom>

              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: window.innerWidth <= 768 ? "block" : "none",
                  color: "#ffffff",
                  padding: "8px",
                }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "15px" }}>
            <a
              href="/whitepaper.pdf"
              target="_blank"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              Whitepaper
            </a>
          </li>
        </ul>
        <div style={{ marginTop: "20px" }}>
          <ConnectKitButton.Custom>
            {({
              isConnected,
              isConnecting,
              show,
              truncatedAddress,
              ensName,
            }) => (
              <button
                onClick={() => {
                  if (!isButtonDisabled()) {
                    if (isConnected && !isWalletReady) {
                      verifyWalletProvider();
                    } else {
                      show?.();
                    }
                  }
                }}
                style={{
                  ...connectWalletBtnStyle,
                  opacity: isButtonDisabled() ? 0.7 : 1,
                }}
                disabled={isButtonDisabled()}
              >
                {getButtonContent(
                  isConnected,
                  isConnecting,
                  truncatedAddress,
                  ensName
                )}
              </button>
            )}
          </ConnectKitButton.Custom>
        </div>
      </div>
    </>
  );
};

export default Header;
