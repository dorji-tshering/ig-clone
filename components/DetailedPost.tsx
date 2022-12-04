// a post component to show when user clicks a post comment icon/view comments
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import PostComment from './PostComment';

type Props = {
    onClose?: () => void, 
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

// used by RouteModal and "/post/[postID]"
const DetailedPost = ({onClose, postID, onModal=false}: Props) => {
    const [comment, setComment] = useState<string | undefined>();
    const follows = false;
    const hasLiked = true;

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
        <div className={`flex ${onModal && 'w-[85vw] h-[85vh] xl:w-[] xl:h-[90vh]'} rounded-md overflow-hidden`}>
            {/* left/top section */}
            <div className="bg-black h-full flex items-center">
                <img src="/images/dorji.jpg" alt="" className="h-[90%]"/>
            </div>
            {/* right/bottom section */}
            <div className="bg-white  flex-1 flex flex-col scrollbar-none">
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
                        <button><BiDotsHorizontalRounded size={26}/></button>
                    </div>
                </section>

                {/* middle scrollable comment section */}
                <section className="p-5 text-left overflow-y-auto scrollbar-none">
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
                    <div className="p-5">
                        {/* buttons */}
                        <div className="flex mb-4 justify-between">
                            <div className="flex space-x-4">
                                {/* like button */}
                                {
                                    hasLiked ? (
                                        <span onClick={() => postLike()} className="reactBtn">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF69B4" className="w-6 h-6">
                                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                            </svg>
                                        </span>
                                    ) : (
                                        <span onClick={() => postLike()} className="reactBtn group">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:stroke-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                            </svg>
                                        </span>
                                    )
                                }
                                {/* comment button */}
                                <span 
                                    className="reactBtn group"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:stroke-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                    </svg>
                                </span>
                                {/* share button */}
                                <span className="reactBtn group -rotate-45">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:stroke-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>
                                </span>
                            </div>
                            <span className="reactBtn group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:stroke-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>                   
                            </span>
                        </div>
                        {/* end of buttons */}
                        <div className="text-left mb-2"><span className="font-bold text-[14px]">345,000 likes</span></div>
                        <div className="text-left"><span className="text-xs tracking-wider text-gray-400">2 DAYS AGO</span></div>
                    </div>
                    {/* comment input */}
                    <form className="flex items-center border-t py-3 px-5" onSubmit={(e) => postComment(e)}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                            </svg>
                        </span>
                        <input 
                            className="flex-1 text-[100%] focus:ring-0 border-none outline-none 
                                placeholder:font-[600] placeholder:text-gray-400" 
                            type="text" 
                            name="comment" 
                            placeholder="Add a comment..."
                            id="comment"
                            value={comment as string}
                            autoComplete="off"
                            onChange={(e) => setComment(e.target.value)} />
                        <button 
                            disabled={!comment?.trim()}
                            className="font-semibold text-instaBlue" 
                            type="submit">Post</button>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default DetailedPost