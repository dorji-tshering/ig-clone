import DetailedPost from '../../../components/DetailedPost'
import Post from '../../../components/Post'
import { useRouter } from 'next/router'
import isMobile from '../../../utils/useMediaQuery'
import { MdKeyboardBackspace } from 'react-icons/md'
import useSWR from 'swr'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import FeedPostLoader from '../../../contentLoaders/FeedPostLoader'

const fetchPost = async (postPath: string) => {
    return await getDoc(doc(db, postPath))
}

const PostPage = () => {
    const router = useRouter()
    const isMb = isMobile()
    const postId = router.query.postId as string

    const {data: post, isLoading} = useSWR(`posts/${postId}`, fetchPost, {refreshInterval: 5000})

    if(isLoading && isMb) return (
        <div className='mt-5'>
            <FeedPostLoader/>
        </div>
    )

    if(post?.data() === undefined && !isLoading) return (
        <div className='flex items-center flex-col justify-center px-5 h-full bg-white'>
            <h1 className='px-7 py-3 bg-gray-700 rounded-full text-gray-100 mb-10'>Post Not Found</h1>
            <div className='w-full max-w-[400px] shadow-mainShadow p-10 rounded-md'>
                <p className='text-gray-600'>Seems like the post with the given <span className='font-bold'>id</span> is either removed or doesn't exist.</p>
            </div>
        </div>
    )

    return (
        <div className="pageContent relative">
            {
                isMb ? (
                    <div>
                        <section className="h-[50px] bg-white px-4 border-b -mt-5 sticky z-10 top-[53px] mb-5">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h1 className="text-xl font-bold">Photo</h1>
                            </div>
                            <div className="relative flex items-center h-full">
                                <button onClick={() => router.back()}><MdKeyboardBackspace size={26}/></button>
                            </div>
                        </section>
                        <Post
                            index={0} 
                            postId={postId}
                            username={post?.data()?.username}
                            userImage={post?.data()?.userImage}
                            imageFilter={post?.data()?.imageFilter}
                            postImage={post?.data()?.postImage}
                            caption={post?.data()?.caption}
                            timeStamp={post?.data()?.timeStamp}
                            commentCount={post?.data()?.commentCount}
                        />
                    </div>
                ):(
                    <DetailedPost postId={postId}/>
                )
            }
        </div>
    )
}

export default PostPage