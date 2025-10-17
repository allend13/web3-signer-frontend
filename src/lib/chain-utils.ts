import { envs } from "./envs"
import { useAccount } from "wagmi"

export const useIsTargetNetwork = () => {
    const { chainId } = useAccount()

    if (chainId === undefined) {
        return false
    }

    return chainId.toString() === envs.TARGET_CHAIN_ID
}   