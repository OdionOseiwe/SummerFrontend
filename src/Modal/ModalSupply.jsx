import { useState } from "react";
import React, { useRef } from "react";
import { LendingDapp } from "../address";
import ABI from "../ABI/LendingDApp.json";
import AbiWBNB from "../ABI/WBNB.json"
import { parseEther } from "viem";
import { useToasts } from "react-toast-notifications";
import useConctracts from "../Hooks/useContract";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction,useActiveAccount } from "thirdweb/react";
import useRead from "../Hooks/useReadContract";


const ModalSupply=({setOpenS,openS}) =>{
    const [input, setInput] = useState("0.0");
    const activeAccount = useActiveAccount();
    const ref = useRef(null);
    const { addToast } = useToasts();

  const contract = useConctracts(LendingDapp, ABI);
  const contractWBNB = useConctracts("0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", AbiWBNB);

  const {
    mutate: sendTransaction,
  } = useSendTransaction();

  const withdraw = async () => {
    const transaction = prepareContractCall({
      contract: contract,
      method: "withdraw",
      params: ["0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", parseEther(input)],
      value: 0,
    });
    sendTransaction(transaction);
    ref.current.value = "";
  };

  // approved maxUNit256
  const approve = async () => {
    const transaction = prepareContractCall({
      contract: contractWBNB,
      method: "approve",
      params: [LendingDapp, parseEther(input)],
      value: 0,
    });
    sendTransaction(transaction);
    ref.current.value = "";
  };

  const lend = async () => {
    const transaction = prepareContractCall({
      contract: contract,
      method: "deposit",
      params: ["0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", parseEther(input)],
      value: 0,
    });
    sendTransaction(transaction);
    ref.current.value = "";
    
  };

  const [approves] =
    useRead(contractWBNB, "allowance", [
      activeAccount !== undefined ? activeAccount.address : "0x",
      LendingDapp,
    ]);  
    return ( 
        <>
              {
                openS && (
                  <div className="modal">

                  <div className="Modal__action">
                  <div className="close" onClick={() => setOpenS(false)}>
                    X
                  </div>
                    <div className="Modal__token"> Supply BNB as Collateral</div>
                    <div className="Modal__token">input the amount of BNB you want to supply or withdraw</div>
                    <input className="Modal__input" 
                        type="text" 
                        placeholder="0.0"
                        onChange={(e) => setInput(e.target.value)}
                        ref={ref}
                    />
                </div>
                <div className="Modal__Lend">
                {approves < 0 && (
              <>
                {" "}
                <p>Approve USDC before Lending</p>{" "}
                <button className="modal__supply" onClick={approve}>
                  approve
                </button>
              </>
            )}
            {approves > 0 && (
              <button className="modal__supply" onClick={lend}>
                supply
              </button>
            )}
                    <button className="modal__withdraw"
                        onClick={withdraw}
                    >withdraw</button>
                </div>
                
            </div>
                )
              }
        </> 
    );
}

export default ModalSupply;