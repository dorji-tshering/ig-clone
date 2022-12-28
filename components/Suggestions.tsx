import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react'
import { arrayUnion, collection, doc, DocumentData, onSnapshot, query, QueryDocumentSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { CurrentSession } from '../utils/types'
import Link from "next/link"
import Image from 'next/image'

function Suggestions() {
    const [suggestions, setSuggestions] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
    const session = useSession().data as CurrentSession

    // get users not followed by the current user
    useEffect(() => 
        onSnapshot(query(collection(db, 'users')), snapshot => {
            setSuggestions(snapshot.docs.filter(user => user.id !== session.user.id && !user.data().followers.includes(session.user.id)))
        }),
    [])

    // follow suggested user
    const follow = async (userId: string) => {
        await updateDoc(doc(db, 'users', session.user.id), {
            following: arrayUnion(userId)
        })
        await updateDoc(doc(db, 'users', userId), {
            followers: arrayUnion(session.user.id)
        })
    }

    return (
        <div className="mt-6">
            <div className="flex justify-between mb-5">
                <h3 className='font-bold text-gray-400'>Suggestions for you</h3>
                {/* <button className='text-gray-600 font-semibold'>See All</button> */}
            </div>
            {
                suggestions.length > 0 ? (
                    suggestions.map(user=>(
                        <div key={user.id} className="flex items-center justify-between mt-3">
                            <Link href={`/${user.data().username}`}>
                                <Image className='object-cover rounded-full border p-[2px]' 
                                    width={40}
                                    height={40}
                                    src={user.data().image} alt="" />
                            </Link>
                            <div className="flex-1 ml-4">
                                <Link href={`/${user.data().username}`} className='font-semibold'>{user.data().username}</Link>
                            </div>
                            <button onClick={() => follow(user.id)} className='text-instaBlue font-bold'>Follow</button>
                        </div>
                    ))
                ):(
                    <p className="text-gray-400">No suggestions to show for now</p>
                )
            }
        </div>
    )
}

export default Suggestions