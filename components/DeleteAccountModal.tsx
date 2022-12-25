import { deleteObject, ref } from "firebase/storage"
import { useRecoilState } from "recoil"
import { deleteAccountState } from "../atoms/deleteAccoutAtom"
import Modal from '../components/Modal'
import { db, storage } from "../firebase"
import { useSession } from 'next-auth/react'
import { CurrentSession } from "../utils/types"
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where, increment, getDoc, arrayRemove } from "firebase/firestore"
import ContentLoader from "../contentLoaders/ContentLoader"
import { useState } from "react"
import { signOut } from "next-auth/react"

const DeleteAccountModal = () => {
    const [openModal, setOpenModal] = useRecoilState(deleteAccountState)
    const session = useSession().data as CurrentSession
    const [deleting, setDeleting] = useState(false)
    
    const deleteAccount = async () => {
        setDeleting(true)
        // delete comments by the current user
        const comments = await getDocs(query(collection(db, 'comments'), where('userId', '==', session.user.id)))
        comments.docs.length > 0 && comments.docs.forEach(async (comment) => {
            await deleteDoc(doc(db, 'comments', comment.id))
            const post = await getDoc(doc(db, 'posts', comment.data().postId))
            if(post.exists()) {
                await updateDoc(doc(db, 'posts', comment.data().postId), {
                    commentCount: increment(-1)
                })
            }
        })

        // delete post images & post of current user
        const posts = await getDocs(query(collection(db, 'posts'), where('userId', '==', session.user.id)))
        posts.docs.length > 0 && posts.docs.forEach(async(post) => {
            await deleteObject(ref(storage, `posts/images/${session.user.id}/${post.id}`))
            await deleteDoc(doc(db, 'posts', post.id))
        })

        // remove likes by the current users on posts
        const likedPosts = await getDocs(query(collection(db, 'posts'), where('likes', 'array-contains', session.user.id)))
        likedPosts.docs.length > 0 && likedPosts.docs.forEach(async(likedPost) => {
            await updateDoc(doc(db, 'posts', likedPost.id), {
                likes: arrayRemove(session.user.id)
            })
        })

        // delete account/accounts of current user
        const accounts = await getDocs(query(collection(db, 'accounts'), where('userId', '==', session.user.id)))
        accounts.forEach(async(account) => {
            await deleteDoc(doc(db, 'accounts', account.id))
        })
        //delete user

        // delete session/sessions of current user
        const sessions = await getDocs(query(collection(db, 'sessions'), where('userId', '==', session.user.id)))
        sessions.forEach(async(session) => {
            await deleteDoc(doc(db, 'sessions', session.id))
        })

        // delete current user
        await deleteDoc(doc(db, 'users', session.user.id))
        await signOut()
        setDeleting(false)
        setOpenModal(false)
    }

    return (
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
        >   
            <>
                {
                    deleting && <div className="fixed inset-0 flex items-center bg-gray-900/30 justify-center"><ContentLoader/></div>
                }
                <div className="flex flex-col">
                    <div className="py-5 border-b">
                        <h1 className="font-bold text-lg mb-2">Confirm account delete?</h1>
                        <p className="max-w-[400px] text-sm text-gray-400 px-5">Your posts, comments, and all the data associated with the current account will be deleted.</p>
                    </div>
                    <button onClick={deleteAccount} className="font-[600] text-red-500 py-3 border-b">{deleting ? 'Deleting...' : 'Delete'}</button>
                    <button onClick={() => setOpenModal(false)} className="py-3">Cancel</button>
                </div>
            </>
        </Modal>
    )
}

export default DeleteAccountModal