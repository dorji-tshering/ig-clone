import Head from 'next/head'
import Feed from '../components/Feed'
import { useSession } from 'next-auth/react'
import { db } from '../firebase'
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { CurrentSession } from '../utils/types'
import { generateFromEmail } from '../utils/generateUsername'
import { useEffect, useState } from 'react'
import ContentLoader from '../contentLoaders/ContentLoader'

const Home = () => {
    const session  = useSession().data as CurrentSession
    const status = useSession().status
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const reloadSession = () => {
            const event = new Event("visibilitychange")
            document.dispatchEvent(event)
        }

        const setUsername = async() => {
            setLoading(true)
            let usernameExists = true
            while(usernameExists) {
                const newUsername = generateFromEmail(session.user.email as string)
                const user = await getDocs(query(collection(db, 'users'), where('username', '==', newUsername)))
                if(user.docs[0] === undefined) {
                    const docRef = doc(db, `users/${session.user.id}`)
                    await setDoc(docRef, {
                        username: newUsername,
                        followers: [],
                        following: [],
                        savedPosts: [],
                        bio: ''
                    }, {merge: true})
                    session.user.username = newUsername
                    usernameExists = false
                    reloadSession() // get the updated session session
                    setLoading(false)
                }
            }
        }
    
        //create a unique default username for first time sign in
        if(session && !session.user.username && status === 'authenticated') {
            setUsername()
        }
    }, [session])

    // make sure the username is available before the page is hydrated
    if(loading) return(
        <div className='bg-black/20 fixed inset-0 z-[200] flex items-center justify-center'>
            <ContentLoader/>
        </div>
    )

    return (
        <div className="pageContent">
            <Head>
                <title>InstaClone</title>
                <meta name="description" content="An instagram clone built with Nextjs and Tailwind" />
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <Feed/>
        </div>
    )
}

export default Home;
