import { Modal } from 'flowbite-react';
import { Dispatch, SetStateAction, useRef } from 'react';

type Props = {
    setFileSelectOpen: Dispatch<SetStateAction<boolean>>;
    setEditorOpen: Dispatch<SetStateAction<boolean>>;
    setSelectedFile: Dispatch<SetStateAction<any>>;
}

const ImageSelect = ({ setFileSelectOpen, setEditorOpen, setSelectedFile }: Props) => {
    const filePickerRef = useRef<any>(null);

    const selectImage = (e: any) => {
        const reader = new FileReader();

        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target?.result);
            setFileSelectOpen(false); 
            setEditorOpen(true);
        }
    }

    return (
        <>
            <Modal.Header>Create New Post</Modal.Header>
            <Modal.Body>
                <div className="flex justify-center items-center flex-col py-10 mb-10">
                    <span className="flex justify-center items-center h-32 w-32 rounded-full bg-gray-100 mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </span>
                    <p className="text-xl mb-8">Drag your photos here</p>
                    <button className="bg-instaBlue text-white font-bold py-2 px-5 rounded-md" onClick={() => filePickerRef.current.click()}>
                        Select image 
                    </button>
                    <input 
                        ref={filePickerRef}
                        type="file" 
                        hidden
                        onChange={selectImage}
                    />
                </div>
            </Modal.Body>
        </>
    )
}

export default ImageSelect