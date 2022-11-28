import { Modal } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    setEditorOpen: Dispatch<SetStateAction<boolean>>
    setCaptionModalOpen: Dispatch<SetStateAction<boolean>>
    setOpenModal: Dispatch<SetStateAction<boolean>>
    setFileSelectOpen: Dispatch<SetStateAction<boolean>>
}

const ImageUpload = ({ setEditorOpen, setCaptionModalOpen, setOpenModal, setFileSelectOpen }: Props) => {
    return (
        <>
            <Modal.Header>ImageUpload</Modal.Header>
            <button onClick={() => {setOpenModal(false); setFileSelectOpen(true); setEditorOpen(false); setCaptionModalOpen(false)}}>post</button>
            <button onClick={() => {setEditorOpen(true); setCaptionModalOpen(false);}}>back</button>
        </>
    )
}

export default ImageUpload