// recursive post component
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';

type Props = {
    data: string;
    likes: number;
    timeStamp: string;
    username: string;
    userImage: string;
    uid: string;
    replies?: {
        data: string;
        likes: number;
        timeStamp: string;
        username: string;
        userImage: string;
        uid: string;
    }[];
}[]

const PostComment = ({comments}: {comments: Props}) => {

    const reply = () => {
        // reply code here
    }

    return (
        <>
            {
                comments.map((comment, idx) => (
                    <div key={idx}>
                        <div className="flex mb-7">
                            <div className="mr-5">
                                <Link href="/username" className="rounded-full">
                                    <img src={comment.userImage} alt="" className="w-10 h-10  object-cover rounded-full" />
                                </Link>
                            </div>
                            <div className="flex-1">
                                <p>
                                    <Link href="/username" className="font-bold mr-3">{comment.username}</Link>
                                    <span>{comment.data}</span>
                                </p>
                                <div className="flex text-gray-400 text-sm mt-2">
                                    <span className="mr-4">{comment.timeStamp}</span>
                                    <span className="mr-4 font-bold">{comment.likes} likes</span>
                                    <button onClick={reply} className="font-bold">Reply</button>
                                </div>
                            </div>
                        </div>
                        {/* use component again if there is at least a reply */}
                        {
                            (comment.replies && comment.replies.length > 0) && (
                                <Disclosure>
                                    {({open})=>(
                                        <div className="pl-16">
                                            <Disclosure.Button className="mb-7 flex items-center">
                                                <span className="h-[1px] w-8 bg-gray-400 mr-8"></span> 
                                                <span className="text-sm font-bold text-gray-400">
                                                    {open ? 'Hide replies' : `View replies (${comment.replies?.length})`}
                                                </span>
                                            </Disclosure.Button>
                                            <Disclosure.Panel>
                                                <PostComment comments={comment.replies!}/>
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                            )
                        }
                    </div>
                ))
            }
        </>
    )
}

export default PostComment