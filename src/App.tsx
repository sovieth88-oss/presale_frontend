import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Web3Provider } from "./contexts/Web3Context";
import { usePresaleContract } from "./hooks/usePresaleContract";
import Header from "./components/Header";
import Banner from "./components/Banner";
import PresaleModal from "./components/PresaleModal";
import WhitelistChecker from "./components/WhitelistChecker";
import StatsSection from "./components/StatsSection";
import AdminPanel from "./components/AdminPanel";

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    presaleStats,
    userStats,
    buyTokens,
    checkWhitelist,
    isPurchasing,
    clearError
  } = usePresaleContract();

  const handleBuyNowClick = () => {
    setIsModalOpen(true);
    clearError();
  };

  const handlePurchase = async (amount: string) => {
    try {
      await buyTokens(amount);
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  };

  const handleCheckWhitelist = async (address: string): Promise<boolean> => {
    try {
      return await checkWhitelist(address);
    } catch (error) {
      console.error('Whitelist check failed:', error);
      throw error;
    }
  };

  return (
    <div style={{ background: '#000000', minHeight: '100vh', color: '#ffffff' }}>
      <Header onBuyNowClick={handleBuyNowClick} />

      <main>
        {/* Banner Section (matches template) */}
        <Banner
          onBuyNowClick={handleBuyNowClick}
          presaleStats={{
            totalRaised: presaleStats.totalRaised,
            hardcap: presaleStats.hardcap,
            progressPercentage: presaleStats.progressPercentage,
            tokenPrice: presaleStats.tokenPrice
          }}
        />

        {/* Whitelist Checker */}
        <WhitelistChecker
          onCheckWhitelist={handleCheckWhitelist}
          isChecking={isPurchasing}
        />

        {/* Stats Section */}
        <StatsSection
          presaleStats={presaleStats}
          userStats={userStats}
        />
      </main>

      {/* Purchase Modal */}
      <PresaleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPurchase={handlePurchase}
        tokenPrice={presaleStats.tokenPrice}
        maxPurchase={presaleStats.maxPurchase}
        isWhitelisted={userStats.isWhitelisted}
        isPurchasing={isPurchasing}
      />

      {/* Hidden buy button for whitelist checker integration */}
      <button
        data-buy-button
        style={{ display: 'none' }}
        onClick={handleBuyNowClick}
      />
    </div>
  );
};

const AdminPage: React.FC = () => {
  return (
    <div style={{ background: '#000000', minHeight: '100vh', color: '#ffffff' }}>
      <Header />
      <AdminPanel />
    </div>
  );
};

const MainApp: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Web3Provider>
      <MainApp />
    </Web3Provider>
  );
};

export default App;
