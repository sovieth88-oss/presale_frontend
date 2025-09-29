import React, { useState } from 'react';
import { usePresaleContract } from '../hooks/usePresaleContract';
import { isAddress } from 'viem';

const AdminPanel: React.FC = () => {
  const {
    presaleStats,
    withdrawETH,
    addToWhitelist,
    removeFromWhitelist,
    pausePresale,
    unpausePresale,
    updatePresaleConfig,
    error,
    clearError
  } = usePresaleContract();

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawRecipient, setWithdrawRecipient] = useState('');
  const [whitelistAddresses, setWhitelistAddresses] = useState('');
  const [activeTab, setActiveTab] = useState<'withdraw' | 'whitelist' | 'control' | 'config'>('withdraw');

  // Configuration form state
  const [configHardcap, setConfigHardcap] = useState('');
  const [configTokenPrice, setConfigTokenPrice] = useState('');
  const [configMaxPurchase, setConfigMaxPurchase] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if current user is admin (this should be determined by contract owner check)
  const isAdmin = true; // For demo - in production, check if address is contract owner

  const handleWithdraw = async () => {
    if (!withdrawAmount || !withdrawRecipient) {
      alert('Please fill in all fields');
      return;
    }

    if (!isAddress(withdrawRecipient)) {
      alert('Invalid recipient address');
      return;
    }

    try {
      setIsProcessing(true);
      clearError();
      await withdrawETH(withdrawAmount, withdrawRecipient);
      setWithdrawAmount('');
      setWithdrawRecipient('');
      alert('Withdrawal initiated successfully!');
    } catch (error) {
      console.error('Withdrawal failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddToWhitelist = async () => {
    const addresses = whitelistAddresses
      .split('\n')
      .map(addr => addr.trim())
      .filter(addr => addr.length > 0);

    if (addresses.length === 0) {
      alert('Please enter at least one address');
      return;
    }

    const invalidAddresses = addresses.filter(addr => !isAddress(addr));
    if (invalidAddresses.length > 0) {
      alert(`Invalid addresses found: ${invalidAddresses.join(', ')}`);
      return;
    }

    try {
      setIsProcessing(true);
      clearError();
      await addToWhitelist(addresses);
      setWhitelistAddresses('');
      alert(`${addresses.length} addresses added to whitelist successfully!`);
    } catch (error) {
      console.error('Adding to whitelist failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveFromWhitelist = async () => {
    const addresses = whitelistAddresses
      .split('\n')
      .map(addr => addr.trim())
      .filter(addr => addr.length > 0);

    if (addresses.length === 0) {
      alert('Please enter at least one address');
      return;
    }

    const invalidAddresses = addresses.filter(addr => !isAddress(addr));
    if (invalidAddresses.length > 0) {
      alert(`Invalid addresses found: ${invalidAddresses.join(', ')}`);
      return;
    }

    try {
      setIsProcessing(true);
      clearError();
      await removeFromWhitelist(addresses);
      setWhitelistAddresses('');
      alert(`${addresses.length} addresses removed from whitelist successfully!`);
    } catch (error) {
      console.error('Removing from whitelist failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePauseToggle = async () => {
    try {
      setIsProcessing(true);
      clearError();
      if (presaleStats.isPaused) {
        await unpausePresale();
        alert('Presale unpaused successfully!');
      } else {
        await pausePresale();
        alert('Presale paused successfully!');
      }
    } catch (error) {
      console.error('Pause/unpause failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateConfig = async () => {
    if (!configHardcap || !configTokenPrice || !configMaxPurchase) {
      alert('Please fill in all configuration fields');
      return;
    }

    const hardcap = parseFloat(configHardcap);
    const tokenPrice = parseFloat(configTokenPrice);
    const maxPurchase = parseFloat(configMaxPurchase);

    if (hardcap <= 0 || tokenPrice <= 0 || maxPurchase <= 0) {
      alert('All values must be greater than 0');
      return;
    }

    try {
      setIsProcessing(true);
      clearError();
      await updatePresaleConfig(configHardcap, configTokenPrice, configMaxPurchase);
      alert('Presale configuration updated successfully!');
      // Clear form
      setConfigHardcap('');
      setConfigTokenPrice('');
      setConfigMaxPurchase('');
    } catch (error) {
      console.error('Configuration update failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Load current config values when component mounts
  React.useEffect(() => {
    if (presaleStats) {
      setConfigHardcap(presaleStats.hardcap);
      setConfigTokenPrice(presaleStats.tokenPrice);
      setConfigMaxPurchase(presaleStats.maxPurchase);
    }
  }, [presaleStats]);

  if (!isAdmin) {
    return null; // Don't show admin panel to non-admins
  }

  const sectionStyle: React.CSSProperties = {
    padding: '80px 0',
    background: '#000000',
    borderTop: '1px solid rgba(220, 38, 38, 0.3)'
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
    marginBottom: '40px'
  };

  const titleSpanStyle: React.CSSProperties = {
    color: '#dc2626'
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={titleStyle}>
            Admin <span style={titleSpanStyle}>Panel</span>
          </h2>

          {/* Admin Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-red-500/50">
              <h3 className="text-red-400 font-semibold mb-2">Contract Balance</h3>
              <p className="text-2xl font-bold text-white">{presaleStats.contractBalance} ETH</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-gray-400 font-semibold mb-2">Total Withdrawn</h3>
              <p className="text-2xl font-bold text-white">{presaleStats.totalWithdrawn} ETH</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-gray-400 font-semibold mb-2">Presale Status</h3>
              <p className={`text-2xl font-bold ${presaleStats.isPaused ? 'text-red-400' : 'text-green-400'}`}>
                {presaleStats.isPaused ? 'Paused' : 'Active'}
              </p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-red-900/30 overflow-hidden">
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('withdraw')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === 'withdraw'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Withdraw ETH
              </button>
              <button
                onClick={() => setActiveTab('whitelist')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === 'whitelist'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Manage Whitelist
              </button>
              <button
                onClick={() => setActiveTab('control')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === 'control'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Presale Control
              </button>
              <button
                onClick={() => setActiveTab('config')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === 'config'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Configuration
              </button>
            </div>

            <div className="p-8">
              {/* Withdraw ETH Tab */}
              {activeTab === 'withdraw' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Withdrawal Amount (ETH)
                    </label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                      placeholder="0.0"
                      step="0.001"
                      max={presaleStats.contractBalance}
                    />
                    <p className="text-gray-500 text-sm mt-1">
                      Available: {presaleStats.contractBalance} ETH
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      value={withdrawRecipient}
                      onChange={(e) => setWithdrawRecipient(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                      placeholder="0x..."
                    />
                  </div>

                  <button
                    onClick={handleWithdraw}
                    disabled={isProcessing || !withdrawAmount || !withdrawRecipient}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-bold transition-all duration-200 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Withdraw ETH'}
                  </button>
                </div>
              )}

              {/* Whitelist Management Tab */}
              {activeTab === 'whitelist' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Addresses (one per line)
                    </label>
                    <textarea
                      value={whitelistAddresses}
                      onChange={(e) => setWhitelistAddresses(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 h-32"
                      placeholder="0x1234...&#10;0x5678...&#10;0x9abc..."
                    />
                    <p className="text-gray-500 text-sm mt-1">
                      Enter Ethereum addresses, one per line
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={handleAddToWhitelist}
                      disabled={isProcessing || !whitelistAddresses.trim()}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : 'Add to Whitelist'}
                    </button>
                    <button
                      onClick={handleRemoveFromWhitelist}
                      disabled={isProcessing || !whitelistAddresses.trim()}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : 'Remove from Whitelist'}
                    </button>
                  </div>
                </div>
              )}

              {/* Presale Control Tab */}
              {activeTab === 'control' && (
                <div className="space-y-6 text-center">
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Presale Status Control</h3>
                    <p className="text-gray-400 mb-6">
                      Current status: <span className={presaleStats.isPaused ? 'text-red-400' : 'text-green-400'}>
                        {presaleStats.isPaused ? 'PAUSED' : 'ACTIVE'}
                      </span>
                    </p>
                    <button
                      onClick={handlePauseToggle}
                      disabled={isProcessing}
                      className={`px-8 py-4 rounded-lg font-bold transition-all duration-200 disabled:cursor-not-allowed ${
                        presaleStats.isPaused
                          ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                          : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                      }`}
                    >
                      {isProcessing ? 'Processing...' : (presaleStats.isPaused ? 'Unpause Presale' : 'Pause Presale')}
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">⚠️ Warning</h4>
                      <p className="text-gray-400 text-sm">
                        Pausing the presale will prevent all purchases until resumed.
                      </p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">📊 Impact</h4>
                      <p className="text-gray-400 text-sm">
                        ETH withdrawals can continue even when presale is paused.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Configuration Tab */}
              {activeTab === 'config' && (
                <div className="space-y-6">
                  <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                    <h3 className="text-white font-semibold mb-4">Current Configuration</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Hardcap:</span>
                        <span className="text-white ml-2">{presaleStats.hardcap} ETH</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Token Price:</span>
                        <span className="text-white ml-2">{presaleStats.tokenPrice} ETH</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Min Purchase:</span>
                        <span className="text-white ml-2">No minimum</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Max Purchase:</span>
                        <span className="text-white ml-2">{presaleStats.maxPurchase} ETH</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Hardcap (ETH)
                      </label>
                      <input
                        type="number"
                        value={configHardcap}
                        onChange={(e) => setConfigHardcap(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                        placeholder="100"
                        step="0.1"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Token Price (ETH per token)
                      </label>
                      <input
                        type="number"
                        value={configTokenPrice}
                        onChange={(e) => setConfigTokenPrice(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                        placeholder="0.001"
                        step="0.0001"
                        min="0"
                      />
                    </div>


                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Maximum Purchase (ETH)
                      </label>
                      <input
                        type="number"
                        value={configMaxPurchase}
                        onChange={(e) => setConfigMaxPurchase(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                        placeholder="5"
                        step="0.1"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                    <h4 className="text-yellow-400 font-semibold mb-2">⚠️ Important Notes</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Configuration changes take effect immediately</li>
                      <li>• Ensure all values are greater than 0</li>
                      <li>• No minimum purchase limit (users can buy any amount &gt; 0)</li>
                      <li>• Changes may affect ongoing sales</li>
                    </ul>
                  </div>

                  <button
                    onClick={handleUpdateConfig}
                    disabled={isProcessing || !configHardcap || !configTokenPrice || !configMaxPurchase}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-bold transition-all duration-200 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Updating Configuration...' : 'Update Presale Configuration'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;