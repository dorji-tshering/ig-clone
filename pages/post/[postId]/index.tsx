// single post page
import DetailedPost from '../../../components/DetailedPost';
import Post from '../../../components/Post';
import { useRouter } from 'next/router';
import isMobile from '../../../utils/useMediaQuery';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useEffect } from 'react';

const PostPage = () => {
    const router = useRouter();
    const isMb = isMobile();

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
                            id='hello' 
                            username='bumie' 
                            avatar='/images/dorji.jpg'
                            image='/images/hori.jpeg'
                            caption='Super glad that things are going really well right now.'
                            timeStamp='November 27, 2022 at 3:00:02 AM UTC+6'
                        />
                    </div>
                ):(
                    <DetailedPost postID="123"/>
                )
            }
        </div>
    )
}

export default PostPage