import { profileImageUploadState } from '../atoms/profileImageUploadAtom';
import { useRecoilState } from 'recoil';
import Modal from './Modal';
import { useRouter } from 'next/router';

const ProfileImageUpload = () => {
    const [openModal, setOpenModal] = useRecoilState(profileImageUploadState);
    const router = useRouter();

    // upload photo
    const uploadPhoto = () => {

    }

    // remove photo
    const removePhoto = () => {

    }

    return (
        <>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <>
                    <h1 className="text-xl font-bold py-7">Change Profile Photo</h1>
                    <button className="py-4 border-t border-solid border-t-gray-200 w-full 
                        font-bold text-instaBlue mx-auto" onClick={uploadPhoto}>Upload Photo</button>
                    <button className="py-4 border-t border-solid border-t-gray-200 w-full 
                        font-bold text-red-600 mx-auto" onClick={removePhoto}>Remove Current Photo</button>
                    <button className="py-4 border-t border-solid border-t-gray-200 w-full 
                        font-[500] mx-auto"
                        onClick={() => setOpenModal(false)}>Cancel</button>
                </>
            </Modal>
        </>
    )
}

export default ProfileImageUpload