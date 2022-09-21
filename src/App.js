import React, { useState } from "react";

import Nav from "./components/Nav";
import WalletModal from "./components/WalletModal";

import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { walletConnectRpc } from "./data/rpc";
import { walletOptions } from "./data/walletOptions";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isModalToggled, setIsModalToggled] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [provider, setProvider] = useState(
    new ethers.providers.Web3Provider(window.ethereum)
  );

  const connectDapp = async () => {
    const wcProvider = new WalletConnectProvider(walletConnectRpc);
    await wcProvider.enable();
    // await provider.send("eth_requestAccounts", []);
    setProvider(new ethers.providers.Web3Provider(wcProvider));
    const signer = provider.getSigner();
    signer.getAddress().then((res) => setUserAddress(res));
    setIsConnected(true);
  };
  return (
    <>
      <Nav>
        <button
          className="btn nav-btn"
          onClick={() => setIsModalToggled(!isModalToggled)}
        >
          {isConnected ? `${userAddress.substring(0, 5)}...` : "Connect Dapp"}
        </button>
      </Nav>
      {isModalToggled && (
        <WalletModal setIsModalToggled={setIsModalToggled} isModalToggled={isModalToggled}>
          {walletOptions.map((wallet) => {
            const { id, name, img } = wallet;
            return (
              <div className="col-6 mb-3" key={id}>
                <button className="wallet-option-btn" onClick={() => connectDapp()}>
                  <img src={img} className="wallet-logo" alt={name} />
                  <span className="wallet-name">{name}</span>
                </button>
              </div>
            );
          })}
        </WalletModal>
      )}
      {/* <div>
        {isConnected ? <b>{userAddress}</b>:<button onClick={connectDapp}>Connect Dapp</button>}
      </div> */}
    </>
  );
}

export default App;
