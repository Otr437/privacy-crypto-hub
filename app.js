import React, { useState, useEffect } from 'react';
import { Wallet, ExternalLink, Search, Copy, CheckCircle, Globe, X, Shield, Eye, EyeOff, Wifi, WifiOff, Send, ChevronDown, ChevronUp, Download } from 'lucide-react';

const BLOCKCHAIN_EXPLORERS = {
  'Bitcoin & Major': [
    { name: 'Bitcoin Explorer', url: 'https://blockchair.com/bitcoin', icon: '₿', color: 'bg-orange-500', ticker: 'BTC' },
    { name: 'Blockchain.com', url: 'https://www.blockchain.com/explorer', icon: '₿', color: 'bg-orange-600', ticker: 'BTC' },
    { name: 'Mempool.space', url: 'https://mempool.space', icon: '₿', color: 'bg-orange-700', ticker: 'BTC' },
    { name: 'Ethereum', url: 'https://etherscan.io', icon: '⟠', color: 'bg-blue-600', ticker: 'ETH' },
    { name: 'Ethplorer', url: 'https://ethplorer.io', icon: '⟠', color: 'bg-blue-700', ticker: 'ETH' },
    { name: 'Solana', url: 'https://solscan.io', icon: '◎', color: 'bg-purple-600', ticker: 'SOL' },
    { name: 'Solana Explorer', url: 'https://explorer.solana.com', icon: '◎', color: 'bg-purple-700', ticker: 'SOL' },
    { name: 'Cardano', url: 'https://cardanoscan.io', icon: '₳', color: 'bg-blue-800', ticker: 'ADA' },
    { name: 'Ripple', url: 'https://xrpscan.com', icon: '✕', color: 'bg-gray-600', ticker: 'XRP' },
    { name: 'Litecoin', url: 'https://blockchair.com/litecoin', icon: 'Ł', color: 'bg-gray-500', ticker: 'LTC' },
    { name: 'Dogecoin', url: 'https://blockchair.com/dogecoin', icon: 'Ð', color: 'bg-yellow-600', ticker: 'DOGE' }
  ],
  'EVM Chains': [
    { name: 'Polygon', url: 'https://polygonscan.com', icon: '⬡', color: 'bg-purple-600', ticker: 'MATIC' },
    { name: 'Arbitrum', url: 'https://arbiscan.io', icon: '🔷', color: 'bg-blue-500', ticker: 'ARB' },
    { name: 'Optimism', url: 'https://optimistic.etherscan.io', icon: '🔴', color: 'bg-red-600', ticker: 'OP' },
    { name: 'BSC', url: 'https://bscscan.com', icon: '🟡', color: 'bg-yellow-500', ticker: 'BNB' },
    { name: 'Avalanche', url: 'https://snowtrace.io', icon: '🔺', color: 'bg-red-500', ticker: 'AVAX' },
    { name: 'Fantom', url: 'https://ftmscan.com', icon: '👻', color: 'bg-blue-400', ticker: 'FTM' },
    { name: 'Cronos', url: 'https://cronoscan.com', icon: '🔷', color: 'bg-blue-700', ticker: 'CRO' },
    { name: 'Moonbeam', url: 'https://moonscan.io', icon: '🌙', color: 'bg-teal-600', ticker: 'GLMR' },
    { name: 'Gnosis', url: 'https://gnosisscan.io', icon: '🟢', color: 'bg-green-600', ticker: 'GNO' },
    { name: 'Celo', url: 'https://celoscan.io', icon: '🌿', color: 'bg-green-500', ticker: 'CELO' }
  ],
  'Layer 2s': [
    { name: 'Base', url: 'https://basescan.org', icon: '🔵', color: 'bg-blue-600', ticker: 'BASE' },
    { name: 'zkSync', url: 'https://explorer.zksync.io', icon: '⚡', color: 'bg-purple-700', ticker: 'ZK' },
    { name: 'Linea', url: 'https://lineascan.build', icon: '📐', color: 'bg-gray-700', ticker: 'LINEA' },
    { name: 'Scroll', url: 'https://scrollscan.com', icon: '📜', color: 'bg-orange-600', ticker: 'SCROLL' },
    { name: 'Mantle', url: 'https://explorer.mantle.xyz', icon: '🔶', color: 'bg-gray-800', ticker: 'MNT' },
    { name: 'Starknet', url: 'https://starkscan.co', icon: '⭐', color: 'bg-indigo-700', ticker: 'STRK' },
    { name: 'Metis', url: 'https://andromeda-explorer.metis.io', icon: '💫', color: 'bg-cyan-600', ticker: 'METIS' },
    { name: 'Polygon zkEVM', url: 'https://zkevm.polygonscan.com', icon: '⬡', color: 'bg-purple-800', ticker: 'MATIC' }
  ],
  'Alt Chains': [
    { name: 'Cosmos', url: 'https://www.mintscan.io/cosmos', icon: '⚛️', color: 'bg-gray-700', ticker: 'ATOM' },
    { name: 'Polkadot', url: 'https://polkadot.subscan.io', icon: '●', color: 'bg-pink-600', ticker: 'DOT' },
    { name: 'Kusama', url: 'https://kusama.subscan.io', icon: '●', color: 'bg-gray-900', ticker: 'KSM' },
    { name: 'Near', url: 'https://nearblocks.io', icon: '◈', color: 'bg-gray-600', ticker: 'NEAR' },
    { name: 'Aptos', url: 'https://aptoscan.com', icon: '🌊', color: 'bg-teal-700', ticker: 'APT' },
    { name: 'Sui', url: 'https://suiscan.xyz', icon: '💧', color: 'bg-blue-800', ticker: 'SUI' },
    { name: 'Algorand', url: 'https://algoexplorer.io', icon: '△', color: 'bg-gray-800', ticker: 'ALGO' },
    { name: 'Tezos', url: 'https://tzstats.com', icon: '◆', color: 'bg-blue-500', ticker: 'XTZ' },
    { name: 'Tron', url: 'https://tronscan.org', icon: '◎', color: 'bg-red-700', ticker: 'TRX' }
  ],
  'Privacy Coins': [
    { name: 'Monero Explorer', url: 'https://xmrchain.net', icon: 'Ɱ', color: 'bg-orange-700', ticker: 'XMR' },
    { name: 'Explore Monero', url: 'https://www.exploremonero.com', icon: 'Ɱ', color: 'bg-orange-600', ticker: 'XMR' },
    { name: 'Zcash Explorer', url: 'https://blockchair.com/zcash', icon: '⚡', color: 'bg-yellow-600', ticker: 'ZEC' },
    { name: 'Zcash Mainnet', url: 'https://mainnet.zcashexplorer.app', icon: '⚡', color: 'bg-yellow-700', ticker: 'ZEC' },
    { name: 'Dash', url: 'https://explorer.dash.org', icon: 'Đ', color: 'bg-blue-600', ticker: 'DASH' },
    { name: 'Horizen', url: 'https://explorer.horizen.io', icon: '◈', color: 'bg-cyan-700', ticker: 'ZEN' },
    { name: 'Verge', url: 'https://verge-blockchain.info', icon: '◎', color: 'bg-gray-700', ticker: 'XVG' },
    { name: 'PIVX', url: 'https://explorer.pivx.org', icon: '◆', color: 'bg-purple-700', ticker: 'PIVX' },
    { name: 'Firo', url: 'https://explorer.firo.org', icon: '◉', color: 'bg-red-700', ticker: 'FIRO' },
    { name: 'Beam', url: 'https://explorer.beam.mw', icon: '◭', color: 'bg-blue-500', ticker: 'BEAM' }
  ],
  'Privacy Tokens': [
    { name: 'Tornado Cash', url: 'https://etherscan.io/address/0x722122df12d4e14e13ac3b6895a86e84145b6967', icon: '🌪️', color: 'bg-gray-800', chainId: 1, ticker: 'TORN' },
    { name: 'Secret Network', url: 'https://www.mintscan.io/secret', icon: '🔐', color: 'bg-gray-900', ticker: 'SCRT' },
    { name: 'Railgun Privacy', url: 'https://railgun.org', icon: '🚂', color: 'bg-purple-800', ticker: 'RAIL' },
    { name: 'Aztec Network', url: 'https://aztec.network', icon: '🔺', color: 'bg-blue-900', ticker: 'AZTEC' },
    { name: 'Incognito', url: 'https://explorer.incognito.org', icon: '👤', color: 'bg-gray-700', ticker: 'PRV' },
    { name: 'Keep Network', url: 'https://etherscan.io/token/0x85eee30c52b0b379b046fb0f85f4f3dc3009afec', icon: '🔑', color: 'bg-cyan-800', chainId: 1, ticker: 'KEEP' }
  ],
  'Privacy Wallets': [
    { name: 'Wasabi Wallet', url: 'https://wasabiwallet.io', icon: '🟢', color: 'bg-green-700', download: true },
    { name: 'Samourai Wallet', url: 'https://samouraiwallet.com', icon: '⚔️', color: 'bg-red-700', download: true },
    { name: 'Sparrow Wallet', url: 'https://sparrowwallet.com', icon: '🦅', color: 'bg-blue-700', download: true },
    { name: 'Monero GUI', url: 'https://www.getmonero.org/downloads', icon: 'Ɱ', color: 'bg-orange-700', download: true },
    { name: 'Cake Wallet', url: 'https://cakewallet.com', icon: '🎂', color: 'bg-purple-700', download: true },
    { name: 'Zashi Wallet', url: 'https://z.cash/zashi/', icon: '⚡', color: 'bg-yellow-500', download: true, ticker: 'ZEC' }
  ],
  'VPN & Tor': [
    { name: 'Tor Browser', url: 'https://www.torproject.org', icon: '🧅', color: 'bg-purple-800', download: true },
    { name: 'Mullvad VPN', url: 'https://mullvad.net/en/download', icon: '🔒', color: 'bg-blue-800', download: true },
    { name: 'ProtonVPN', url: 'https://protonvpn.com', icon: '🛡️', color: 'bg-green-700', download: true },
    { name: 'IVPN', url: 'https://www.ivpn.net', icon: '🔐', color: 'bg-blue-700', download: true }
  ]
};

const WALLETS = [
  { name: 'MetaMask', injected: 'ethereum', icon: '🦊' },
  { name: 'Rabby', injected: 'rabby', icon: '🐰' },
  { name: 'Rainbow', injected: 'rainbow', icon: '🌈' },
  { name: 'Coinbase Wallet', injected: 'coinbaseWallet', icon: '🔵' },
  { name: 'Trust Wallet', injected: 'trustWallet', icon: '🛡️' },
  { name: 'Phantom', injected: 'phantom', icon: '👻' },
  { name: 'Brave Wallet', injected: 'brave', icon: '🦁' }
];

export default function PrivacyCryptoHub() {
  const [selectedCategory, setSelectedCategory] = useState('Bitcoin & Major');
  const [selectedExplorer, setSelectedExplorer] = useState(BLOCKCHAIN_EXPLORERS['Bitcoin & Major'][0]);
  const [searchAddress, setSearchAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [privacyMode, setPrivacyMode] = useState(true);
  const [connectionMethod, setConnectionMethod] = useState('direct');
  const [installedWallets, setInstalledWallets] = useState([]);
  const [networkStatus, setNetworkStatus] = useState('online');
  const [sendTo, setSendTo] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showBestPractices, setShowBestPractices] = useState(false);

  useEffect(() => {
    detectInstalledWallets();
    checkConnection();
    checkNetworkStatus();
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };

  const checkNetworkStatus = () => setNetworkStatus(navigator.onLine ? 'online' : 'offline');

  const detectInstalledWallets = () => {
    const detected = [];
    WALLETS.forEach(wallet => {
      if ((wallet.injected === 'ethereum' && window.ethereum) || window[wallet.injected]) {
        detected.push(wallet.name);
      }
    });
    setInstalledWallets(detected);
  };

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setConnected(true);
          getChainId();
          getBalance(accounts[0]);
        }
      } catch (err) {}
    }
  };

  const connectWallet = async (walletType) => {
    try {
      let provider = window.ethereum;
      if (walletType !== 'ethereum' && window[walletType]) provider = window[walletType];
      if (!provider) {
        addNotification(`${walletType} not detected`, 'error');
        return;
      }
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setConnected(true);
      setShowWallets(false);
      getChainId();
      getBalance(accounts[0]);
      addNotification('Wallet connected', 'success');
    } catch (err) {
      addNotification('Connection failed', 'error');
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setAccount('');
    setBalance(null);
    setChainId(null);
    addNotification('Disconnected', 'info');
  };

  const getChainId = async () => {
    if (window.ethereum) {
      try {
        const id = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(parseInt(id, 16));
      } catch (err) {}
    }
  };

  const getBalance = async (address) => {
    if (window.ethereum) {
      try {
        const bal = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        });
        setBalance((parseInt(bal, 16) / 1e18).toFixed(4));
      } catch (err) {}
    }
  };

  const sendTransaction = async () => {
    if (!sendTo || !sendAmount) {
      addNotification('Enter recipient and amount', 'error');
      return;
    }
    setSending(true);
    try {
      const amountWei = '0x' + Math.floor(parseFloat(sendAmount) * 1e18).toString(16);
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{ from: account, to: sendTo, value: amountWei }]
      });
      addNotification(`TX sent: ${txHash.slice(0, 10)}...`, 'success');
      setSendTo('');
      setSendAmount('');
      setShowSendModal(false);
      getBalance(account);
    } catch (err) {
      addNotification('Transaction failed', 'error');
    }
    setSending(false);
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
      getBalance(accounts[0]);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addNotification('Address copied', 'success');
  };

  const openExplorer = (explorer, searchTerm) => {
    let url = explorer.url;
    if (searchTerm && !explorer.download && url.includes('etherscan.io')) {
      url = url + '/address/' + searchTerm;
    }
    window.open(url, '_blank');
  };

  const handleSearch = () => {
    const query = searchAddress || account;
    query ? openExplorer(selectedExplorer, query) : window.open(selectedExplorer.url, '_blank');
  };

  const filteredExplorers = searchFilter
    ? BLOCKCHAIN_EXPLORERS[selectedCategory].filter(exp =>
        exp.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        exp.ticker?.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : BLOCKCHAIN_EXPLORERS[selectedCategory];

  const totalExplorers = Object.values(BLOCKCHAIN_EXPLORERS).reduce((sum, arr) => sum + arr.length, 0);

  const maskAddress = (addr) => {
    if (!privacyMode) return addr;
    return addr.slice(0, 6) + '•••' + addr.slice(-4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-xs pointer-events-none">
        {notifications.map(notif => (
          <div key={notif.id} className={`px-4 py-2 rounded-lg shadow-2xl text-sm pointer-events-auto ${notif.type === 'success' ? 'bg-green-600' : notif.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
            {notif.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-gray-900/95 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-gray-800 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-gray-300 bg-clip-text text-transparent">
                  Privacy Crypto Hub
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center px-2 py-1 bg-gray-800 border border-gray-700 rounded-lg">
                {networkStatus === 'online' ? <Wifi className="w-4 h-4 text-green-400" /> : <WifiOff className="w-4 h-4 text-red-400" />}
              </div>

              <select 
                value={connectionMethod} 
                onChange={(e) => setConnectionMethod(e.target.value)} 
                className="px-2 py-1 bg-gray-800 border border-gray-700 rounded-lg text-sm">
                <option value="direct">⚠️ Direct</option>
                <option value="vpn">🔒 VPN</option>
                <option value="tor">🧅 Tor</option>
              </select>

              <button 
                onClick={() => setPrivacyMode(!privacyMode)} 
                className="p-1.5 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700">
                {privacyMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              {connected ? (
                <>
                  {balance && <div className="hidden lg:block px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-sm">
                    {privacyMode ? '••••' : balance} ETH
                  </div>}
                  <button 
                    onClick={() => setShowSendModal(true)} 
                    className="p-1.5 bg-green-600 hover:bg-green-700 rounded-lg">
                    <Send className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={copyAddress} 
                    className="hidden md:flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg">
                    {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-xs font-mono">{maskAddress(account)}</span>
                  </button>
                  <button 
                    onClick={disconnectWallet} 
                    className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/30">
                    Disconnect
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowWallets(true)} 
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg font-semibold text-sm">
                  <Wallet className="w-4 h-4" />
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Send Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Send className="w-5 h-5 text-green-400" />
                Send Transaction
              </h2>
              <button onClick={() => setShowSendModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Recipient Address</label>
                <input 
                  type="text" 
                  value={sendTo} 
                  onChange={(e) => setSendTo(e.target.value)} 
                  placeholder="0x..." 
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white text-sm" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Amount (ETH)</label>
                <input 
                  type="text" 
                  value={sendAmount} 
                  onChange={(e) => setSendAmount(e.target.value)} 
                  placeholder="0.0" 
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white text-sm" 
                />
                <div className="text-xs text-gray-500 mt-1">Available: {balance || '0.0000'} ETH</div>
              </div>
              <button 
                onClick={sendTransaction} 
                disabled={sending || !sendTo || !sendAmount} 
                className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-700 disabled:to-gray-800 rounded-lg font-semibold text-sm">
                {sending ? 'Sending...' : 'Send Transaction'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Modal */}
      {showWallets && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Connect Wallet
                </h2>
                <p className="text-xs text-gray-400 mt-1">{installedWallets.length} wallet(s) detected</p>
              </div>
              <button onClick={() => setShowWallets(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {WALLETS.map((wallet) => {
                const isInstalled = installedWallets.includes(wallet.name);
                return (
                  <button 
                    key={wallet.name} 
                    onClick={() => connectWallet(wallet.injected)} 
                    disabled={!isInstalled} 
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl relative ${isInstalled ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-purple-500' : 'bg-gray-800/20 border border-gray-800 opacity-50 cursor-not-allowed'}`}>
                    {isInstalled && <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"></div>}
                    <span className="text-2xl">{wallet.icon}</span>
                    <span className="text-xs font-medium text-center">{wallet.name}</span>
                    {!isInstalled && <span className="text-xs text-red-400">Not Installed</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/70 rounded-xl p-3 border border-gray-800 lg:sticky lg:top-16 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                Categories
              </h2>
              <div className="space-y-2">
                {Object.keys(BLOCKCHAIN_EXPLORERS).map((category) => (
                  <button 
                    key={category} 
                    onClick={() => { 
                      setSelectedCategory(category); 
                      setSelectedExplorer(BLOCKCHAIN_EXPLORERS[category][0]); 
                      setSearchFilter(''); 
                    }} 
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedCategory === category ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' : 'bg-gray-800/50 hover:bg-gray-800 text-gray-300'}`}>
                    <div className="font-semibold">{category}</div>
                    <div className="text-xs opacity-70 mt-0.5">{BLOCKCHAIN_EXPLORERS[category].length} resources</div>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-gradient-to-br from-purple-900/30 to-gray-900/30 rounded-lg border border-purple-500/30">
                <div className="text-xs text-gray-400 space-y-2">
                  <div className="flex justify-between">
                    <span>Total Resources</span>
                    <span className="font-bold text-purple-400">{totalExplorers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Level</span>
                    <span className="font-bold text-orange-400">
                      {connectionMethod === 'tor' ? 'High' : connectionMethod === 'vpn' ? 'Med' : 'Low'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Search */}
            <div className="bg-gray-900/70 rounded-xl p-3 border border-gray-800">
              <div className="flex gap-2 mb-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={searchAddress} 
                    onChange={(e) => setSearchAddress(e.target.value)} 
                    placeholder="Enter address, TX hash, or block..." 
                    className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white text-sm" 
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()} 
                  />
                </div>
                <button 
                  onClick={handleSearch} 
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg font-semibold text-sm">
                  Search
                </button>
              </div>
              <input 
                type="text" 
                value={searchFilter} 
                onChange={(e) => setSearchFilter(e.target.value)} 
                placeholder="Filter resources..." 
                className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white text-sm" 
              />
            </div>

            {/* Explorer List */}
            <div className="bg-gray-900/70 rounded-xl p-3 border border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  {selectedCategory}
                </h2>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                  {filteredExplorers.length} resources
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredExplorers.map((explorer) => (
                  <button 
                    key={explorer.name} 
                    onClick={() => setSelectedExplorer(explorer)} 
                    className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all text-left ${selectedExplorer.name === explorer.name ? 'bg-purple-600/20 border-purple-500 shadow-lg' : 'bg-gray-800/30 border-gray-700 hover:border-purple-500/50 hover:bg-gray-800/50'}`}>
                    <div className={`w-10 h-10 ${explorer.color} rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0`}>
                      {explorer.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                        <span className="truncate">{explorer.name}</span>
                        {explorer.download && <Download className="w-3 h-3 text-blue-400 flex-shrink-0" />}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 truncate">
                        {explorer.ticker && <span className="text-purple-400 font-mono">{explorer.ticker}</span>}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Explorer Details */}
            {selectedExplorer && (
              <div className="bg-gradient-to-br from-purple-900/30 to-gray-900/30 rounded-xl p-4 border border-purple-500/30 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 ${selectedExplorer.color} rounded-xl flex items-center justify-center text-2xl shadow-xl flex-shrink-0`}>
                    {selectedExplorer.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold flex items-center gap-2 flex-wrap">
                      <span className="truncate">{selectedExplorer.name}</span>
                      {selectedExplorer.download && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded flex items-center gap-1 border border-blue-500/30">
                          <Download className="w-3 h-3" /> Download
                        </span>
                      )}
                    </h3>
                    {selectedExplorer.ticker && <div className="text-purple-400 font-mono text-sm mt-0.5">{selectedExplorer.ticker}</div>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  <button 
                    onClick={() => window.open(selectedExplorer.url, '_blank')} 
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm shadow-lg">
                    <Globe className="w-4 h-4" />
                    {selectedExplorer.download ? 'Download' : 'Open'}
                  </button>
                  {connected && !selectedExplorer.download && (
                    <button 
                      onClick={() => openExplorer(selectedExplorer, account)} 
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm shadow-lg">
                      <Wallet className="w-4 h-4" />
                      My Address
                    </button>
                  )}
                </div>

                <a 
                  href={selectedExplorer.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-purple-400 hover:text-purple-300 text-xs flex items-center gap-1 break-all">
                  {selectedExplorer.url} <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
            )}

            {/* Best Practices */}
            <div className="bg-gray-900/70 rounded-xl border border-gray-800 overflow-hidden">
              <button 
                onClick={() => setShowBestPractices(!showBestPractices)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800/50 transition-all">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  Privacy & Security Best Practices
                </h3>
                {showBestPractices ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {showBestPractices && (
                <div className="px-4 pb-4">
                  <div className="grid md:grid-cols-2 gap-3 text-xs text-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 bg-gray-800/30 rounded-lg">
                        <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 text-xs">1</span>
                        </div>
                        <div><strong className="text-purple-400">Use Tor/VPN:</strong> Always route through Tor or VPN for anonymity</div>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-gray-800/30 rounded-lg">
                        <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 text-xs">2</span>
                        </div>
                        <div><strong className="text-purple-400">Verify URLs:</strong> Double-check website addresses</div>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-gray-800/30 rounded-lg">
                        <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 text-xs">3</span>
                        </div>
                        <div><strong className="text-purple-400">Hardware Wallets:</strong> Use Ledger/Trezor for security</div>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-gray-800/30 rounded-lg">
                        <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 text-xs">4</span>
                        </div>
                        <div><strong className="text-purple-400">Privacy Coins:</strong> Use XMR or ZEC for transactions</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 bg-gray-800/30 rounded-lg">
                        <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 text-xs">5</span>
                        </div>
                        <div><strong className="text-purple-400">Fresh Addresses:</strong> Never reuse addresses</div>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-gray-800/30 rounded-lg">
                        <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 text-xs">6</span>
                        </div>
                        <div><strong className="text-purple-400">Avoid KYC:</strong> Use non-custodial DEXs</div>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-gray-800/30 rounded-lg">
                        <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 text-xs">7</span>
                        </div>
                        <div><strong className="text-purple-400">Research Tools:</strong> Vet all services thoroughly</div>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-gray-800/30 rounded-lg">
                        <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 text-xs">8</span>
                        </div>
                        <div><strong className="text-purple-400">Browser Security:</strong> Use Brave/Tor browser</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-3 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg">
                    <h4 className="font-bold text-purple-400 text-xs mb-2">Recommended Privacy Stack</h4>
                    <div className="text-xs text-gray-300 space-y-1">
                      <p><strong>Layer 1:</strong> Tor Browser + VPN</p>
                      <p><strong>Layer 2:</strong> Hardware Wallet + MetaMask</p>
                      <p><strong>Layer 3:</strong> Privacy coins (XMR/ZEC)</p>
                      <p><strong>Layer 4:</strong> Fresh addresses + No KYC</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-purple-900/30 to-gray-900/30 rounded-xl p-4 border border-purple-500/30">
            <div className="text-gray-400 text-xs mb-1">Total Resources</div>
            <div className="text-2xl font-bold text-purple-400">{totalExplorers}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-gray-900/30 rounded-xl p-4 border border-blue-500/30">
            <div className="text-gray-400 text-xs mb-1">Categories</div>
            <div className="text-2xl font-bold text-blue-400">{Object.keys(BLOCKCHAIN_EXPLORERS).length}</div>
          </div>
          <div className="bg-gradient-to-br from-green-900/30 to-gray-900/30 rounded-xl p-4 border border-green-500/30">
            <div className="text-gray-400 text-xs mb-1">Wallet Status</div>
            <div className="text-base font-bold text-green-400">{connected ? 'Connected' : 'Disconnected'}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-900/30 to-gray-900/30 rounded-xl p-4 border border-orange-500/30">
            <div className="text-gray-400 text-xs mb-1">Security Level</div>
            <div className="text-base font-bold text-orange-400">
              {connectionMethod === 'tor' ? 'High' : connectionMethod === 'vpn' ? 'Medium' : 'Low'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 bg-gray-900/95 border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-2">
            <strong className="text-purple-400">Privacy Crypto Hub:</strong> Full Web3 • {totalExplorers}+ Resources • All Chains
          </p>
          <div className="flex items-center justify-center gap-4 text-xs mb-2">
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-400" />Verified</span>
            <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-purple-400" />Privacy</span>
            <span className="flex items-center gap-1"><Wifi className="w-3 h-3 text-blue-400" />Live Web3</span>
          </div>
          <p className="text-xs text-gray-500">
            <strong className="text-yellow-400">Disclaimer:</strong> Educational purposes only. Research tools before use.
          </p>
        </div>
      </footer>
    </div>
  );
}const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PrivacyCryptoHub />);