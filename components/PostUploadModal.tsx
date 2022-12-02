import { useRecoilState } from 'recoil';
import { uploadModalState } from '../atoms/uploadModalAtom';
import { Alert, Modal } from 'flowbite-react';
import { useState } from 'react';
import ImageSelect from './ImageSelect';
import ImageEditor from './ImageEditor';
import ImageUpload from './ImageUpload';

const PostUploadModal = () => {
    const [openModal, setOpenModal] = useRecoilState(uploadModalState);
    const [selectedFile, setSelectedFile] = useState<any>(null); // file selected from device
    const [editedFile, setEditedFile] = useState<any>(null); // file read as dataURL
    const [fileSelectOpen, setFileSelectOpen] = useState(true);
    const [editorOpen, setEditorOpen] = useState(false);
    const [captionModalOpen, setCaptionModalOpen] = useState(false);
    const [alertChanges, setAlertChanges] = useState(false);

    const closeModal = () => {
        if(editedFile || selectedFile) {
            setAlertChanges(true);
        } else {
            setOpenModal(false);
        }
    }

    const discard = () => {
        selectedFile && setSelectedFile(null);
        editedFile && setEditedFile(null);
        editorOpen && setEditorOpen(false);
        captionModalOpen && setCaptionModalOpen(false);
        setFileSelectOpen(true);
        setAlertChanges(false);
        setOpenModal(false);
    }

    const cancel = () => {
        setAlertChanges(false);
    }

    return (
        <>
            <Modal 
                show={openModal} 
                onClose={() => closeModal()}
                className="!h-full centerModal transition-all duration-1000 ease-in-out">
                { alertChanges &&  (
                    <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center p-3 md:p-10 bg-black/30 z-10">
                        <Alert color='warning' rounded={true} className="text-center">
                            <h2 className="text-xl font-bold">Discard Post?</h2>
                            <p className="mt-5">If you leave, your edits won't be saved.</p>
                            <div className="mt-7">
                                <button 
                                    onClick={() => discard()}
                                    className="py-2 px-5 mr-3 rounded-md text-white bg-yellow-700 border border-solid border-yellow-700"
                                    >Discard</button>
                                <button 
                                    onClick={() => cancel()}
                                    className="py-2 px-5 rounded-md border border-yellow-700 border-solid"
                                    >Cancel</button>
                            </div>
                        </Alert>
                    </div>
                )}
                { fileSelectOpen && 
                    <ImageSelect 
                        setFileSelectOpen={setFileSelectOpen} 
                        setEditorOpen={setEditorOpen}
                        setSelectedFile={setSelectedFile} /> 
                }
                { editorOpen && 
                    <ImageEditor 
                        setFileSelectOpen={setFileSelectOpen} 
                        setEditorOpen={setEditorOpen} 
                        setCaptionModalOpen={setCaptionModalOpen}
                        selectedFile={selectedFile}
                        setEditedFile={setEditedFile}
                        editedFile={editedFile}
                        setSelectedFile={setSelectedFile} /> 
                }
                { captionModalOpen && 
                    <ImageUpload 
                        setEditorOpen={setEditorOpen} 
                        setCaptionModalOpen={setCaptionModalOpen} 
                        setOpenModal={setOpenModal} 
                        setFileSelectOpen={setFileSelectOpen} 
                        editedFile={editedFile} /> 
                }
            </Modal>
        </>
    )
}

export default PostUploadModal