import { Dialog, Transition } from '@headlessui/react';

type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactElement;
    bg?: string
    overflowY?: boolean
}

/**
 * Generic modal for any use cases that requires popups.
 * @param open `boolean` controls modal open/close
 * @param bg `string` modal background color in tailwind format
 * @param overflowY `boolean` controls the overflow of the modal content
 * @param onClose callback for the modal close
 * @returns 
 */
const Modal = ({open, onClose, children, bg="bg-white", overflowY=true}: Props) => {
    
    return (
        <>
            <Transition
            show={open}
            >
                <Dialog 
                    onClose={onClose}
                    className="relative z-[999] shadow-searchShadow">
                        {/* backdrop */}
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md" aria-hidden="true" />
                    <div className="fixed inset-0">
                        <div className="flex h-full items-center justify-center p-4">
                            <Transition.Child
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 translate-y-4 translate-y-0 scale-105'
                                enterTo='opacity-100 translate-y-0 scale-100'
                                leave='ease-in duration-100'
                                leaveFrom='opacity-100 translate-y-0 scale-100'
                                leaveTo='opacity-0 translate-y-4 translate-y-0 scale-90'
                                className={`mx-auto ${overflowY && 'overflow-y-auto'} w-full max-h-full
                                    sm:min-w-[400px] sm:w-auto rounded-lg ${bg} text-center`}>
                                <Dialog.Panel>
                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>  
        </>
    )
}

export default Modal