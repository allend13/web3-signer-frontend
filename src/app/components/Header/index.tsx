import { Sparkles } from "lucide-react"
import { ConnectButton } from "@/app/components/ConnectButton"

export const Header = () => {   

    return (
        <header className="border-b border-[#1a1a1a] bg-black/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-xl">Web3 Signer</span>
                </div>

                <ConnectButton />
            </div>
        </header>
    )
}