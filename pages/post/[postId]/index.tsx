// single post page
import DetailedPost from '../../../components/DetailedPost'
import Post from '../../../components/Post'
import { useRouter } from 'next/router'
import isMobile from '../../../utils/useMediaQuery'
import { MdKeyboardBackspace } from 'react-icons/md'
import useSWR from 'swr'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'

const fetchPost = async (postPath: string) => {
    return await getDoc(doc(db, postPath))
}

const PostPage = () => {
    const router = useRouter();
    const isMb = isMobile();
    const postId = router.query.postId as string

    const {data: post, isLoading} = useSWR(`posts/${postId}`, fetchPost)

    if(isLoading) return <></>

    return (
        <div className="pageContent relative">
            {
                isMb ? (
                    <div>
                        <section className="h-[50px] bg-white px-4 border-b -mt-5 sticky z-10 top-[53px]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h1 className="text-xl font-bold">Photo</h1>
                            </div>
                            <div className="relative flex items-center h-full">
                                <button onClick={() => router.back()}><MdKeyboardBackspace size={26}/></button>
                            </div>
                        </section>
                        <Post
                            postId={postId}
                            username={post?.data()?.username}
                            userImage={post?.data()?.userImage}
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