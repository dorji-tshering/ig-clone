import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'
import { useSession } from 'next-auth/react'
import { CurrentSession } from '../utils/types'

const Posts = () => {
    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
    const [loading, setLoading] = useState(true)
    const session = useSession().data as CurrentSession

    useEffect(() => 
        onSnapshot(query(collection(db, 'posts'), orderBy('timeStamp', 'desc')), 
            snapshot => {
                setPosts(snapshot.docs)
                setLoading(false)
            }
        ),
    [])

    if(loading) return <></>

    return (
        <div className={`sm:max-w-lg md:max-w-xl mx-auto ${session ? 'lg:max-w-none' : 'lg:max-w-2xl'}`}>
            {
                posts.length === 0 ? (
                    <div><p>You don't have posts for now.</p></div>
                ):(
                    posts.map((post) => (
                        <div className="mb-6" key={post.id}>
                            <Post  
                                postId={post.id} 
                                username={post.data().username} 
                                userId={post.data().userId}
                                avatar={post.data().userImage}
                                image={post.data().postImage}
                                caption={post.data().caption}
                                timeStamp={post.data().timeStamp} />
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Posts;