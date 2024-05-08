import Nav from "./nav";
import React, { useState } from "react";
import ModalLend from "../Modal/ModalLend";
import ModalBorrow from "../Modal/ModalBorrow";
import ModalSupply from "../Modal/ModalSupply";
import ModalWithdraw from "../Modal/ModalWithdrawUSDC";
import UserDetail from "./UserDetail";

function BorrowLend() {
  const [openL, setOpenL] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);
  const [openS, setOpenS] = React.useState(false);
  const [openW, setOpenW] = useState(false);

  return (
    <>
      <div className="BorrowLend">
        <Nav />
        <div className="BorrowLend__header">
          <div className="BorrowLend__heading">Borrow / Lend</div>
          <div className="BorrowLend__des">
            Supply assets to earn yield and borrow against collateral
          </div>
        </div>

        <div className="Assets">
          <div className="Assets__Lend">
            <h1 className="Assets__topic">Lend USDC</h1>
            <div className="Asset__lend_des">
              <div className="Asset__tokens">assets</div>
              <div className="Asset__APYs">APY%</div>
              <div className="Asset__supplys"></div>
            </div>
            <div className="Asset__lends">
              <div className="Asset__token">USDC</div>
              <div className="Asset__APY">10%</div>
              <button className="Asset__supply" onClick={() => setOpenL(true)}>
                lend
              </button>
              {openL && <ModalLend setOpenL={setOpenL} openL={openL} />}
              <button className="Asset__supply" onClick={() => setOpenW(true)}>
                withdraw
              </button>
              {openW && <ModalWithdraw setOpenW={setOpenW} openW={openW} />}
            </div>
          </div>
          <div className="Assets__Supply">
          <h1 className="Assets__topic">Borrow Tokens</h1>
            <div className="Asset__lend_des2">
              <div className="Asset__tokens">assets</div>
              <div className="Asset__APYs">LTV</div>
              <div className="Asset__supplys"></div>
              <div className="Asset__borrows"></div>
            </div>
            <div className="Asset__lend_des2">
              <div className="Asset__token">WBNB</div>
              <div className="Asset__APY">80%</div>
              <button className="Asset__supply" onClick={() => setOpenS(true)}>
                supply collateral
              </button>
              {openS && <ModalSupply setOpenS={setOpenS} openS={openS} />}

              <button className="Asset__borrow" onClick={() => setOpenB(true)}>
                borrow
              </button>
              {openB && <ModalBorrow setOpenB={setOpenB} openB={openB} />}
            </div>
          </div>
        </div>
        <UserDetail />
      </div>
    </>
  );
}

export default BorrowLend;
