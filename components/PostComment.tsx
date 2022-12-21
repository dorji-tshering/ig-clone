// recursive post component
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { Comment } from '../utils/types'
import Moment from 'react-moment';

const PostComment = ({comments}: {comments: Comment[]}) => {

    const reply = (ref: string) => {
        // reply code here
    }

    return (
        <>
            {
                comments.map((comment, idx) => (
                    <div key={idx}>
                        <div className="flex mb-7">
                            <div className="mr-5">
                                <Link href={`/${comment.username}`} className="rounded-full">
                                    <img src={comment.userImage} alt="commenter image" className="w-10 h-10  object-cover rounded-full" />
                                </Link>
                            </div>
                            <div className="flex-1">
                                <p>
                                    <Link href={`/${comment.username}`} className="font-bold mr-3">{comment.username}</Link>
                                    <span>{comment.text}</span>
                                </p>
                                <div className="flex text-gray-400 text-sm mt-2">
                                    <Moment fromNow className="mr-4">{comment.timeStamp?.toDate()}</Moment>
                                    <span className="mr-4 font-bold">{comment.likes.length} likes</span>
                                    <button onClick={() => reply('ref')} className="font-bold">Reply</button>
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