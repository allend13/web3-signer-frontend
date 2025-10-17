import { useState } from 'react'
import { Loader2, PenLine } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useSignAndSendMessage } from './hooks/useSendMessage'
import { useIsTargetNetwork } from '@/lib/chain-utils'

export interface VerifyResponse {
  isValid: boolean
  signer: string
  originalMessage: string
}

export interface SignatureRecord {
  id: string
  message: string
  signature: string
  timestamp: number
  verified?: VerifyResponse
}

export interface MessageSignerProps {
  onSignatureCreated: (record: SignatureRecord) => void
}

export function MessageSigner({ onSignatureCreated }: MessageSignerProps) {
  const [userMessage, setUserMessage] = useState('')
  const { mutateAsync: signAndSendMessage, isPending: isSigning } = useSignAndSendMessage() 
  const isTargetNetwork = useIsTargetNetwork()

  const handleSign = () => {
    signAndSendMessage(userMessage)
  }

  return (
    <Card className="bg-[#0d0d0d] border-[#1a1a1a] p-6 w-full">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <PenLine className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl text-white">Sign a Message</h2>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-300">
            Enter your message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your custom message here..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="bg-[#1a1a1a] border-[#252525] text-white placeholder:text-gray-600 min-h-[120px] resize-none focus:border-purple-500/50 focus:ring-purple-500/20"
          />
        </div>

        <Button
          onClick={handleSign}
          disabled={!userMessage || isSigning || !isTargetNetwork}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white h-12 rounded-xl"
        >
          {isSigning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {isSigning ? 'Signing...' : 'Verifying...'}
            </>
          ) : (
            'Sign Message'
          )}
        </Button>
      </div>
    </Card>
  )
}
