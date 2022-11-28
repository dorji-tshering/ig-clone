import { Modal } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    setFileSelectOpen: Dispatch<SetStateAction<boolean>>
    setEditorOpen: Dispatch<SetStateAction<boolean>>
    setCaptionModalOpen: Dispatch<SetStateAction<boolean>>
}

const ImageEditor = ({ setFileSelectOpen, setEditorOpen, setCaptionModalOpen }: Props) => {
    return (
        <>
            <Modal.Header>ImageEditor</Modal.Header>
            <button onClick={() => {setEditorOpen(false); setFileSelectOpen(true);}}>back</button>
            <button onClick={() => {setEditorOpen(false); setCaptionModalOpen(true)}}>next</button>
        </>
    )
}

export default ImageEditor