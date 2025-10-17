"use client"
import { useAccount } from "wagmi";

import { ConnectedView } from "@/app/components/ConnectedView";
import { DisconnectedView } from "@/app/components/DisconnectedView";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="px-4 py-8">

      <div className="w-full flex flex-col items-center justify-center">
        { isConnected ? <ConnectedView /> : <DisconnectedView /> }
      </div>
    
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px]" />
      </div>
    </main>
  );
}
