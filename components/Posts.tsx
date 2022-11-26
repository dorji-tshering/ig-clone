import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    useEffect(
        () => 
            onSnapshot(query(collection(db, 'posts'), orderBy('timeStamp', 'desc')), 
            snapshot => {
                setPosts(snapshot.docs);
            }),
        [db]
    );

    return (
        <div>
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