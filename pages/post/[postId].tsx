// single post page
import DetailedPost from '../../components/DetailedPost';
import Post from '../../components/Post';
import { useRouter } from 'next/router';
import isMobile from '../../utils/useMediaQuery';

const PostPage = () => {
    const router = useRouter();

    const isMb = isMobile();
    console.log(isMb);

    return (
        // text-center to align the direct child centrally which has display inline-block containing a direct child with display flex
        <div className="pageContent px-5">
            {
                isMb ? (
                    <Post
                        id='hello' 
                        username='bumie' 
                        avatar='/images/dorji.jpg'
                        image='/images/hori.jpeg'
                        caption='Super glad that things are going really well right now.'
                        timeStamp='November 27, 2022 at 3:00:02 AM UTC+6'
                    />
                ):(
                    <DetailedPost postID="123"/>
                )
            }
        </div>
    )
}

export default PostPage