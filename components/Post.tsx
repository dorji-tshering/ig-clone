import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, 
        query, orderBy, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from "../firebase";
import Moment from 'react-moment';

interface PostData {
    id: string,
    username: string, 
    avatar: string, 
    image: string,
    caption: string,
}

const Post = ({ id, username, avatar, image, caption }: PostData) => {
    const {data: session}: any = useSession();
    const [comment, setComment] = useState<string>();
    const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    useEffect(() => onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timeStamp', 'desc')), 
        snapShot => setComments(snapShot.docs)
    ), [db]);

    const postComment = async(e: FormEvent) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timeStamp: serverTimestamp()
        });
    }

    return (
        <div className="bg-white my-7 border rounded-sm">
            {/* Header */}
            <div className="flex items-center p-5">
                <img 
                    className="rounded-full h-12 w-12 object-contain p-1 mr-3 border" 
                    src={avatar} 
                    alt="user-avatar" />
                <p className="flex-1 font-bold">{ username }</p>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </span>
            </div>

            {/* Post image */}
            <img 
                className="object-cover w-full"
                src={image} 
                alt="post-image" />
            {/* Buttons */}
            { session && 
                <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    <span className="reactBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </span>
                    <span className="reactBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                    </span>
                    <span className="reactBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </span>
                </div>
                <span className="reactBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>                   
                </span>
                </div>
            }
            {/* Caption */}
            <div>
                <p className="p-5 truncate">
                    <span className="font-bold mr-1">{username}</span>
                    {caption}
                </p>
            </div>
            {/* Comments */}
            {comments.length > 0 && 
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    { comments.map((comment => (
                        <div className="flex items-center space-x-2 mb-3" key={comment.id}>
                            <img className="h-7 rounded-full" src={comment.data().userImage} alt="" />
                            <p className="text-sm flex-1">
                                <span className="font-bold">{comment.data().username + ' '}</span>
                                {comment.data().comment}
                            </p>
                            <Moment fromNow className="pr-5 text-xs">
                                {comment.data().timeStamp?.toDate()}
                            </Moment>
                        </div>
                    ))) }
                </div> 
            }
            {/* Input box */}
            { session && 
                <form className="flex items-center p-4" onSubmit={(e) => postComment(e)}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>
                    </span>
                    <input 
                        className="flex-1 focus:ring-0 border-none outline-none" 
                        type="text" 
                        name="comment" 
                        placeholder="Add a comment..."
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                    <button 
                        disabled={!comment?.trim()}
                        className="font-semibold text-blue-400" 
                        type="submit">Post</button>
                </form>
            }
        </div>
    )
}

export default Post;