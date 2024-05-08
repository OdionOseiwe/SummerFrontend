import { useState } from "react";
import React, { useRef } from "react";
import { LendingDapp, MockUSDC } from "../address";
import ABI from "../ABI/LendingDApp.json";
import { useToasts } from "react-toast-notifications";
import { parseEther } from "viem";
import AbiMockUSDC from "../ABI/MockUSDC.json";
import useConctracts from "../Hooks/useContract";
import { prepareContractCall, waitForReceipt } from "thirdweb";
import {
  useSendTransaction,
  useActiveAccount,
  useWaitForReceipt,
} from "thirdweb/react";
import useRead from "../Hooks/useReadContract";
var console = require("console-browserify");

const ModalBorrow = ({ setOpenB, openB }) => {
  const [input, setInput] = useState("0.0");
  const { addToast } = useToasts();
  const ref = useRef(null);
  const contract = useConctracts(LendingDapp, ABI);
  const contractUSDC = useConctracts(MockUSDC, AbiMockUSDC);
  const activeAccount = useActiveAccount();

  const {
    mutate: sendTransaction,
    isPending,
    isSuccess,
  } = useSendTransaction();

 

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

  const repay = async () => {
    const transaction = prepareContractCall({
      contract: contract,
      method: "repay",
      params: [parseEther(input), "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"],
      value: 0,
    });
    sendTransaction(transaction);
    ref.current.value = "";
  };

  const borrow = async () => {
    const transaction = prepareContractCall({
      contract: contract,
      method: "borrow",
      params: [parseEther(input), "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"],
      value: 0,
    });
    sendTransaction(transaction);
    ref.current.value = "";
  };

  const [approves] = useRead(contractUSDC, "allowance", [
    activeAccount !== undefined ? activeAccount.address : "0x",
    LendingDapp,
  ]);

  const handleLend =()=>{
    approve()
    repay()
  }
  return (
    <>
      {openB && (
        <div className="modal">
          <div className="Modal__action">
            <div className="close" onClick={() => setOpenB(false)}>
              X
            </div>
            <div className="Modal__token">You only borrow USDC</div>
            <div className="Modal__token">
              Input the amount of USDC you want to borrow or repay. You are
              paying 4% of borrow, with borrow
            </div>
            <input
              className="Modal__input"
              placeholder="0.0"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              ref={ref}
            />
          </div>
          <div className="Modal__Lend">
            <button className="modal__supply" onClick={borrow}>
              Borrow
            </button>
            {/* {approves && (
              <>
                {" "}
                <p>Approve USDC before repaying</p>{" "}
                <button className="modal__supply" onClick={approve}>
                  approve
                </button>
              </>
            )}
            {approves > 0 && ( */}
              <button className="modal__supply" onClick={repay}>
                repay
              </button>
            {/* )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBorrow;
