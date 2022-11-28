import { useRecoilState } from 'recoil';
import { uploadModalState } from '../atoms/uploadModalAtom';
import { Modal } from 'flowbite-react';
import { useState } from 'react';
import ImageSelect from './ImageSelect';
import ImageEditor from './ImageEditor';
import ImageUpload from './ImageUpload';

const PostUploadModal = () => {
    const [openModal, setOpenModal] = useRecoilState(uploadModalState);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [fileSelectOpen, setFileSelectOpen] = useState(true);
    const [editorOpen, setEditorOpen] = useState(false);
    const [captionModalOpen, setCaptionModalOpen] = useState(false);

    return (
        <>
            <Modal show={openModal} onClose={() => {setOpenModal(false); setFileSelectOpen(true); setEditorOpen(false); setCaptionModalOpen(false)}}>
                { fileSelectOpen && <ImageSelect setFileSelectOpen={setFileSelectOpen} setEditorOpen={setEditorOpen}/>}
                { editorOpen && <ImageEditor setFileSelectOpen={setFileSelectOpen} setEditorOpen={setEditorOpen} setCaptionModalOpen={setCaptionModalOpen}/> }
                { captionModalOpen && <ImageUpload setEditorOpen={setEditorOpen} setCaptionModalOpen={setCaptionModalOpen} setOpenModal={setOpenModal} setFileSelectOpen={setFileSelectOpen}/> }
            </Modal>
        </>
    )
}

export default PostUploadModal