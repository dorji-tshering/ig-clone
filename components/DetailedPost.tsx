import Link from 'next/link'
import classNames from 'classnames'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import { RiBookmark3Fill, RiBookmark3Line } from 'react-icons/ri'
import { TbMessageCircle2 } from 'react-icons/tb'
import PostComment from './PostComment'
import { BsEmojiSmile } from 'react-icons/bs'
import { postOptionsModalState } from '../atoms/postOptionsAtom'
import { useSetRecoilState } from 'recoil'
import { onModalState } from '../atoms/onModalAtom'
import EmojiPicker from './EmojiPicker'
import { db } from '../firebase'
import { addDoc, arrayRemove, arrayUnion, collection, doc, DocumentData, DocumentSnapshot, getDoc, increment, onSnapshot, orderBy, query, QueryDocumentSnapshot, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import Moment from 'react-moment'
import { Comment } from '../utils/types'
import { useSession } from 'next-auth/react'
import { CurrentSession } from '../utils/types'
import ContentLoader from '../loaders/ContentLoader'
import Image from 'next/image'
import placeholder from '../utils/rgbDataUrl'

type Props = {
    postId: string,
    onModal?: boolean
}

/**
 * Single post component for device-width > 768px. Used by `RoutedModal` component and `/post/[postID]` path.
 */
const DetailedPost = ({postId, onModal=false}: Props) => {
    const [comment, setComment] = useState<string>('')
    const [postComments, setPostComments] = useState<Comment[]>([])
    const [post, setPost] = useState<DocumentSnapshot<DocumentData>>()
    const openPostIdForOptions = useSetRecoilState(postOptionsModalState)
    const [showPicker,setShowPicker] = useState(false)
    const [likes, setLikes] = useState<string[]>([])
    const [hasLiked, setHasLiked] = useState(false)
    const [savedPosts, setSavedPosts] = useState<string[]>([])
    const [hasSaved, setHasSaved] = useState(false)
    const [following, setFollowing] = useState<string[]>([]) // field of current user
    const [follows, setFollows] = useState(false)
    const setOnRoutedModal = useSetRecoilState (onModalState)
    const session = useSession().data as CurrentSession
    const inputRef = useRef<any>(null)
    const [commentLoading, setCommentLoading] = useState(false)

    // update whether the post is on routed modal or not
    useEffect(() => {
        onModal && setOnRoutedModal(true)
        return () => {
            if(onModal) setOnRoutedModal(false)
        }
    },[])

    // set and listen to post and likes
    useEffect(() => onSnapshot(doc(db, 'posts', postId), snapshot => {
        setPost(snapshot)
        setLikes(snapshot.data()?.likes)
    }), [])

    // update hasLiked
    useEffect(() => {
        setHasLiked(likes.includes(session.user.id))
    }, [likes])

    // listen to post comments
    useEffect(() => {
        setCommentLoading(true)
        const unsubscribe = onSnapshot(query(collection(db, 'comments'), where('postId', '==', postId), orderBy('timeStamp', 'desc')), snapshot => {
            setPostComments(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    text: doc.data().text,
                    likes: doc.data().likes,
                    postId: doc.data().postId,
                    timeStamp: doc.data().timeStamp,
                    userImage: doc.data().userImage,
                    username: doc.data().username,
                    userId: doc.data().userId,
                    parentColRef: doc.data().parentColRef,
                    replies: doc.data().replies
                }
            }))
            setCommentLoading(false)
        })
        return unsubscribe
    },[])

    //listen to savePosts and following field changes for current user
    useEffect(() => onSnapshot(doc(db, 'users', session.user.id), snapshot => {
        setSavedPosts(snapshot.data()?.savedPosts)
        setFollowing(snapshot.data()?.following)
    }),[])

    // update hasSaved
    useEffect(() => {
        setHasSaved(savedPosts.includes(postId))
    },[savedPosts])
 
    // update follows
    useEffect(() => {
        setFollows(following.includes(post?.data()?.userId))
    },[following])

    // follow other user {update followers and following of both current user and post user}
    const follow = async () => {
        if(follows) {
            await updateDoc(doc(db, 'users', session.user.id), {
                following: arrayRemove(post?.data()?.userId)
            })
            await updateDoc(doc(db, 'users', post?.data()?.userId), {
                followers: arrayRemove(session.user.id)
            })
        }else {
            await updateDoc(doc(db, 'users', session.user.id), {
                following: arrayUnion(post?.data()?.userId)
            })
            await updateDoc(doc(db, 'users', post?.data()?.userId), {
                followers: arrayUnion(session.user.id)
            })
        }
    }

    // post like
    const postLike = async() => {
        if(hasLiked) {
            await updateDoc(doc(db, 'posts', postId), {
                likes: arrayRemove(session.user.id)
            })
        } else {
            await updateDoc(doc(db, 'posts', postId), {
                likes: arrayUnion(session.user.id),
            })
        }
    }

    // post comment
    const postComment = async(e: FormEvent) => {
        e.preventDefault()
        const commentToSend = comment
        setComment('') // avoid spamming

        await addDoc(collection(db, 'comments'), {
            text: commentToSend,
            likes: [],
            userId: session.user.id,
            postId: postId,
            username: session.user.username,
            userImage: session.user.image,
            parentColRef: `posts/${postId}/comments`,
            timeStamp: serverTimestamp(),
        });

        await updateDoc(doc(db, 'posts', postId), {
            commentCount: increment(1)
        })
    }

    // save post
    const savePost = async () => {
        if(hasSaved) {
            await updateDoc(doc(db, 'users', session.user.id), {
                savedPosts: arrayRemove(postId)
            })
        }else {
            await updateDoc(doc(db, 'users', session.user.id), {
                savedPosts: arrayUnion(postId)
            })
        }
    }

    return (
        <div className="text-center">
            <div className={classNames(
                'rounded-md overflow-hidden inline-block text-left',
                onModal && 'w-auto max-w-[80vw] h-[85vh] xl:h-[90vh]',
                !onModal && 'w-auto max-w-4xl lg:max-w-6xl h-[500px] mx-auto shadow-mainShadow',
            )}>
                {/* post container */}
                <div className='flex h-full w-full'>
                    {/* left/top section */}
                    {
                        post ? (
                            <div className="bg-black h-full flex items-center">
                                <figure className={`w-full ${post.data()?.imageFilter}`}>
                                    <Image 
                                        src={post.data()?.postImage ?? placeholder} 
                                        width={800}
                                        height={800}
                                        priority
                                        placeholder='blur'
                                        blurDataURL={placeholder}
                                        quality={100}
                                        style={{height: '100%', width: 'auto'}}
                                        alt="post image" 
                                        className={classNames(
                                        'object-contain w-full', onModal ? 'max-h-[90%]' : 'h-[100%] w-auto',
                                        )}
                                    />
                                </figure>
                            </div>
                        ):(
                            <div className='flex justify-center items-center border-r w-[400px] bg-white'>
                                <ContentLoader/>
                            </div>
                        )
                    }
                    {/* right/bottom section */}
                    <div className={classNames(
                        'bg-white flex flex-col scrollbar-none w-auto relative',
                        !onModal && 'min-w-[340px] max-w-[350px]', onModal && 'max-w-[400px] min-w-[380px]'
                    )}>
                        <div id="emojiPicker">
                            {
                                showPicker && (
                                    <EmojiPicker
                                        onClose={() => setShowPicker(false)}
                                        onSelect={(emoji) => setComment(prevComment => prevComment + emoji.native)}
                                        bottom='bottom-[60px]'
                                        customStyles='right-0 left-0 w-fit mx-auto'
                                    />
                                )
                            }
                        </div>
                        {/* top section */}
                        <section className="flex justify-between items-center p-5 border-b">
                            {
                                post ? (
                                    <>
                                        <div className="flex items-center">
                                            <Link href={`/${post?.data()?.username}`} className="mr-5 rounded-full">
                                                <img src={post?.data()?.userImage ?? '/images/placeholder.png'} alt="post user image" className="h-10 w-10 object-cover rounded-full"/>
                                            </Link>
                                            <div> 
                                                <Link href={`/${post?.data()?.username}`} className="font-bold">
                                                    {post?.data()?.username}
                                                </Link>
                                                {
                                                    (post?.data()?.userId !== session.user.id) && (
                                                        follows ? (
                                                            <>
                                                                <span className="mx-2 text-gray-400">&bull;</span>
                                                                <button onClick={follow} className="text-gray-500 font-[600]">Following</button>
                                                            </>
                                                        ):(
                                                            <>
                                                                <span className="mx-2 text-gray-400">&bull;</span>
                                                                <button onClick={follow} className="text-instaBlue font-[600]">Follow</button>
                                                            </>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <button onClick={() => {
                                                openPostIdForOptions(postId)
                                                }}><BiDotsHorizontalRounded size={26}/>
                                            </button>
                                        </div>
                                    </>
                                ):(
                                    <div className='flex justify-center w-full'>
                                        <ContentLoader/>
                                    </div>
                                )
                            }
                        </section>

                        {/* middle scrollable comment section */}
                        <section className="p-5 overflow-y-auto scrollbar-none flex-1">                              
                            {/* caption */}
                            {
                                post && (
                                    <div className="flex mb-7">
                                        <div className="mr-5">
                                            <Link href={`/${post?.data()?.username}`} className="rounded-full">
                                                <img src={post?.data()?.userImage ?? '/images/placeholder.png'} alt="post user image" className="object-cover rounded-full w-10 h-10" />
                                            </Link>
                                        </div>
                                        <div className="flex-1">
                                            <p>
                                                <Link href={`/${post?.data()?.username}`} className="font-bold mr-3">{post?.data()?.username}</Link>
                                                <span>{post?.data()?.caption}</span>
                                            </p>
                                            <Moment fromNow className="text-gray-400 text-sm mt-2">
                                                {post?.data()?.timeStamp.toDate()}
                                            </Moment>
                                        </div>
                                    </div>
                                )
                            }
                            {/* comments */}
                            {
                                commentLoading ? (
                                    <div className='flex w-full justify-center mt-14'>
                                        <ContentLoader/>
                                    </div>
                                ):(
                                    postComments.length > 0 ? (
                                        <PostComment comments={postComments}/>
                                    ):(
                                        <div className='text-center flex justify-center text-gray-400'>
                                            <p>No comments yet.</p>
                                        </div>
                                    )
                                )
                            }                             
                        </section>

                        {/* bottom action section */}
                        <section className="border-t">
                            <div className="p-4">
                                {/* buttons */}
                                <div className="flex mb-3 justify-between">
                                    <div className="flex space-x-4">
                                        {/* like button */}
                                        <button onClick={() => postLike()} className="reactBtn">
                                            {
                                                hasLiked ? (
                                                    <AiFillHeart className="reactBtnIcon text-[#FF69B4]"/>
                                                ) : (
                                                    <AiOutlineHeart className="reactBtnIcon"/>
                                                )
                                            }
                                        </button>
                                        {/* comment button */}
                                        <button onClick={() => inputRef.current.focus()} className="reactBtn">
                                            <TbMessageCircle2 className="reactBtnIcon"/>
                                        </button>
                                        {/* share button */}
                                        <button className="reactBtn">
                                            <FiSend className="w-7 h-7 rotate-[18deg]"/>
                                        </button>
                                    </div>
                                    {/* save button */}
                                    <button onClick={savePost} className="reactBtn">
                                        {
                                            hasSaved ? (
                                                <RiBookmark3Fill className="reactBtnIcon text-instaBlue"/>
                                            ):(
                                                <RiBookmark3Line className="reactBtnIcon"/>
                                            )
                                        }              
                                    </button>
                                </div>
                                {/* end of buttons */}
                                {
                                    likes.length > 0 && (
                                        <div className="mb-1">
                                            <span className="font-bold text-[14px]">
                                                {`${likes.length} ${likes.length === 1 ? 'like':'likes'}`} 
                                            </span>
                                        </div>
                                    )
                                }
                                <Moment fromNow className="text-xs tracking-wider text-gray-400 uppercase">
                                    {post?.data()?.timeStamp.toDate()}
                                </Moment>
                            </div>
                            {/* comment input */}
                            <form className="flex items-center border-t py-3 px-5" onSubmit={(e) => postComment(e)}>
                                <button type='button' onClick={() => setShowPicker(true)}>
                                    <BsEmojiSmile className="w-6 h-6"/>
                                </button>
                                <input 
                                    className="flex-1 text-[100%] focus:ring-0 border-none outline-none 
                                        placeholder:font-[600] placeholder:text-gray-400" 
                                    type="text" 
                                    ref={inputRef}
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
                </div>
            </div>
        </div>
    )
}

export default DetailedPost