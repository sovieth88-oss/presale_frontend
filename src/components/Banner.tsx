import React from "react";

interface BannerProps {
  onBuyNowClick: () => void;
  presaleStats: {
    totalRaised: string;
    softcap: string;
    hardcap: string;
    progressPercentage: number;
    softcapProgressPercentage: number;
    tokenPrice: string;
  };
}

const Banner: React.FC<BannerProps> = ({ onBuyNowClick, presaleStats }) => {
  const bannerSectionStyle: React.CSSProperties = {
    background: "#000000",
    minHeight: "100vh",
    padding: "168px 0 40px 0",
    position: "relative",
    zIndex: 0,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  };

  const bannerContentStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#ffffff",
  };

  const featuresStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 0,
    margin: "30px 0",
    gap: "20px",
  };

  const featureItemStyle: React.CSSProperties = {
    background:
      "linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(153, 27, 27, 0.1))",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(220, 38, 38, 0.3)",
    borderRadius: "16px",
    padding: "20px 24px",
    minWidth: "140px",
    textAlign: "center",
    color: "#ffffff",
    transition: "all 0.3s ease",
    cursor: "default",
  };

  const featureEmojiStyle: React.CSSProperties = {
    fontSize: "32px",
    display: "block",
    marginBottom: "8px",
    filter: "drop-shadow(0 0 10px rgba(220, 38, 38, 0.5))",
  };

  const featureTextStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
    lineHeight: "1.2",
  };

  const progressSectionStyle: React.CSSProperties = {
    maxWidth: "770px",
    width: "100%",
    margin: "auto",
    marginBottom: "1.5%",
    marginTop: "2%",
  };

  const progressTopTextStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "11px",
  };

  const progressTextStyle: React.CSSProperties = {
    marginBottom: "0",
    fontWeight: "600",
    fontSize: "15px",
    lineHeight: "30px",
    textTransform: "uppercase",
    color: "#ffffff",
  };

  const progressBarContainerStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px dashed rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    padding: "8px",
    position: "relative",
  };

  const progressBarInnerStyle: React.CSSProperties = {
    background: "#dc2626",
    borderRadius: "12px",
    padding: "4px 6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: `${presaleStats.progressPercentage}%`,
    transition: "width 0.3s ease",
  };

  const progressBarTextStyle: React.CSSProperties = {
    fontWeight: "700",
    fontSize: "12px",
    lineHeight: "125%",
    textAlign: "right",
    color: "#ffffff",
  };

  const mainTitleStyle: React.CSSProperties = {
    fontSize: "48px",
    fontWeight: "bold",
    margin: "20px 0",
    color: "#ffffff",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "18px",
    margin: "20px 0",
    color: "#ffffff",
    fontWeight: "400",
  };

  const priceTextStyle: React.CSSProperties = {
    margin: "30px 0",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  };

  const priceLineStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
  };

  const buyBtnStyle: React.CSSProperties = {
    background: "linear-gradient(90deg, #dc2626 0%, #991b1b 100%)",
    border: "none",
    borderRadius: "50px",
    padding: "15px 40px",
    fontSize: "18px",
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    margin: "20px 0",
  };

  const socialLinksStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    margin: "40px 0",
    listStyle: "none",
    padding: 0,
  };

  const socialLinkStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    textDecoration: "none",
  };

  return (
    <section style={bannerSectionStyle}>
      <div style={containerStyle}>
        <div style={bannerContentStyle}>
          <h5 style={{ ...progressTextStyle, marginBottom: "20px" }}>
            Pre-Sale Active
          </h5>

          <div style={featuresStyle}>
            <div
              style={featureItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-5px) scale(1.05)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(153, 27, 27, 0.2))";
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(153, 27, 27, 0.1))";
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.3)";
              }}
            >
              <span style={featureEmojiStyle}>⚡</span>
              <span style={featureTextStyle}>
                Cheapest
                <br />
                Price
              </span>
            </div>
            <div
              style={featureItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-5px) scale(1.05)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(153, 27, 27, 0.2))";
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(153, 27, 27, 0.1))";
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.3)";
              }}
            >
              <span style={featureEmojiStyle}>🔓</span>
              <span style={featureTextStyle}>
                No Lock
                <br />
                Up
              </span>
            </div>
            <div
              style={featureItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-5px) scale(1.05)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(153, 27, 27, 0.2))";
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(153, 27, 27, 0.1))";
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.3)";
              }}
            >
              <span style={featureEmojiStyle}>💎</span>
              <span style={featureTextStyle}>
                Early Holder
                <br />
                Benefits
              </span>
            </div>
          </div>

          <h2 style={mainTitleStyle}>The People's ETH</h2>
          <h5 style={subtitleStyle}>
            Join the movement, stake your claim, and rise in ranks.
          </h5>

          <div style={progressSectionStyle}>
            <div style={progressTopTextStyle}>
              <p style={progressTextStyle}>Stage 1: Active!</p>
              <p style={progressTextStyle}>
                {presaleStats.totalRaised} / {presaleStats.hardcap} ETH —{" "}
                {Math.round(presaleStats.progressPercentage)}%
              </p>
            </div>
            <div style={progressBarContainerStyle}>
              <div style={progressBarInnerStyle}>
                {/* Softcap marker */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "0px",
                    bottom: "-8px",
                    width: "2px",
                    height: "37px",
                    background: "#fbbf24",
                    zIndex: 10,
                  }}
                ></div>
                <span style={progressBarTextStyle}>
                  {Math.round(presaleStats.progressPercentage)}%
                </span>
              </div>
            </div>

            {/* Progress labels with softcap */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.6)",
                position: "relative",
              }}
            >
              <span>0 ETH</span>
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#fbbf24",
                  fontWeight: "bold",
                }}
              >
                Softcap: {presaleStats.softcap} ETH
              </span>
              <span>{presaleStats.hardcap} ETH</span>
            </div>
          </div>

          <div style={priceTextStyle}>
            <p style={priceLineStyle}>
              Price: 1M{" "}
              <span style={{ color: "#dc2626", fontWeight: "bold" }}>
                SOVIETH
              </span>{" "}
              = 0.25 ETH
            </p>
          </div>

          <button
            style={buyBtnStyle}
            onClick={onBuyNowClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(90deg, #991b1b 0%, #7f1d1d 100%)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(90deg, #dc2626 0%, #991b1b 100%)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Buy Now, Comrade
          </button>

          <div style={socialLinksStyle}>
            <a
              href="https://telegram.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#dc2626";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
              </svg>
            </a>
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#dc2626";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
              </svg>
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#dc2626";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
