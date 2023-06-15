import React, { useEffect, useState } from "react";
import "./wallet.css";


const getWallet = () => window.ethereum;
const eth = getWallet();



const Wallet = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const Wallet = async () => {
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
    <div className="wallet_details" >
      <button className="connect" onClick={Wallet}>
        Connect Wallet</button>
    </div>
  );
};

export default Wallet;
