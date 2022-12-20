import Head from 'next/head'
import Feed from '../components/Feed'
import { useSession } from 'next-auth/react'
import { db } from '../firebase'
import { doc, setDoc } from "firebase/firestore";
import { CurrentSession } from '../utils/types'

const Home = () => {
    const session  = useSession().data as CurrentSession;
    const status = useSession().status

    // create default username for first time sign in
    if(session && !session.user.username && status === 'authenticated' || !session.user.followers
        || !session.user.following || !session.user.likedPosts || !session.user.savedPosts) {
        const docRef = doc(db, `users/${session.user.id}`)
        setDoc(docRef, {
            username: session.user.name?.split(' ').join('').toLowerCase() as string,
            followers: [],
            following: [],
            likedPosts: [],
            savedPosts: [],
        }, {merge: true})
        session.user.username = session.user.name?.split(' ').join('').toLowerCase() as string
    }

    return (
        <div className="pageContent">
            <Head>
                <title>InstaClone</title>
                <meta name="description" content="Instagram clone homepage" />
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <Feed/>
        </div>
    )
}

export default Home;
