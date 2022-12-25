import { deleteObject, ref } from "firebase/storage"
import { useRecoilState } from "recoil"
import { deleteAccountState } from "../atoms/deleteAccoutAtom"
import Modal from '../components/Modal'
import { storage } from "../firebase"
import { useSession } from 'next-auth/react'
import { CurrentSession } from "../utils/types"

const DeleteAccountModal = () => {
    const [openModal, setOpenModal] = useRecoilState(deleteAccountState)
    const session = useSession().data as CurrentSession
    //console.log(ref(storage, `posts/images/${session.user.id}`))
    
    // delete all the data associated with the current user
    const deleteAccount = async () => {
        //deleteObject(ref(storage, `posts/images/${session.user.id}/BzpqEkY25nfr44QCg3jQ`)).then(_ => console.log('deleteAccountSuccess'))
        // delete comments of current user


        // delete post images of current user

        // delete all posts of current user

        // delete account

        //delete user

        // delete session
    }

    return (
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
        >
            <div className="flex flex-col">
                <h1 className="font-bold text-lg py-5 border-b">Confirm account delete?</h1>
                <button onClick={deleteAccount} className="font-[600] text-red-500 py-3 border-b">Delete</button>
                <button onClick={() => setOpenModal(false)} className="py-3">Cancel</button>
            </div>
        </Modal>
    )
}

export default DeleteAccountModal