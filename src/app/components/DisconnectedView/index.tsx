import { Sparkles } from "lucide-react"
import { useState } from "react"
import { ConnectButton } from "@/app/components/ConnectButton"

export const DisconnectedView = () => {
    return (
        <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center border border-pink-500/20">
          <Sparkles className="w-10 h-10 text-purple-400" />
        </div>
        <h1 className="text-4xl mb-3">Sign Messages with Your Wallet</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Connect your wallet to sign custom messages and verify signatures on the blockchain
        </p>
        <ConnectButton />
      </div>
    )
}