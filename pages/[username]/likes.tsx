// profile feed component
import Link from "next/link"
import { ReactElement, useEffect, useState } from "react"
import ProfileLayout from "../../components/ProfileLayout"
import type { NextPageWithLayout } from '../_app'
import { BsHeartFill } from 'react-icons/bs'
import { AiTwotoneMessage } from 'react-icons/ai'
import { useRecoilState } from "recoil"
import { useSession } from 'next-auth/react'
import { useContextualRouting } from 'next-use-contextual-routing'
import isMobile from "../../utils/useMediaQuery"
import { CurrentSession } from "../../utils/types"
import { useRouter } from "next/router"
import { collection, DocumentData, onSnapshot, query, QueryDocumentSnapshot, where } from "firebase/firestore"
import { db } from "../../firebase"
import ContentLoader from "../../contentLoaders/ContentLoader"

const Likes: NextPageWithLayout = () => {
    const [loading, setLoading] = useState(false)
    const [likedPosts, setLikedPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
    const [curProfile, setCurProfile] = useState<DocumentData>()
    const session = useSession().data as CurrentSession
    const { makeContextualHref, returnHref } = useContextualRouting()
    const isMb = isMobile()
    const router = useRouter()
    const username = router.query.username

    // get and set current user profile
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'users'), where('username', '==', username)), snapshot => {
            setCurProfile(snapshot.docs[0])
        })
        return unsubscribe
    },[username])

    // get posts that the current profile liked
    useEffect(() => {
        if(curProfile) {
            setLoading(true)
            const unsubscribe = onSnapshot(query(collection(db, 'posts'), where('likes', 'array-contains', curProfile?.id)), snapshot => {
                setLikedPosts(snapshot.docs)
                setLoading(false)
            })
            return unsubscribe
        }
    },[curProfile])

    if(loading || !curProfile) return (
        <div className='flex items-center justify-center h-[300px]'>
            <ContentLoader/>
        </div>
    )
    return (
        <div className="profileContentWrapper">
            {
                likedPosts.length > 0 ? (
                    <>
                        {
                            curProfile.id === session.user.id ? (
                                <p className="text-center text-gray-500 text-lg font-bold mb-8">Posts you have liked</p>
                            ):(
                                <p className="text-center text-gray-500 text-lg font-bold mb-8">Posts liked by 
                                    <span className="text-black font-bold ml-1">{curProfile.data().username}</span>
                                </p>
                            )
                        }
                        <div className="profileContentContainer">
                            {
                                likedPosts.map(post => (
                                    <div className="relative aspect-square mb-4" key={post.id}>
                                        <div className="h-full w-full p-2">
                                            <Link href={
                                                isMb ?
                                                    `/post/${post.id}`
                                                    :
                                                    makeContextualHref({
                                                        routeModalId: 'post',
                                                        currentPageURL: returnHref,
                                                        postId: post.id
                                                    })
                                                }
                                                as={isMb ? undefined : `/post/${post.id}`} 
                                                className="group relative rounded-lg h-full w-full block overflow-hidden">
                                                <img src={post.data().postImage} alt="post image" className="object-cover h-full w-full 
                                                group-hover:scale-125 transition-all duration-300 ease-in-out"/>
                                                <div className="hidden group-hover:flex absolute inset-0 justify-center 
                                                    items-center bg-black/30 text-white font-bold">
                                                    <span className="flex items-center text-xl mr-3"><BsHeartFill size={18} className="mr-1"/>
                                                        {post.data().likes.length}
                                                    </span>
                                                    <span className="flex items-center text-xl ml-3">
                                                        <>
                                                            <AiTwotoneMessage size={20} className="mr-1"/>
                                                            {post.data().commentCount}
                                                        </>
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                ):(
                    curProfile.id === session.user.id ? (
                        <p className="text-center text-gray-400">You don't have any liked post</p>
                    ):(
                        <p className="text-center text-gray-400">This user doesn't have any liked post</p>
                    )
                )
            }
        </div>
    )
}

Likes.getLayout = function getLayout(page: ReactElement) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}

export default Likes