import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import PostComment from '../../../components/PostComment';

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

const Comments = () => {
    const [comment, setComment] = useState<string | undefined>();
    const router = useRouter();

    const postComment = async (e: FormEvent) => {
        // post comment code
    }

    return (
        <div className="pb-16 relative md:max-w-[500px] md:mx-auto">
            <div className="md:border-x md:border-b md:rounded md">
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
                        <img src="/images/dorji.jpg" className="h-9 w-9 object-cover rounded-full" alt="current user image" />
                    </span>
                    <form className="border rounded-full flex grow items-center py-3 px-5 bg-white" onSubmit={(e) => postComment(e)}>
                            <input 
                                className="text-[100%] p-0 mr-3 grow focus:ring-0 border-none outline-none
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
                {/* caption */}
                <section className="px-4 py-6">
                    <div className="flex border-b pb-6">
                        <div className="mr-5">
                            <Link href="/username" className="rounded-full">
                                <img src="/images/dorji.jpg" alt="" className="object-cover rounded-full w-9 h-9" />
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
                </section>
                {/* comments */}
                <section className="px-5 py-2">
                    <PostComment comments={comments}/>
                </section>
            </div>
        </div>
    )
}

export default Comments