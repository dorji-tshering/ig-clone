import { addDoc, arrayUnion, collection, doc, getDoc, increment, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'
import PostComment from '../../../components/PostComment'
import { db } from '../../../firebase'
import { Comment, CurrentSession } from '../../../utils/types'
import useSWR from 'swr'
import ContentLoader from '../../../contentLoaders/ContentLoader'

const fetchPost = async (postPath: string) => {
    return await getDoc(doc(db, postPath))
}

const Comments = () => {
    const [comment, setComment] = useState('');
    const [postComments, setPostComments] = useState<Comment[]>([]);
    const router = useRouter();
    const postId = router.query.postId as string
    const session = useSession().data as CurrentSession
    const {data: post} = useSWR(`posts/${postId}`, fetchPost)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onSnapshot(query(collection(db, 'posts', postId, 'comments'), orderBy('timeStamp', 'desc')), snapshot => {
            setPostComments(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    text: doc.data().text,
                    likes: doc.data().likes,
                    timeStamp: doc.data().timeStamp,
                    userImage: doc.data().userImage,
                    username: doc.data().username,
                    userId: doc.data().userId,
                    parentColRef: doc.data().parentColRef,
                    replies: doc.data().replies
                }
            }))
            setLoading(false)
        })
        return unsubscribe
    },[])

    // post comment
    const postComment = async(e: FormEvent) => {
        e.preventDefault()
        const commentToSend = comment
        setComment('') // avoid spamming

        await addDoc(collection(db, 'posts', postId, 'comments'), {
            text: commentToSend,
            likes: [],
            userId: session.user.id,
            username: session.user.username,
            userImage: session.user.image,
            parentColRef: `posts/${postId}/comments`,
            timeStamp: serverTimestamp(),
        });

        await updateDoc(doc(db, 'posts', postId), {
            commentCount: increment(1)
        })
    }

    return (
        <div className="pb-16 relative md:max-w-[500px] md:mx-auto">
                {/* top section */}
                <section className="sticky bg-white top-[53px] h-[50px] px-4 border-b">
                    <div className="absolute inset-0 flex justify-center items-center">
                        <h1 className="font-bold text-xl">Comments</h1>
                    </div>
                    <div className="h-full flex items-center relative">
                        <button onClick={() => router.back()}><MdKeyboardBackspace size={26}/></button>
                    </div>
                </section>
                {/* comment input */}
                <section className="flex p-4 items-center bg-[#EFEEEE]">
                    <span className="mr-4">
                        <img src={session.user.image as string ?? '/images/placeholder.png'} className="h-9 w-9 object-cover rounded-full" alt="current user image" />
                    </span>
                    <form className="border rounded-full flex grow items-center py-3 px-5 bg-white" onSubmit={(e) => postComment(e)}>
                            <input 
                                className="text-[100%] p-0 mr-3 grow focus:ring-0 border-none outline-none
                                    placeholder:font-[600] placeholder:text-gray-400" 
                                type="text" 
                                name="comment" 
                                placeholder="Add a comment..."
                                value={comment}
                                autoComplete="off"
                                onChange={(e) => setComment(e.target.value)} />
                            <button 
                                disabled={!comment?.trim()}
                                className="font-semibold text-instaBlue disabled:text-instaBlue/50" 
                                type="submit">Post</button>
                    </form>
                </section>
                <div className="bg-white mb-5 shadow-mainShadow md:rounded-bl-lg md:rounded-br-lg">
                    {/* caption */}
                    <section className="px-4 py-6">
                        <div className={`flex pb-6 border-b`}>
                            <div className="mr-5">
                                <Link href={`/${post?.data()?.username}`} className="rounded-full">
                                    <img src={post?.data()?.userImage ?? '/images/placeholder.png'} alt="" className="object-cover rounded-full w-9 h-9" />
                                </Link>
                            </div>
                            <div className="flex-1">
                                <p>
                                    <Link href={`/${post?.data()?.username}`} className="font-bold mr-3">{post?.data()?.username}</Link>
                                    <span>{post?.data()?.caption}</span>
                                </p>
                                <p className="text-gray-400 text-sm mt-2">2d</p>
                            </div>
                        </div>
                    </section>
                    {/* comments */}
                    <section className="px-5 py-2">
                        {
                            loading ? (
                                <div className='flex justify-center mb-10'>
                                    <ContentLoader/>
                                </div>
                            ):(
                                postComments.length > 0 ? (
                                    <PostComment comments={postComments}/>
                                ):(
                                    <div className='text-center text-gray-400 mb-10'>
                                        <p>No comment for this post yet.</p>
                                    </div>
                                )
                            )
                        }
                    </section>
                </div>
        </div>
    )
}

export default Comments