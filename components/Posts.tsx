import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'
import { useSession } from 'next-auth/react'
import { CurrentSession } from '../utils/types'
import { uploadModalState } from '../atoms/uploadModalAtom'
import { useSetRecoilState } from 'recoil'
import { MdAddToPhotos } from 'react-icons/md'
import FeedPostLoader from '../loaders/FeedPostLoader'

const Posts = () => {
    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
    const [loading, setLoading] = useState(true)
    const session = useSession().data as CurrentSession
    const openUploadModal = useSetRecoilState(uploadModalState)

    useEffect(() => 
        onSnapshot(query(collection(db, 'posts'), orderBy('timeStamp', 'desc')), 
            snapshot => {
                setPosts(snapshot.docs)
                setLoading(false)
            }
        ),
    [])

    if(loading) return (
       <>
            {
                Array.from({length: 2}).map((_, idx) => <FeedPostLoader key={idx}/>)
            }
       </>
    )

    return (
        <div className={`sm:max-w-lg md:max-w-xl mx-auto ${session ? 'lg:max-w-none' : 'lg:max-w-2xl'}`}>
            {
                posts.length === 0 ? (
                    <div className='flex flex-col items-center mt-20 lg:mt-0 mx-5 py-10 md:py-20 rounded-md bg-white shadow-mainShadow'>
                        <button onClick={() => openUploadModal(true)} className='w-32 h-32 flex justify-center items-center bg-instaBlue/5 rounded-full'>
                            <MdAddToPhotos className='text-instaBlue' size={36}/>
                        </button>
                        <p className='mt-10 text-gray-400 px-8 text-center'>Empty feed for now. Click the icon above to start uploading!</p>
                    </div>
                ):(
                    posts.map((post, index) => (
                        <div className="mb-6" key={post.id}>
                            <Post  
                                index={index}
                                postId={post.id} 
                                imageFilter={post.data().imageFilter}
                                username={post.data().username} 
                                userImage={post.data().userImage}
                                postImage={post.data().postImage}
                                caption={post.data().caption}
                                commentCount={post.data().commentCount}
                                timeStamp={post.data().timeStamp} />
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Posts;