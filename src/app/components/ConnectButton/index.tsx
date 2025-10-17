import { useAccount } from "wagmi";
import { useDynamicContext, useSwitchNetwork } from "@dynamic-labs/sdk-react-core";
import { match } from "ts-pattern";

import { Button } from "@/components/ui/button";
import { useIsTargetNetwork } from "@/lib/chain-utils";

export const ConnectButton = () => {
    const { isConnected, isReconnecting, isConnecting } = useAccount();
    const { setShowAuthFlow, handleLogOut, primaryWallet } = useDynamicContext();
    const isTargetNetwork = useIsTargetNetwork()

    const handleConnect = () => {
        setShowAuthFlow(true)
    }

    const handleDisconnect = () => {
        handleLogOut()
    }

    // const handleSwitchNetwork = async () => {
    //     if (!primaryWallet) {
    //         return;
    //     }

    //     await switchNetwork({ wallet: primaryWallet, network: sepolia.id });
    // }
    
    return match({ isConnected, isReconnecting, isConnecting, isTargetNetwork })
        .with({ isConnected: false, isReconnecting: true } , { isConnected: false, isConnecting: true}, () => (
            <Button
                onClick={handleConnect}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl px-6"
            >
                Wallet Reconnecting...
            </Button>
        ))
        .with({ isConnected: false, isReconnecting: false, isConnecting: false}, () => (
            <Button
                onClick={handleConnect}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl px-6"
            >
                Connect Wallet
            </Button>
        ))
        .with({ isConnected: true, isReconnecting: false, isConnecting: false, isTargetNetwork: true }, () => (
            <Button
                onClick={handleDisconnect}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl px-6"
            >
                Disconnect Wallet
            </Button>
        ))
        // .with({ isConnected: true, isReconnecting: false, isConnecting: false, isTargetNetwork: false }, () => (
        //     <Button
        //         onClick={handleSwitchNetwork}
        //         className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl px-6"
        //     >
        //         Wrong Network
        //     </Button>
        // ))
        .otherwise(() => null)
}