import { useState } from "react";
import React, { useRef } from "react";
import { LendingDapp, MockUSDC } from "../address";
import ABI from "../ABI/LendingDApp.json";
import AbiMockUSDC from "../ABI/MockUSDC.json";
import { parseEther } from "viem";
import { useToasts } from "react-toast-notifications";
import useConctracts from "../Hooks/useContract";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction, useActiveAccount,} from "thirdweb/react";
import useRead from "../Hooks/useReadContract";
var console = require("console-browserify");

const ModalLend = ({ setOpenL, openL }) => {
  const [input, setInput] = useState("0.0");
  const ref = useRef(null);
  const { addToast } = useToasts();
  const activeAccount = useActiveAccount();
  const contract = useConctracts(LendingDapp, ABI);
  const contractUSDC = useConctracts(MockUSDC, AbiMockUSDC);
  const approveNumber = Math.pow(2, 255);

  const {
    mutate: sendTransaction,
    isPending,
    isSuccess,
  } = useSendTransaction();

  const withdraw = async () => {
    const transaction = prepareContractCall({
      contract: contract,
      method: "withdraw",
      params: ["0x97b13B0fc0056139460da0Dd1F485FFC9d663A40", parseEther(input)],
      value: 0,
    });
    sendTransaction(transaction);
    ref.current.value = "";
  };

  // approved maxUNit256
  const approve = async () => {
    const transaction = prepareContractCall({
      contract: contractUSDC,
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
      params: ["0x97b13B0fc0056139460da0Dd1F485FFC9d663A40", parseEther(input)],
      value: 0,
    });
    sendTransaction(transaction);
    ref.current.value = "";
  };


  const [approves, approveIsLoading, approveError] =
    useRead(contractUSDC, "allowance", [
      activeAccount !== undefined ? activeAccount.address : "0x",
      LendingDapp,
    ]);

  const hanldeLend =()=>{
    approve()
    lend()
  }
   
  
  return (
    <>
      {openL && (
        <div className="modal">
          <div className="Modal__action">
            <div className="close" onClick={() => setOpenL(false)}>
              X
            </div>
            <div className="Modal__token"> You can only Lend USDC</div>
            <input
              className="Modal__input"
              placeholder="0.0"
              type="text"
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
                lend
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLend;
