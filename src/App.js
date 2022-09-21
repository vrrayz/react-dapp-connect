import React, { useState } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('')
  const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum))

  const connectDapp = async() => {
    const wcProvider = new WalletConnectProvider({
      rpc: {
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        // 56: "https://bsc-dataseed.binance.org/",
      },
    })
    await wcProvider.enable()
    // await provider.send("eth_requestAccounts", []);
    setProvider(new ethers.providers.Web3Provider(wcProvider));
    const signer = provider.getSigner()
    signer.getAddress().then(res => setUserAddress(res))
    setIsConnected(true)
  }
  return (
    <>
      <h1>React - Dapp Connect</h1>

      <div>
        {isConnected ? <b>{userAddress}</b>:<button onClick={connectDapp}>Connect Dapp</button>}
      </div>
    </>
  );
}

export default App;
