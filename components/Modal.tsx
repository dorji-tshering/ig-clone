import { Dialog } from '@headlessui/react';

type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactElement;
    bg?: string
    overflowY?: boolean
}

// overflowY param controls the overflow of the modal content
const Modal = ({open, onClose, children, bg="bg-white", overflowY=true}: Props) => {
    return (
        <>
            <Dialog 
                open={open} 
                onClose={onClose}
                className="relative z-[999]">
                    {/* backdrop */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0">
                    <div className="flex h-full items-center justify-center p-4">
                        <Dialog.Panel className={`mx-auto ${overflowY && 'overflow-y-auto'} w-full max-h-full
                            sm:min-w-[400px] sm:w-auto rounded-lg ${bg} text-center`}>
                            {children}
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Modal