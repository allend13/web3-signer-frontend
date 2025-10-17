import { useMutation } from "@tanstack/react-query"
import { signMessage } from "wagmi/actions"
import { Config, useAccount, useConfig } from "wagmi"
import { Address } from "viem"

import { envs } from "@/lib/envs"
import { apiFetch } from "@/lib/fetch"

export type ExpectedVerifiableMessageObject = {
    address: Address;
    domain: string;
    chainId: string;
    uri: string;
    nonce: string;
    userMessage: string;
}

export type UseSignAndSendMessageMutationFnProps = {
    wagmiConfig: Config,
    userMessage: string,
    address: Address | undefined
}

const useSignAndSendMessageMutationFn = async ({ wagmiConfig, userMessage, address }: UseSignAndSendMessageMutationFnProps) => {
    if (!address) {
        throw new Error("Address is required")
    }

    if (!userMessage) {
        throw new Error("Message is required")
    }

    console.log('Fetching nonce...')
    const nonceResponse = await apiFetch<{ nonce: string }>(
      `${envs.API_URL}/api/nonce?wallet=${address}`
    )
    const nonce = nonceResponse.nonce
    console.log('Nonce fetched: ', nonce)

    const messageObjectToSign: ExpectedVerifiableMessageObject = {
        address,
        domain: envs.EXPECTED_DOMAIN,
        chainId: envs.TARGET_CHAIN_ID,
        uri: envs.EXPECTED_URI,
        nonce: nonce,
        userMessage,
    }
    const messageToSign = JSON.stringify(messageObjectToSign)

    console.log('Signing message: ',  messageObjectToSign)
    const signature = await signMessage(wagmiConfig, {
        message: messageToSign,
        account: address,
    })
    console.log("Signature created: ", signature)


    console.log('Verifying signature...')
    const verifyResponse = await apiFetch(
      `${envs.API_URL}/api/verify-signature`, { 
            method: 'POST', 
            body: { signature, message: messageToSign } 
       }
    )
    console.log('Signature verified: ', verifyResponse)

    return
}


export const useSignAndSendMessage = () => {
    const wagmiConfig = useConfig()
    const { address } = useAccount()

    return useMutation({
        mutationFn: (userMessage: string) => useSignAndSendMessageMutationFn({
            wagmiConfig, 
            userMessage, 
            address 
        }),
    })
}