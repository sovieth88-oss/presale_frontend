import React from 'react';

interface HeroProps {
  onBuyNowClick: () => void;
  presaleStats: {
    totalRaised: string;
    hardcap: string;
    progressPercentage: number;
    tokenPrice: string;
  };
}

const Hero: React.FC<HeroProps> = ({ onBuyNowClick, presaleStats }) => {
  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-red-600/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="text-red-500">SOVIETH</span> PRESALE
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 font-semibold mb-4">
            Unified Decentralized Platform
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Buy tokens now and reap the benefits of the blockchain revolution!
            Join the future of decentralized finance with Sovieth.
          </p>

          {/* Progress Section */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-red-900/30 mb-8 max-w-2xl mx-auto">
            <div className="mb-4">
              <div className="flex justify-between items-center text-white mb-2">
                <span className="font-semibold">Presale Progress</span>
                <span className="font-mono">{presaleStats.totalRaised} / {presaleStats.hardcap} ETH</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-500 relative"
                  style={{ width: `${presaleStats.progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-red-400 font-bold text-lg">{presaleStats.progressPercentage}%</span>
              </div>
            </div>

            {/* Price Information */}
            <div className="space-y-2 text-center">
              <p className="text-white font-semibold text-xl">
                1 <span className="text-red-400">SOVIETH</span> = {presaleStats.tokenPrice} ETH
              </p>
              <p className="text-gray-400">
                Secure your tokens at the best price!
              </p>
            </div>
          </div>

          {/* Buy Now Button */}
          <button
            onClick={onBuyNowClick}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xl font-bold py-4 px-12 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-xl border border-red-500 mb-8"
          >
            BUY NOW
          </button>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;