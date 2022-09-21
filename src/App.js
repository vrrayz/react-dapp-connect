import React, { useState } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { walletConnectRpc } from "./rpc";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('')
  const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum))

  const connectDapp = async() => {
    const wcProvider = new WalletConnectProvider(walletConnectRpc)
    await wcProvider.enable()
    // await provider.send("eth_requestAccounts", []);
    setProvider(new ethers.providers.Web3Provider(wcProvider));
    const signer = provider.getSigner()
    signer.getAddress().then(res => setUserAddress(res))
    setIsConnected(true)
  }
  return (
    <>
      <nav className="custom-nav">
        <a href="/h" className="nav-brand">Dapp-Connect</a>
        <button className="btn nav-btn">Connect Wallet</button>
      </nav>

      <div>
        {isConnected ? <b>{userAddress}</b>:<button onClick={connectDapp}>Connect Dapp</button>}
      </div>
    </>
  );
}

export default App;
