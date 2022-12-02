import { updateDoc } from 'firebase/firestore';
import { uploadString } from 'firebase/storage';
import { Modal } from 'flowbite-react';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

type Props = {
    setEditorOpen: Dispatch<SetStateAction<boolean>>;
    setCaptionModalOpen: Dispatch<SetStateAction<boolean>>;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setFileSelectOpen: Dispatch<SetStateAction<boolean>>;
    editedFile: any;
}

const ImageUpload = ({ setEditorOpen, setCaptionModalOpen, setOpenModal, editedFile }: Props) => {
    const captionRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const {data: session}: any = useSession();

    const uploadPost = async () => {
        if(loading) return;
        setLoading(true);
         
        // upload data to firestore, doc ID will be auto-generated
        // const docRef = await addDoc(collection(db, 'posts'), {
        //     username: session?.user.username,
        //     caption: captionRef.current.value,
        //     profileImg: session?.user.image,
        //     timeStamp: serverTimestamp(),
        // });

        // // upload image/videos to firebase storage and update the document
        // const imageRef = ref(storage, `posts/image/${docRef.id}`);

        // await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        //     const downloadURL = await getDownloadURL(imageRef);
        //     await updateDoc(doc(db, 'posts', docRef.id), {
        //         image: downloadURL,
        //     })
        // });

        //setOpen(false);
        setOpenModal(false);
        setLoading(false);
    }

    return (
        <>
            <Modal.Header>Create new post</Modal.Header>
            <Modal.Body className="flex flex-col md:flex-row">
                {/* edited image */}
                <section>
                    <img src={editedFile} className="max-h-[400px] mx-auto" alt="edited post image" />
                </section>
                {/* caption */}
                <section className="px-8 pt-8 md:pr-0 md:pb-8 min-w-[250px] flex flex-col justify-center">
                    <div>
                        <img 
                            src={session?.user?.image as string} 
                            alt="logged in user image" 
                            className="mx-auto w-10 rounded-full p-[1px] border border-solid border-gray-300 mb-2"/>
                        <p className="text-center font-bold">{session?.user?.username}</p>
                    </div>
                    <div className="mt-2">
                        <input
                            ref={captionRef}
                            type="text"
                            className='border-none focus:ring-0 w-full text-center' 
                            placeholder='Please enter a caption...' 
                        />
                    </div>
                    <button type="button" className="inline-flex justify-center w-full rounded-md border mt-5 sm:mt-6
                        border-transparent shadow-sm px-4 py-2 bg-instaBlue text-base font-bold text-white
                        hover:bg-instaBlue/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-instaBlue/90
                        disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                        onClick={uploadPost} disabled={!editedFile}>
                        {loading ? 'Uploading...' : 'Upload post'}
                    </button>
                </section>
            </Modal.Body>
            <Modal.Footer className="justify-center">
                <button 
                    className="rounded-md py-2 mr-5 px-5 font-bold bg-gray-100"
                    onClick={() => {setEditorOpen(true); setCaptionModalOpen(false);}}>Back</button>
            </Modal.Footer>
        </>
    )
}

export default ImageUpload

