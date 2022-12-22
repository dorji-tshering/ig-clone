// a user follower component
import Link from 'next/link'
import { MdOutlineClose, MdKeyboardBackspace } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, collection, doc, DocumentData, onSnapshot, query, QueryDocumentSnapshot, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import { CurrentSession } from '../utils/types'
import { useSession } from 'next-auth/react'

type Props = {
    onClose?: () => void, 
    userId: string,
    onModal?: boolean
}

/**
 * Component to display the followers of the current profile
 * @param userId User id of the current profile
 * @param onModal Whether the component is on the routed modal or not
 */
const Followers = ({onClose, userId, onModal=false}: Props) => {
    const [followers, setFollowers] = useState<QueryDocumentSnapshot<DocumentData>[]>([]) // current profile followers
    const [signedInFollowing, setSignedInFollowing] = useState<string[]>([]) // current signed in following array
    const [loading, setLoading] = useState(false)
    const session = useSession().data as CurrentSession

    // get and set the user followers by checking the following field of other users
    useEffect(() => {
        if(userId) {
            setLoading(true)
            const unsubscribe = onSnapshot(query(collection(db, 'users'), where('following', 'array-contains', userId)), snapshot => {
                setFollowers(snapshot.docs)
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
        <div className={`mb-6 ${!onModal && 'md:border md:rounded-lg pb-6'} md:mx-auto md:w-[500px] text-center`}>
            <div className={`h-[50px] px-4 border-b sticky bg-white ${onModal ? 'top-0':'top-[53px] md:rounded-tr-lg md:rounded-tl-lg'}`}>
                <div className="flex items-center justify-center h-full w-full absolute inset-0">
                    <h1 className="font-bold text-xl">Followers</h1>
                </div>
                {
                    onModal ? (
                        <div className="h-full flex items-center justify-end relative">
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
                followers.length > 0 ? (
                    <div>
                        {
                            followers.map(follower => (
                                <div className="flex justify-between items-center py-3 px-5" key={follower.id}>
                                    <div className="flex items-center">
                                        <div className="h-14 w-14 mr-4">
                                            <Link href={`/${follower.data().username}`}>
                                                    <img src={follower.data().image} alt="" className="h-full object-cover rounded-full border
                                                        border-solid border-gray-100" />
                                            </Link>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <div className="flex items-center">
                                                <Link href={`/${follower.data().username}`} className="font-bold">
                                                    {follower.data().username}
                                                </Link>
                                            </div>
                                            <p className="font-[600] text-gray-400">{follower.data().name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            follower.id !== session.user.id && (
                                                signedInFollowing.includes(follower.id) ? (
                                                    <button 
                                                        onClick={() => follow(follower.id)}
                                                        className="font-[600] py-1 px-3 border border-solid border-gray-200 rounded-md">
                                                        Following
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => follow(follower.id)}
                                                        className="font-[600] py-1 px-3 border border-solid bg-instaBlue border-instaBlue text-white rounded-md">
                                                        Follow
                                                    </button>
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ):(
                    userId === session.user.id ? (
                        <p className="text-gray-400 mt-5">You don't have any followers right now</p>
                    ):(
                        <p className="text-gray-400 mt-5">This user does not have a follower right now</p>
                    )
                )
            }
        </div>
    )
}

export default Followers