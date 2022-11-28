import { Modal } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    setFileSelectOpen: Dispatch<SetStateAction<boolean>>
    setEditorOpen: Dispatch<SetStateAction<boolean>>
}

const ImageSelect = ({ setFileSelectOpen, setEditorOpen }: Props) => {
    return (
        <>
            <Modal.Header>Select Image</Modal.Header>
            <button onClick={() => {setFileSelectOpen(false); setEditorOpen(true);}}>Selected</button>
        </>
    )
}

export default ImageSelect