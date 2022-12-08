import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import EmojiPicker from "./EmojiPicker";
import { Emoji } from 'emoji-mart'
import { addDoc, collection, serverTimestamp, onSnapshot, 
        query, orderBy, DocumentData, QueryDocumentSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebase";
import Moment from 'react-moment';
import { useContextualRouting } from 'next-use-contextual-routing';
import { useRouter } from 'next/router';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { TbMessageCircle2 } from 'react-icons/tb';
import { FiSend } from 'react-icons/fi';
import { HiOutlineBookmark } from 'react-icons/hi';
import { BsEmojiSmile } from 'react-icons/bs';
import isMobile from '../utils/useMediaQuery';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { postOptionsModalState } from '../atoms/postOptionsAtom';
import { useSetRecoilState } from "recoil";
import Link from "next/link";

interface PostData {
    id: string,
    username: string, 
    avatar: string, 
    image: string,
    caption: string,
    timeStamp: any
}

/**
 * Post component used in the `index/home page` composing the feeds and in the `single post page` for mobile devices.
 */
const Post = ({ id, username, avatar, image, caption, timeStamp } : PostData) => {
    const [showPicker, setShowPicker] = useState(false)
    const {data: session}: any = useSession()
    const [comment, setComment] = useState<string>('')
    const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
    const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
    const [hasLiked, setHasLiked] = useState(false)
    const { makeContextualHref, returnHref } = useContextualRouting()
    const router = useRouter()
    const isMb = isMobile()
    const setPostIdForOptions = useSetRecoilState(postOptionsModalState)

    // update comments
    useEffect(() => onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timeStamp', 'desc')), 
        snapShot => setComments(snapShot.docs)
    ), [db, id]);

    // update likes
    useEffect(() => onSnapshot(collection(db, 'posts', id, 'likes'), snapshot => (
        setLikes(snapshot.docs)
    )), [db, id]);

    // update hasLiked
    useEffect(() => {
        setHasLiked(
            likes.findIndex(
                like => like.id === session?.user?.uid
            ) !== -1 
        );
    }, [likes]);

    const postComment = async(e: FormEvent) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment(''); // avoid spamming

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timeStamp: serverTimestamp()
        });
    }

    const postLike = async() => {
        if(hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username,
            })
        }
    }

    return (
        <div className={`bg-white ${!router.query.postId && 'border rounded-md shadow-sm'} relative`}>
            {/* show emoji picker */}
            {
                showPicker && (
                    <EmojiPicker 
                        onClose={() => setShowPicker(false)}
                        onSelect={(emoji) => setComment(prevComment => prevComment + emoji.native)}
                        />
                )
            }
            {/* Header */}
            <div className="flex items-center p-2 md:p-3">
                <Link href="/username">
                    <img 
                        className="rounded-full h-10 w-10 object-contain p-1 mr-3 border" 
                        src={avatar} 
                        alt="user-avatar"
                    />
                </Link>
                <Link href='/username' className="flex-1 font-bold">{ username }</Link>
                <button onClick={() => setPostIdForOptions(id)}>
                    <BiDotsHorizontalRounded className="h-8 w-8"/>
                </button>
            </div>

            {/* Post image */}
            <img 
                className="object-cover w-full"
                src={image} 
                alt="post-image" />
            {/* bottom section */}
            <section className="pt-5">
                {/* Buttons */}
                <div className="flex mb-4 justify-between px-5">
                    <div className="flex space-x-4">
                        {/* like button */}
                        {
                            hasLiked ? (
                                <button onClick={() => postLike()} className="reactBtn">
                                    <AiFillHeart className="reactBtnIcon text-[#FF69B4]"/>
                                </button>
                            ) : (
                                <button onClick={() => postLike()} className="reactBtn">
                                    <AiOutlineHeart className="reactBtnIcon"/>
                                </button>
                            )
                        }
                        {/* comment button */}
                        <button 
                            className="reactBtn"
                            onClick={() => {
                                isMb ? 
                                    router.push(`/post/${'posID'}/comments`)
                                :
                                    router.push(makeContextualHref({
                                        routeModalId: 'post',
                                        currentPageURL: returnHref
                                    }),`/post/postID`, {scroll: false})
                                
                            }}>
                            <TbMessageCircle2 className="reactBtnIcon"/>
                        </button>
                        {/* share button */}
                        <button className="reactBtn">
                            <FiSend className="w-7 h-7 rotate-[18deg]"/>
                        </button>
                    </div>
                    {/* save button */}
                    <button className="reactBtn">
                        <HiOutlineBookmark className="reactBtnIcon"/>                  
                    </button>
                </div>

                {/* Caption, likes and comments */}
                <div className="px-5">
                    { likes.length > 0 && (
                        likes.length === 1 ? (
                            <p className="font-bold mb-2">{likes.length} like</p>
                        ) : (
                            <p className="font-bold mb-2">{likes.length} likes</p>
                        )
                    )}
                    <p className="mb-2">
                        <Link href="/href" className="font-bold mr-1 truncate">{username}</Link>{caption}
                    </p>
                    <p className="text-gray-500 mb-2">View all 120K comments</p>
                </div>
                {/* Comments */}
                {/* {comments.length > 0 && 
                    <div className="px-5 max-h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                        { comments.map((comment => (
                            <div className="flex items-center space-x-2 mb-2" key={comment.id}>
                                <p className="text-sm flex-1">
                                    <span className="font-[500]">{comment.data().username + ' '}</span>
                                    {comment.data().comment}
                                </p>
                            </div>
                        ))) }
                    </div> 
                } */}

                {/* post timestamp */}
                {/* <Moment fromNow className="px-5 mt-2 mb-5 md:mb-0 wordSpace block uppercase  text-[9px] text-gray-400">
                    {timeStamp.toDate()}
                </Moment> */}
                <p className="px-5 mb-5 md:mb-4 wordSpace block uppercase text-[10px] font-[500] text-gray-400">5 DAYS AGO</p>
                
                {/* Input box */}
                <form className="hidden border-t py-2 md:flex items-center px-5" 
                    onSubmit={(e) => postComment(e)}>
                    <button type='button' onClick={() => setShowPicker(true)}>
                        <BsEmojiSmile className="w-6 h-6"/>
                    </button>
                    <input 
                        className="flex-1 text-[100%] focus:ring-0 border-none outline-none
                            placeholder:font-[600] placeholder:text-gray-400"
                        type="text" 
                        name="comment" 
                        placeholder="Add a comment..."
                        id="comment"
                        value={comment}
                        autoComplete="off"
                        onChange={(e) => setComment(e.target.value)} />
                    <button 
                        disabled={!comment?.trim()}
                        className="font-semibold text-instaBlue disabled:text-instaBlue/50" 
                        type="submit">Post</button>
                </form>
            </section>
        </div>
    )
}

export default Post;