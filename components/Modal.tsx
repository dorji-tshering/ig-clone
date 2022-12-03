import { Dialog } from '@headlessui/react';

type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactElement;
}

const Modal = ({open, onClose, children}: Props) => {
    return (
        <>
            <Dialog 
                open={open} 
                onClose={onClose}
                className="relative z-50">
                    {/* backdrop */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="mx-auto w-full sm:min-w-[400px] sm:w-auto rounded-lg bg-white text-center">
                            {children}
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Modal