"use client"

import {
    DynamicContextProvider,
    DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import {
    createConfig,
    WagmiProvider,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { sepolia, mainnet } from 'viem/chains';

import "@/app/globals.css"

import { envs } from '@/lib/envs';
import { Header } from './components/Header';


const config = createConfig({
    chains: [mainnet, sepolia],
    multiInjectedProviderDiscovery: false,
    transports: {
        [sepolia.id]: http(),
        [mainnet.id]: http(),
    },
});

const queryClient = new QueryClient();

export default function App({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <DynamicContextProvider
                    theme='dark'
                    settings={{
                        environmentId: envs.DYNAMIC_ENV_ID,
                        walletConnectors: [EthereumWalletConnectors],
                    }}
                >
                    <WagmiProvider config={config}>
                        <QueryClientProvider client={queryClient}>
                            <DynamicWagmiConnector>
                                <div className="min-h-screen bg-black text-white flex flex-col">
                                    <Header />
                                    {children}
                                </div>
                            </DynamicWagmiConnector>
                        </QueryClientProvider>
                    </WagmiProvider>
                </DynamicContextProvider>
            </body>
        </html>
    );
}