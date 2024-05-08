import { useState } from "react";
import React, { useRef } from "react";
import { LendingDapp, MockUSDC} from "../address"
import ABI from "../ABI/LendingDApp.json";
import { parseEther } from "viem";
import { useToasts } from "react-toast-notifications";
import useConctracts from "../Hooks/useContract";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
var console = require("console-browserify");

const ModalWithdraw = ({ setOpenW , openW}) => {
  const [input, setInput] = useState("0.0");
  const ref = useRef(null);
  const { addToast } = useToasts();

  const contract = useConctracts(LendingDapp,ABI)

  const { mutate: sendTransaction, isPending, isSuccess } = useSendTransaction();

  const withdraw = async () => {
    const transaction = prepareContractCall({
      contract:contract,
      method: "withdraw",
      params:  ["0x97b13B0fc0056139460da0Dd1F485FFC9d663A40",parseEther(input)],
      value: 0,
    });
    sendTransaction(transaction);
  };

  return (
    <>
      {openW && (
        <div className="modal">
          <div className="Modal__action">
            <div className="close" onClick={() => setOpenW(false)}>
              X
            </div>
            <div className="Modal__token"> Withdraw USDC</div>
            <input
              className="Modal__input"
              placeholder="0.0"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              ref={ref}
            />
          </div>
          <div className="Modal__Lend">
            { <button className="modal__withdraw" onClick={withdraw}>
              withdraw
            </button>}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWithdraw;
