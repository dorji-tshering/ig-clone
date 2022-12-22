import { useSession, signOut } from 'next-auth/react'
import classNames from 'classnames'
import Link from 'next/link'
import { BiGridAlt, BiHeart } from 'react-icons/bi'
import { HiOutlineBookmark } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { profileImageUploadState } from '../atoms/profileImageUploadAtom'
import { useContextualRouting } from 'next-use-contextual-routing'
import { useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, collection, doc, DocumentData, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import { CurrentSession } from '../utils/types' 

type Props = { 
    children: React.ReactElement
}

const ProfileLayout = ({ children }: Props) => {
    const session = useSession().data as CurrentSession
    const [curProfile, setCurProfile] = useState<DocumentData>()
    const [follows, setFollows] = useState(false)
    const [totalPosts, setTotalPosts] = useState(0)
    const openProfileUploadModal = useSetRecoilState(profileImageUploadState)
    const { makeContextualHref, returnHref } = useContextualRouting()
    const profileImage = true
    const router = useRouter()

    const username = router.query.username as string

    // get the user data of current profile
    useEffect(() => 
        onSnapshot(query(collection(db, 'users'), where('username', '==', username)), snapshot => {
            setCurProfile(snapshot.docs[0])
            setFollows(snapshot.docs[0].data().followers.includes(session.user.id))
        }),
    [username])

    // get total posts of current profile
    useEffect(() => 
        onSnapshot(query(collection(db, 'posts'), where('username', '==', username)), snapshot => {
            setTotalPosts(snapshot.docs.length)
        }),
    [username])

    // follow user
    const follow = async () => {
        if(follows) {
            await updateDoc(doc(db, 'users', session.user.id), {
                following: arrayRemove(curProfile?.id)
            })
            await updateDoc(doc(db, 'users', curProfile?.id), {
                followers: arrayRemove(session.user.id)
            })            
        }else {
            await updateDoc(doc(db, 'users', session.user.id), {
                following: arrayUnion(curProfile?.id)
            })
            await updateDoc(doc(db, 'users', curProfile?.id), {
                followers: arrayUnion(session.user.id)
            })   
        }
    }

    // profile image upload for the logged in user
    const uploadProfileImage = async () => {
        if(profileImage) {
            openProfileUploadModal(true);
        } else {
            // upload image code
        }
    }
    

    if(!curProfile) return <></>

    return (
        <div className="pageContent">
            <div className="sm:pt-5">
                {/* profile meta-data */}
                <section className="flex px-5 pb-5 sm:p-0 justify-between sm:justify-center">
                    <div className="mr-5 sm:mr-10">
                        <div className="flex justify-center items-center flex-col sm:h-full">
                            {
                                curProfile.id === session.user.id ? (
                                    <div className="w-[80px] sm:w-[150px] pt-[100%] relative">
                                        <button className="rounded-full overflow-hidden h-full absolute inset-0" 
                                            onClick={uploadProfileImage}>
                                            <img 
                                                className="w-full h-full object-cover 
                                                    rounded-full p-1 border border-solid border-gray-300
                                                    cursor-pointer" 
                                                src={curProfile.data().image} alt="avatar"
                                            />
                                        </button>
                                    </div>
                                ):(
                                    <div className="w-[80px] sm:w-[150px] pt-[100%] relative">
                                        <img 
                                            className="w-full h-full object-cover
                                                rounded-full p-1 border border-solid border-gray-300 
                                                absolute inset-0"
                                            src={curProfile.data().image} alt="avatar"
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="sm:ml-10 grow sm:grow-0 flex flex-col justify-between sm:py-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center">
                            <h1 className="text-2xl sm:text-3xl mb-3 sm:mb-0 sm:mr-6">{curProfile.data().username}</h1>
                            {
                                curProfile.id === session.user.id ? (
                                    <div className="flex flex-col xs:flex-row">
                                        <Link 
                                            className="text-center py-1 px-3 font-[600] border border-solid 
                                            border-gray-200 rounded-md mr-8" 
                                            href="/account/edit" >Edit profile
                                        </Link>
                                        <button 
                                            onClick={async () =>  {
                                                // redirect without reloading the page
                                                const data = await signOut({redirect: false, callbackUrl: '/auth/signin'})
                                                router.push(data.url)
                                            }}
                                            className="font-bold text-instaBlue mt-3 xs:mt-0 w-fit">Logout</button>
                                    </div>   
                                ):(
                                    <div>
                                        <button 
                                            onClick={follow}
                                            className={`py-1 px-4 font-[600] ${follows ? '':'bg-instaBlue text-white border-instaBlue'} 
                                            rounded-md border mr-2`}>
                                            {follows ? 'Following':'Follow'}
                                        </button>
                                        <button className="py-1 px-4 font-[600] border border-solid border-gray-200 rounded-md">Message</button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="hidden sm:flex">
                            <div className="mr-10"><span className="font-bold mr-1">{totalPosts}</span> posts</div>
                            <Link 
                                className="mr-10" 
                                href={makeContextualHref({
                                    routeModalId: 'followers',
                                    currentPageURL: returnHref,
                                    userId: curProfile.id,
                                })}
                                as={`/${curProfile.data().username}/followers`}
                                scroll={false}>
                                    <span className="font-bold mr-1">{curProfile?.data().followers.length}</span> 
                                    {curProfile?.data().followers.length <= 1 ? 'follower':'followers'}
                            </Link>
                            <Link
                                className="mr-10" 
                                href={makeContextualHref({
                                    routeModalId: 'following',
                                    currentPageURL: returnHref,
                                    userId: curProfile.id,
                                })}
                                as={`/${curProfile.data().username}/following`}
                                scroll={false}>
                                    <span className="font-bold mr-1">{curProfile.data().following.length}</span> following
                            </Link>
                        </div>
                        <div className="hidden sm:block">
                            <p className="font-bold text-xl mb-1">{curProfile.data().name}</p>
                            <p>{curProfile.data().bio}</p>
                        </div>
                    </div>
                </section>
                {/* mobile markup */}
                <div className="sm:hidden my-5 px-4">
                        <p className="font-bold text-lg mb-1">{curProfile.data().name}</p>
                        <p>{curProfile.data().bio}</p>
                </div>
                <section className="sm:hidden border border-solid border-gray-300 border-r-0 border-l-0 py-4">
                    <div className="flex text-center">
                        <div className="w-[33.3%]"><span className="font-bold sm:mr-1 block">{totalPosts}</span><span className="text-gray-400">posts</span></div>
                        <Link 
                            className="w-[33.3%]" 
                            href={makeContextualHref({
                                routeModalId: 'followers',
                                currentPageURL: returnHref,
                                userId: curProfile.id
                            })}
                            as={`/${curProfile.data().username}/followers`}
                            scroll={false}>
                                <span className="font-bold sm:mr-1 block">{curProfile.data().followers.length}</span>
                                <span className="text-gray-400">
                                    {curProfile?.data().followers.length <= 1 ? 'follower':'followers'}
                                </span></Link>
                        <Link 
                            className="w-[33.3%]" 
                            href={makeContextualHref({
                                routeModalId: 'following',
                                currentPageURL: returnHref,
                                userId: curProfile.id
                            })}
                            as={`/${curProfile.data().username}/following`}
                            scroll={false}>
                                <span className="font-bold sm:mr-1 block">{curProfile.data().following.length}</span> <span className="text-gray-400">following</span></Link>
                    </div>
                </section>
                {/* link tabs */}
                <section className="mt-16 flex justify-center border-t border-solid border-t-gray-200">
                    <Link href={`/${curProfile.data().username}`} className={classNames(
                        'profileTabLink', router.asPath === `/${curProfile.data().username}` ? 
                        'border-t-black' : 'border-t-transparent text-gray-400'
                    )}>
                        <BiGridAlt className="mr-2 h-8 w-8 sm:h-4 sm:w-4"/> <span className="hidden sm:block">POSTS</span>
                    </Link>
                    <Link href={`/${curProfile.data().username}/likes`} className={classNames(
                        'profileTabLink', router.asPath === `/${curProfile.data().username}/likes` ? 
                        'border-t-black' : 'border-t-transparent text-gray-400'
                    )}>
                        <BiHeart className="mr-2 h-8 w-8 sm:h-[14px] sm:w-[14px]"/> <span className="hidden sm:block">LIKES</span>
                    </Link>
                    {
                        curProfile.id === session.user.id && (
                            <Link href={`/${curProfile.data().username}/saved`} className={classNames(
                                'profileTabLink', router.asPath === `/${curProfile.data().username}/saved` ? 
                                'border-t-black' : 'border-t-transparent text-gray-400'
                            )}>
                                <HiOutlineBookmark className="mr-2 h-8 w-8 sm:h-4 sm:w-4"/> <span className="hidden sm:block">SAVED</span>
                            </Link>
                        ) 
                    }
                </section>

                {/* page content */}
                {children}
            </div>
        </div>
    )
}

export default ProfileLayout