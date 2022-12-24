// user followers page
import Followers from '../../components/Followers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { collection, DocumentData, getDocs, query, QueryDocumentSnapshot, where } from 'firebase/firestore'
import { db } from '../../firebase'


const FollowersPage = () => {
    const router = useRouter()
    const username = router.query.username as string
    const [user, setUser] = useState<QueryDocumentSnapshot<DocumentData>>()

    useEffect(() => {
        getDocs(query(collection(db, 'users'), where('username', '==', username))).then(snapshot => {
            setUser(snapshot.docs[0])
        })
    },[])

    return ( 
        <div className="pb-16 md:mt-5 md:w-fit md:mx-auto">
            <Followers onClose={() => router.back()} userId={user?.id}/>
        </div>
    )
}

export default FollowersPage