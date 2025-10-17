import { MessageSigner } from "./MessageSigner"
import { SignatureRecord } from "./MessageSigner"

export const ConnectedView = () => {
    const handleSignatureCreated = (record: SignatureRecord) => {
        console.log(record)
    }
    
    return (
        <div className="space-y-6 flex flex-col items-center justify-center w-full md:w-200">
            <MessageSigner onSignatureCreated={handleSignatureCreated} />
            {/* <SignatureHistory records={signatures} /> */}
        </div>
    )
}