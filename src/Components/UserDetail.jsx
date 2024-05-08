import ABI from "../ABI/LendingDApp.json";
import ABIUSDC from "../ABI/MockUSDC.json";
import React, { useState, useEffect } from "react";
import { LendingDapp, MockUSDC } from "../address";
import { formatEther, hexToNumber } from "viem";
import useRead from "../Hooks/useReadContract";
import { useActiveAccount } from "thirdweb/react";
import useConctracts from "../Hooks/useContract";
var console = require("console-browserify");

function UserDetail() {
  const [amountLend, setamountLend] = useState(0.0);
  const [amountBorrow, setamountBorrow] = useState(0.0);
  const [lendRewardDebt, setlendRewardDebt] = useState(0);
  const [allInterestInUSD, setallInterestInUSD] = useState(0);
  const [rewardPerToken, setrewardPerToken] = useState(0);
  const [balance, setBalance] = useState(0);
  const [supplied, setSuplied] = useState(0.0);

  const contract = useConctracts(LendingDapp, ABI);
  const contractUSDC = useConctracts(MockUSDC, ABIUSDC);
  const activeAccount = useActiveAccount();

  // because when the page components mounts "activeAccount" is undefined. We waits till its defined because we use

  const [
    UserDepositMockUSDC,
    UserDepositMockUSDCisLoading,
    UserDepositMockUSDCerror,
  ] = useRead(contract, "userDeposit", [
    activeAccount !== undefined ? activeAccount.address : "0x",
    MockUSDC,
  ]);

  const [UserDepositWBNB, UserDepositWBNBisLoading, UserDepositWBNBerror] =
    useRead(contract, "userDeposit", [
      activeAccount !== undefined ? activeAccount.address : "0x",
      "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    ]);

  const [UserBorrow, UserBorrowisLoading, UserBorrowerror] = useRead(
    contract,
    "userBorrow",
    [
      activeAccount !== undefined ? activeAccount.address : "0x",
      "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    ]
  );

  const [rewards, rewardsisLoading, rewardserror] = useRead(
    contract,
    "rewards",
    []
  );

  const [balanceOf, balanceOfisLoading, balanceOferror] = useRead(
    contractUSDC,
    "balanceOf",
    [LendingDapp]
  );

  useEffect(() => {
    if (
      !UserBorrowisLoading &&
      !balanceOfisLoading &&
      !rewardsisLoading &&
      !UserDepositWBNBisLoading &&
      !UserDepositMockUSDCisLoading
    ) {
      setamountBorrow(formatEther(UserBorrow));
      setamountLend(formatEther(UserDepositMockUSDC[0]));
      setlendRewardDebt(formatEther(UserDepositMockUSDC[1]));
      setallInterestInUSD(formatEther(rewards[0]));
      setrewardPerToken(formatEther(rewards[1]));
      setBalance(formatEther(balanceOf));
      setSuplied(formatEther(UserDepositWBNB[0]));
    }
  }, [amountLend, amountBorrow]);

  let interest;
  let TotalAmountlended;
  interest = amountLend * rewardPerToken - lendRewardDebt;
  TotalAmountlended = balance - allInterestInUSD;
  TotalAmountlended = Number.parseFloat(TotalAmountlended).toFixed(1);

  console.log(amountBorrow, amountLend, balance, supplied, allInterestInUSD);

  return (
    <>
      <div className="SummerUSDBalance">
        {TotalAmountlended} USDC available to borrow
      </div>
      <div className="Users__DespositsDetails">
        <div className="lend">
          <div className="Lended--amount">
            Lended:
            <span className="lended--span"> {amountLend} </span>
            USDC
          </div>
          <div className="Lended--interest">
            Yours interest:
            <span className="lended--interest">
              {Number.parseFloat(interest).toFixed(1)}
            </span>
            USDC
          </div>
        </div>
        <div className="borrow">
          <div className="Supplied--amount">
            Supplied:
            <span className="Supplied--RealAmount">
              <span className="lended--span">{supplied}</span>
            </span>
            BNB
          </div>
          <div className="borrowed--amount">
            Borrowed:
            <span className="borrowed--RealAmount">
              <span className="lended--span">{amountBorrow}</span>
            </span>
            USDC
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetail;
