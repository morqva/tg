import './App.css';
import { TonConnect, WalletConnectionSource } from '@tonconnect/sdk';
import { useEffect, useState } from 'react';

const connector = new TonConnect({
  manifestUrl: 'https://testserverrr.com',
});

function App() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (connector.connected && connector.account?.address) {
      setAddress(connector.account.address);
    }
  }, []);

  const connectWallet = async () => {
    try {
      const walletConnectionSource: WalletConnectionSource = {
        universalLink: 'https://app.tonkeeper.com/ton-connect',
        bridgeUrl: 'https://bridge.tonapi.io/bridge',
      };
      await connector.connect(walletConnectionSource);
      setAddress(connector.account?.address || null);
    } catch (err) {
      console.error('Connection failed:', err);
      alert('Connection failed: ' + err);
    }
  };

  const simulateBuy = () => {
    if (!connector.connected || !address) {
      alert('Connect your wallet first');
      return;
    }
    alert('🧪 Beta mode: Simulating token purchase for 1 TON');
  };

  return (
    <div className="app">
      <h1>Buy $MYTOKEN</h1>
      <button onClick={connectWallet}>🔌 Connect Wallet</button>
      {address && <p className="address">Your address: {address}</p>}
      <button onClick={simulateBuy}>💸 Simulate Buy</button>
    </div>
  );
}

export default App;
