import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";


const Modal = () => {
    const [open, setOpen] = useRecoilState(modalState);
    const {data: session} = useSession() as any;
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const filePickerRef = useRef<any>(null);
    const captionRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const uploadPost = async () => {
        if(loading) return;
        setLoading(true);
         
        // upload data to firestore, doc ID will be auto-generated
        const docRef = await addDoc(collection(db, 'posts'), {
            username: session?.user.username,
            caption: captionRef.current.value,
            profileImg: session?.user.image,
            timeStamp: serverTimestamp(),
        });

        // upload image/videos to firebase storage and update the document
        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef, selectedFile, "data_url").then(async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadURL,
            })
        });

        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
    }

    const addImageToPost = (e: any) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target?.result);
        }
    }
 
    return (
        <Transition show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={() => setOpen(false)} >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 
                                            text-left overflow-hidden shadow-xl transform transition-all sm:my-8 
                                            sm:align-middle sm:max-w-[300px] sm:w-full sm:p-6">
                                
                                <div>
                                    {selectedFile ? (
                                        <img src={selectedFile} onClick={()=> setSelectedFile(null)} className='w-full object-contain cursor-pointer' alt="post file" />
                                        ) : (
                                            <>
                                                <div
                                                    onClick={() =>filePickerRef.current.click()}
                                                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                                                    >
                                                    <span> 
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" aria-hidden='true' />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </>
                                    )}
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
                                            Upload a photo
                                        </Dialog.Title>
                                        <div>
                                            <input 
                                                ref={filePickerRef}
                                                type="file" 
                                                hidden
                                                onChange={addImageToPost}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                ref={captionRef}
                                                type="text"
                                                className='border-none focus:ring-0 w-full text-center' 
                                                placeholder='Please enter a caption...' 
                                            />
                                        </div>
                                    </div>
                                    <button type="button" className="inline-flex justify-center w-full rounded-md border mt-5 sm:mt-6
                                        border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white
                                        hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                        sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                                        onClick={uploadPost} disabled={!selectedFile}>
                                        {loading ? 'Uploading...' : 'Upload post'}
                                    </button>
                                </div>
                            </Dialog.Panel>
                            
                        </Transition.Child>
                    </div>
                </div> 
            </Dialog>
        </Transition>
    )
}

export default Modal 


  
   


          


