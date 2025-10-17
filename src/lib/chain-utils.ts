import { envs } from "./envs"
import { useAccount } from "wagmi"

export const useIsTargetNetwork = () => {
    const { chainId, isConnected } = useAccount()

    if (chainId === undefined) {
        return false
    }

    return chainId.toString() === envs.TARGET_CHAIN_ID
}   