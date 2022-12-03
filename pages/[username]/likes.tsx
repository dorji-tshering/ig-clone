// profile feed component
import Link from "next/link";
import { ReactElement, useState } from "react"
import ProfileLayout from "../../components/ProfileLayout"
import type { NextPageWithLayout } from '../_app';
import { BsHeartFill } from 'react-icons/bs';
import { AiTwotoneMessage } from 'react-icons/ai';
import { currentProfileState } from '../../atoms/currentProfileAtom';
import { useRecoilState } from "recoil";
import { useSession } from 'next-auth/react';
import { useContextualRouting } from 'next-use-contextual-routing';

const Likes: NextPageWithLayout = () => {
    const [currentUserProfile ,setCurrentProfileState] = useRecoilState(currentProfileState);
    const [likedPosts, setLikedPosts] = useState(true);
    const {data: session}: any = useSession();
    const { makeContextualHref, returnHref } = useContextualRouting();

    // set currentProfileState here
    //setCurrentProfileState(true);

    return (
        <div className="my-12">
            {
                likedPosts ? (
                    <>
                        {
                            currentUserProfile ? (
                                <p className="text-center text-gray-400 mb-8">Posts you have liked</p>
                            ):(
                                <p className="text-center text-gray-400 mb-8">Posts liked by 
                                    <span className="text-black font-bold ml-1">{session?.user?.username}</span>
                                </p>
                            )
                        }
                        <div className="profileContentContainer">
                        <div className="relative pt-[100%]">
                            <div className="absolute inset-0">
                                <Link 
                                    href={makeContextualHref({
                                        routeModalId: 'post',
                                        currentPageURL: returnHref
                                    })}
                                    as={`/post/postID`}
                                    className="group">
                                    <img src="/images/dorji.jpg" alt="" className="object-cover"/>
                                    <div className="hidden group-hover:flex absolute inset-0 justify-center 
                                        items-center bg-black/30 text-white font-bold">
                                        <span className="flex items-center text-xl mr-3"><BsHeartFill size={18} className="mr-1"/>120K</span>
                                        <span className="flex items-center text-xl ml-3"><AiTwotoneMessage size={20} className="mr-1"/>300</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="relative pt-[100%]">
                            <div className="absolute inset-0">
                                <Link href={``} className="group">
                                    <img src="/images/dorji.jpg" alt="" className="object-cover"/>
                                    <div className="hidden group-hover:flex absolute inset-0 justify-center 
                                        items-center bg-black/30 text-white font-bold">
                                        <span className="flex items-center text-xl mr-3"><BsHeartFill size={18} className="mr-1"/>120K</span>
                                        <span className="flex items-center text-xl ml-3"><AiTwotoneMessage size={20} className="mr-1"/>300</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="relative pt-[100%]">
                            <div className="absolute inset-0">
                                <Link href={``} className="group">
                                    <img src="/images/dorji.jpg" alt="" className="object-cover"/>
                                    <div className="hidden group-hover:flex absolute inset-0 justify-center 
                                        items-center bg-black/30 text-white font-bold">
                                        <span className="flex items-center text-xl mr-3"><BsHeartFill size={18} className="mr-1"/>120K</span>
                                        <span className="flex items-center text-xl ml-3"><AiTwotoneMessage size={20} className="mr-1"/>300</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="relative pt-[100%]">
                            <div className="absolute inset-0">
                                <Link href={``} className="group">
                                    <img src="/images/dorji.jpg" alt="" className="object-cover"/>
                                    <div className="hidden group-hover:flex absolute inset-0 justify-center 
                                        items-center bg-black/30 text-white font-bold">
                                        <span className="flex items-center text-xl mr-3"><BsHeartFill size={18} className="mr-1"/>120K</span>
                                        <span className="flex items-center text-xl ml-3"><AiTwotoneMessage size={20} className="mr-1"/>300</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        </div>
                    </>
                ):(
                    currentUserProfile ? (
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