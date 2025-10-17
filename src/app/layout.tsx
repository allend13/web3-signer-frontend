"use client"

import {
    DynamicContextProvider,
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "@/app/globals.css"

import { envs } from '@/lib/envs';
import { Header } from './components/Header';


const config = createConfig({
    chains: [sepolia],
    multiInjectedProviderDiscovery: false,
    transports: {
        [sepolia.id]: http(),
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
                                <ToastContainer
                                    position="top-right"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="dark"
                                    toastStyle={{
                                        backgroundColor: '#1f2937',
                                        color: '#ffffff',
                                        border: '1px solid #374151'
                                    }}
                                />
                            </DynamicWagmiConnector>
                        </QueryClientProvider>
                    </WagmiProvider>
                </DynamicContextProvider>
            </body>
        </html>
    );
}