import React, { useEffect, useState } from "react";
import "./walletDr.css";
import Logo from '../../assets/medisync-logo.png'


const getWallet = () => window.ethereum;
const eth = getWallet();



const WalletDr = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const WalletDr = async () => {
    if (typeof eth !== "undefined") {
      const accounts = await eth.request({
        method: "eth_requestAccounts",
      });

      //setCheck(1);

      setCurrentAccount(accounts[0]);
      alert("welcome User " + accounts[0]);
    } else {
      alert("🔴Metamask Not Installed, Please Add Metamask To Your Browser 🔴");
    }
  };
  return (
    <div className="medisync__wallet_details" >
      <img src={Logo} alt="Logo"/>

      <div className="medisync__wallet_detail">
        <h1>Welcome!</h1>
        <h2>
        In order to view a patient’s record, please connect your wallet 
        </h2>
        <button className="connect" onClick={WalletDr}>
          Connect Wallet</button>
      </div>
    </div>
  );
};

export default WalletDr;
