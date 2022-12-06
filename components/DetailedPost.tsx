/**
 * Post component used by post page and routedModal on desktop  
 */ 
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { FormEvent, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { HiOutlineBookmark } from 'react-icons/hi';
import { TbMessageCircle2 } from 'react-icons/tb';
import PostComment from './PostComment';
import { BsEmojiSmile } from 'react-icons/bs';
import { postOptionsModalState } from '../atoms/postOptionsAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { onModalState } from '../atoms/onModalAtom';

type Props = {
    postID: string,
    onModal?: boolean
}

const comments = [
    {
        data: 'Wow you look so so cool YO!',
        likes: 20,
        timeStamp: '3d',
        username: 'dorji_dev',
        userImage: '/images/dorji.jpg',
        uid: '1234',
        replies: [
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            },
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
                replies: [
                    {
                        data: 'Wow you look so so cool YO!',
                        likes: 20,
                        timeStamp: '3d',
                        username: 'dorji_dev',
                        userImage: '/images/dorji.jpg',
                        uid: '1234',
                    },
                ]
            },
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            }
        ]
    },
    {
        data: 'Wow you look so so cool YO!',
        likes: 20,
        timeStamp: '3d',
        username: 'dorji_dev',
        userImage: '/images/dorji.jpg',
        uid: '1234',
        replies: [
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            },
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            },
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            }
        ]
    },
    {
        data: 'Wow you look so so cool YO!',
        likes: 20,
        timeStamp: '3d',
        username: 'dorji_dev',
        userImage: '/images/dorji.jpg',
        uid: '1234',
        replies: [
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            },
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            },
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            }
        ]
    },
    {
        data: 'Wow you look so so cool YO!',
        likes: 20,
        timeStamp: '3d',
        username: 'dorji_dev',
        userImage: '/images/dorji.jpg',
        uid: '1234',
        replies: [
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            },
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            },
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            }
        ]
    },
    {
        data: 'Wow you look so so cool YO!',
        likes: 20,
        timeStamp: '3d',
        username: 'dorji_dev',
        userImage: '/images/dorji.jpg',
        uid: '1234',
        replies: [
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            },
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            },
            {
                data: 'Wow you look so so cool YO!',
                likes: 20,
                timeStamp: '3d',
                username: 'dorji_dev',
                userImage: '/images/dorji.jpg',
                uid: '1234',
            }
        ]
    },
];

/**
 * Single post component for device-width > 768px. Used by `RoutedModal` component and `/post/[postID]` path.
 */
const DetailedPost = ({postID, onModal=false}: Props) => {
    const [comment, setComment] = useState<string>('');
    const openPostIdForOptions = useSetRecoilState(postOptionsModalState);
    const follows = false;
    const hasLiked = true;
    const router = useRouter();

    useEffect(() => {
        onModal && setOnRoutedModal(true)
        return () => {
            if(onModal) setOnRoutedModal(false)
        }
    },[])

    const setOnRoutedModal = useSetRecoilState (onModalState);
 
    const follow = () => {
        // follow other user
    }

    const postLike = async () => {
        // post like code
    }

    const postComment = async (e: FormEvent) => {
        e.preventDefault();
        // post comment code
    }

    return (
        
        <div className="text-center">
            <div className={classNames(
                'rounded-md overflow-hidden inline-block text-left',
                onModal && 'w-auto max-w-[80vw] h-[85vh] xl:h-[90vh]',
                !onModal && 'w-auto max-w-4xl lg:max-w-6xl h-[500px] mx-auto border',
            )}>
                {/* post container */}
                <div className='flex h-full w-full'>
                    {/* left/top section */}
                    <div className="bg-black h-full flex items-center">
                        <img src="/images/hori.jpeg" alt="" className={classNames(
                            'object-contain', onModal ? 'h-[90%]' : 'h-[100%] w-auto',
                        )}/>
                    </div>
                    {/* right/bottom section */}
                    <div className={classNames(
                        'bg-white flex flex-col scrollbar-none w-auto',
                        !onModal && 'max-w-[350px]', onModal && 'max-w-[400px]'
                    )}>
                        {/* top section */}
                        <section className="flex justify-between items-center p-5 border-b">
                            <div className="flex items-center">
                                <Link href="/username" className="mr-6 rounded-full">
                                    <img src="/images/dorji.jpg" alt="" className="h-10 w-10 object-cover rounded-full"/>
                                </Link>
                                <div>
                                    <Link href="/username" className="font-bold">
                                        dorji_dev
                                    </Link>
                                    {
                                        !follows && (
                                            <>
                                                <span className="mx-2 text-gray-400">&bull;</span>
                                                <button className="text-instaBlue font-[600]" onClick={follow}>Follow</button>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => {
                                    openPostIdForOptions(postID)
                                    }}><BiDotsHorizontalRounded size={26}/>
                                </button>
                            </div>
                        </section>

                        {/* middle scrollable comment section */}
                        <section className="p-5 overflow-y-auto scrollbar-none">
                            {/* caption */}
                            <div className="flex mb-7">
                                <div className="mr-5">
                                    <Link href="/username" className="rounded-full">
                                        <img src="/images/dorji.jpg" alt="" className="object-cover rounded-full w-10 h-10" />
                                    </Link>
                                </div>
                                <div className="flex-1">
                                    <p>
                                        <Link href="/username" className="font-bold mr-3">dorji_dev</Link>
                                        <span>A simple, accessible foundation for building custom UIs that show and hide content, like togglable accordion panels.</span>
                                    </p>
                                    <p className="text-gray-400 text-sm mt-2">2d</p>
                                </div>
                            </div>
                            
                            {/* comments */}
                            <PostComment comments={comments}/>
                        </section>

                        {/* bottom action section */}
                        <section className="border-t">
                            <div className="p-4">
                                {/* buttons */}
                                <div className="flex mb-3 justify-between">
                                    <div className="flex space-x-4">
                                        {/* like button */}
                                        {
                                            hasLiked ? (
                                                <span onClick={() => postLike()} className="reactBtn">
                                                    <AiFillHeart className="reactBtnIcon text-[#FF69B4]"/>
                                                </span>
                                            ) : (
                                                <span onClick={() => postLike()} className="reactBtn">
                                                    <AiOutlineHeart className="reactBtnIcon"/>
                                                </span>
                                            )
                                        }
                                        {/* comment button */}
                                        <span className="reactBtn">
                                            <TbMessageCircle2 className="reactBtnIcon"/>
                                        </span>
                                        {/* share button */}
                                        <span className="reactBtn">
                                            <FiSend className="w-7 h-7 rotate-[18deg]"/>
                                        </span>
                                    </div>
                                    {/* save button */}
                                    <span className="reactBtn">
                                        <HiOutlineBookmark className="reactBtnIcon"/>                  
                                    </span>
                                </div>
                                {/* end of buttons */}
                                <div className="mb-1"><span className="font-bold text-[14px]">345,000 likes</span></div>
                                <div><span className="text-xs tracking-wider text-gray-400">2 DAYS AGO</span></div>
                            </div>
                            {/* comment input */}
                            <form className="flex items-center border-t py-3 px-5" onSubmit={(e) => postComment(e)}>
                                <span>
                                    <BsEmojiSmile className="w-6 h-6"/>
                                </span>
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
                </div>
            </div>
        </div>
    )
}

export default DetailedPost