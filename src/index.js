import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { ThirdwebProvider } from "thirdweb/react";
import { http, createConfig } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { WagmiProvider } from 'wagmi' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 


const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
})

const queryClient = new QueryClient() 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThirdwebProvider>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
      <App />
      </QueryClientProvider> 
    </WagmiProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
