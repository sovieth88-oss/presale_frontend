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
    clearError,
    isPurchasing,
    isConfirmed,
    transactionHash
  } = usePresaleContract();

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawRecipient, setWithdrawRecipient] = useState('');
  const [whitelistAddresses, setWhitelistAddresses] = useState('');
  const [activeTab, setActiveTab] = useState<'withdraw' | 'whitelist' | 'control' | 'config'>('withdraw');

  // Configuration form state
  const [configSoftcap, setConfigSoftcap] = useState('');
  const [configHardcap, setConfigHardcap] = useState('');
  const [configTokenPrice, setConfigTokenPrice] = useState('');
  const [configMaxPurchase, setConfigMaxPurchase] = useState('');
  const [lastAction, setLastAction] = useState<string>('');

  // Check if current user is admin (this should be determined by contract owner check)
  const isAdmin = true; // For demo - in production, check if address is contract owner

  // Handle transaction confirmation
  React.useEffect(() => {
    if (isConfirmed && lastAction && transactionHash) {
      // Show success message based on last action
      switch (lastAction) {
        case 'addToWhitelist':
          alert(`Addresses added to whitelist successfully! Transaction: ${transactionHash}`);
          setWhitelistAddresses('');
          break;
        case 'removeFromWhitelist':
          alert(`Addresses removed from whitelist successfully! Transaction: ${transactionHash}`);
          setWhitelistAddresses('');
          break;
        case 'withdraw':
          alert(`ETH withdrawal completed successfully! Transaction: ${transactionHash}`);
          setWithdrawAmount('');
          setWithdrawRecipient('');
          break;
        case 'pause':
          alert(`Presale paused successfully! Transaction: ${transactionHash}`);
          break;
        case 'unpause':
          alert(`Presale unpaused successfully! Transaction: ${transactionHash}`);
          break;
        case 'updateConfig':
          alert(`Presale configuration updated successfully! Transaction: ${transactionHash}`);
          setConfigSoftcap('');
          setConfigHardcap('');
          setConfigTokenPrice('');
          setConfigMaxPurchase('');
          break;
      }

      setLastAction('');
    }
  }, [isConfirmed, lastAction, transactionHash]);

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
      setLastAction('withdraw');
      clearError();
      await withdrawETH(withdrawAmount, withdrawRecipient);
    } catch (error) {
      console.error('Withdrawal failed:', error);
      setLastAction('');
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
      setLastAction('addToWhitelist');
      clearError();
      await addToWhitelist(addresses);
    } catch (error) {
      console.error('Adding to whitelist failed:', error);
      setLastAction('');
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
      setLastAction('removeFromWhitelist');
      clearError();
      await removeFromWhitelist(addresses);
    } catch (error) {
      console.error('Removing from whitelist failed:', error);
      setLastAction('');
    }
  };

  const handlePauseToggle = async () => {
    try {
      clearError();
      if (presaleStats.isPaused) {
        setLastAction('unpause');
        await unpausePresale();
      } else {
        setLastAction('pause');
        await pausePresale();
      }
    } catch (error) {
      console.error('Pause/unpause failed:', error);
      setLastAction('');
    }
  };

  const handleUpdateConfig = async () => {
    if (!configSoftcap || !configHardcap || !configTokenPrice || !configMaxPurchase) {
      alert('Please fill in all configuration fields');
      return;
    }

    const softcap = parseFloat(configSoftcap);
    const hardcap = parseFloat(configHardcap);
    const tokenPrice = parseFloat(configTokenPrice);
    const maxPurchase = parseFloat(configMaxPurchase);

    if (softcap <= 0 || hardcap <= 0 || tokenPrice <= 0 || maxPurchase <= 0) {
      alert('All values must be greater than 0');
      return;
    }

    if (hardcap <= softcap) {
      alert('Hardcap must be greater than softcap');
      return;
    }

    try {
      setLastAction('updateConfig');
      clearError();
      await updatePresaleConfig(configSoftcap, configHardcap, configTokenPrice, configMaxPurchase);
    } catch (error) {
      console.error('Configuration update failed:', error);
      setLastAction('');
    }
  };

  // Load current config values when component mounts
  React.useEffect(() => {
    if (presaleStats) {
      setConfigSoftcap(presaleStats.softcap);
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
                    disabled={isPurchasing || !withdrawAmount || !withdrawRecipient}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-bold transition-all duration-200 disabled:cursor-not-allowed"
                  >
                    {isPurchasing && lastAction === 'withdraw' ? 'Processing Transaction...' : 'Withdraw ETH'}
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
                      disabled={isPurchasing || !whitelistAddresses.trim()}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed"
                    >
                      {isPurchasing && lastAction === 'addToWhitelist' ? 'Processing...' : 'Add to Whitelist'}
                    </button>
                    <button
                      onClick={handleRemoveFromWhitelist}
                      disabled={isPurchasing || !whitelistAddresses.trim()}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed"
                    >
                      {isPurchasing && lastAction === 'removeFromWhitelist' ? 'Processing...' : 'Remove from Whitelist'}
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
                      disabled={isPurchasing}
                      className={`px-8 py-4 rounded-lg font-bold transition-all duration-200 disabled:cursor-not-allowed ${
                        presaleStats.isPaused
                          ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                          : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                      }`}
                    >
                      {isPurchasing && (lastAction === 'pause' || lastAction === 'unpause') ? 'Processing...' : (presaleStats.isPaused ? 'Unpause Presale' : 'Pause Presale')}
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
                        <span className="text-gray-400">Softcap:</span>
                        <span className="text-white ml-2">{presaleStats.softcap} ETH</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Hardcap:</span>
                        <span className="text-white ml-2">{presaleStats.hardcap} ETH</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Token Price:</span>
                        <span className="text-white ml-2">{presaleStats.tokenPrice} ETH</span>
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
                        Softcap (ETH)
                      </label>
                      <input
                        type="number"
                        value={configSoftcap}
                        onChange={(e) => setConfigSoftcap(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                        placeholder="5"
                        step="0.1"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Hardcap (ETH)
                      </label>
                      <input
                        type="number"
                        value={configHardcap}
                        onChange={(e) => setConfigHardcap(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                        placeholder="10"
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
                    disabled={isPurchasing || !configSoftcap || !configHardcap || !configTokenPrice || !configMaxPurchase}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-bold transition-all duration-200 disabled:cursor-not-allowed"
                  >
                    {isPurchasing && lastAction === 'updateConfig' ? 'Updating Configuration...' : 'Update Presale Configuration'}
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