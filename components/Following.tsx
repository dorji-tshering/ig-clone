// a user following component
import Link from 'next/link'
import { MdOutlineClose, MdKeyboardBackspace } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { arrayRemove, arrayUnion, collection, doc, DocumentData, onSnapshot, query, QueryDocumentSnapshot, updateDoc, where } from 'firebase/firestore';
import { CurrentSession } from '../utils/types';
import { useSession } from 'next-auth/react';
import { db } from '../firebase';

type Props = {
    onClose?: () => void, 
    userId: string,
    onModal?: boolean
}

const Following = ({onClose, userId, onModal=false}: Props) => {
    const [following, setFollowing] = useState<QueryDocumentSnapshot<DocumentData>[]>([]) // current profile followers
    const [signedInFollowing, setSignedInFollowing] = useState<string[]>([]) // current signed in following array
    const [loading, setLoading] = useState(false)
    const session = useSession().data as CurrentSession

    // get and set the user followers by checking the following field of other users
    useEffect(() => {
        if(userId) {
            setLoading(true)
            const unsubscribe = onSnapshot(query(collection(db, 'users'), where('followers', 'array-contains', userId)), snapshot => {
                setFollowing(snapshot.docs)
                setLoading(false)
            })
            return unsubscribe
        }
    }, [userId])

    // get and listen to changes in current signed in user doc
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'users', session.user.id), snapshot => {
            setSignedInFollowing(snapshot.data()?.following)
        })
        return unsubscribe
    },[])

    // follow/unfollow the users relative to currently signed in user
    const follow = async (userId: string) => {
        if(signedInFollowing.includes(userId)) {
            await updateDoc(doc(db, 'users', session.user.id), {
                following: arrayRemove(userId)
            })
            await updateDoc(doc(db, 'users', userId), {
                followers: arrayRemove(session.user.id)
            })
        }else {
            await updateDoc(doc(db, 'users', session.user.id), {
                following: arrayUnion(userId)
            })
            await updateDoc(doc(db, 'users', userId), {
                followers: arrayUnion(session.user.id)
            })
        }
    }

    if(!userId || loading) return <></>

    return (
        <div className={`mb-6 ${!onModal && 'md:border md:rounded-lg pb-6'} md:w-[500px] text-center`}>
            <div className={`h-[50px] px-4 border-b sticky bg-white ${onModal ? 'top-0':'top-[53px] md:rounded-tr-lg md:rounded-tl-lg'}`}>
                <div className="flex items-center justify-center h-full w-full absolute inset-0">
                    <h1 className="font-bold text-xl">Following</h1>
                </div>
                {
                    onModal ? (
                        <div className="h-full justify-end flex items-center relative">
                            <button onClick={onClose}><MdOutlineClose size={26}/></button>
                        </div>
                    ):(
                        <div className="h-full flex items-center relative">
                            <button onClick={onClose}><MdKeyboardBackspace size={26}/></button>
                        </div>
                    )
                }
            </div>
            {/* user */}
            {
                following.length > 0 ? (
                    following.map(user => (
                        <div className="flex justify-between items-center py-3 px-5" key={user.id}>
                            <div className="flex items-center">
                                <div className="h-14 w-14 mr-4">
                                    <Link href={`/${user.data().username}`}>
                                            <img src={user.data().image} alt="" className="h-full object-cover rounded-full border
                                                border-solid border-gray-100" />
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center">
                                        <Link href={`/${user.data().username}`} className="font-bold">
                                            {user.data().username}
                                        </Link>
                                    </div>
                                    <p className="font-[600] text-gray-400">{user.data().name}</p>
                                </div>
                            </div>
                            <div>
                                {
                                    user.id !== session.user.id && (
                                        signedInFollowing.includes(user.id) ? (
                                            <button 
                                                onClick={() => follow(user.id)}
                                                className="font-[600] py-1 px-3 border border-solid border-gray-200 rounded-md">
                                                Following
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => follow(user.id)}
                                                className="font-[600] py-1 px-3 border border-solid bg-instaBlue border-instaBlue text-white rounded-md">
                                                Follow
                                            </button>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    ))
                ):(
                    userId === session.user.id ? (
                        <p className="text-gray-400 mt-5">You don't follow anyone right now</p>
                    ):(
                        <p className="text-gray-400 mt-5">This user does not follow anyone right now</p>
                    )
                )
            }
        </div>
    )
}

export default Following