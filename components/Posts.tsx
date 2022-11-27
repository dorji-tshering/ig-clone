import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Post from './Post';
import { useSession } from 'next-auth/react';

const Posts = () => {
    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const {data: session} = useSession();

    useEffect(
        () => 
            onSnapshot(query(collection(db, 'posts'), orderBy('timeStamp', 'desc')), 
            snapshot => {
                setPosts(snapshot.docs);
            }),
        [db]
    );

    return (
        <div className={`max-w-md md:max-w-lg mx-auto ${session ? 'lg:max-w-none' : 'lg:max-w-2xl'}`}>
            {
                posts.map((post) => (
                    <Post 
                        key={post.id} 
                        id={post.id} 
                        username={post.data().username} 
                        avatar={post.data().profileImg}
                        image={post.data().image}
                        caption={post.data().caption}
                        timeStamp={post.data().timeStamp} />
                ))
            }
        </div>
    )
}

export default Posts;