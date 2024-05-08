import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { defineChain } from "thirdweb";

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const client = createThirdwebClient({
  clientId: "379ff66a369f3e12df6535c7008603a5",
});

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const myChain = defineChain({
    id: 97,
    rpc: "https://bsc-testnet-rpc.publicnode.com",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
  });


  return (
    <>
      <div className="Connect_btn">
        <ConnectButton client={client} wallets={wallets} chain={myChain}/>
      </div>
      <div className="Header">
        <div
          className="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={menuOpen ? "open" : " "}>
          <Link to="/" className="nav__logo">
            Summer
          </Link>
          <Link to="/" className="nav__docs">
            Docs
          </Link>
          <Link to="/" className="nav__Community">
            Community
          </Link>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default Nav;
