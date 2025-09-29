import React, { createContext, useContext } from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { bscTestnet } from "wagmi/chains";

// Create wagmi config
const config = createConfig(
  getDefaultConfig({
    appName: "Sovieth",
    appDescription: "Token Swapping Platform",
    appUrl: "https://swap-dapp.example.com",
    appIcon: "/logo.png",
    walletConnectProjectId: "8897acdd1a57d5021ad08b901938ae48",
    chains: [bscTestnet],
  })
);

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

interface Web3ContextType {
  // Add any additional context values here if needed
}

const Web3Context = createContext<Web3ContextType>({});

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

interface Web3ProviderProps {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const contextValue: Web3ContextType = {
    // Add any context values here
  };

  return (
    <Web3Context.Provider value={contextValue}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider
            theme="midnight"
            customTheme={{
              "--ck-border-radius": "12px",
              "--ck-primary-button-background": "#fbbf24",
              "--ck-primary-button-hover-background": "#f59e0b",
              "--ck-primary-button-color": "#000000",
            }}
          >
            {children}
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Web3Context.Provider>
  );
};
