// profile saved component
import Link from "next/link";
import { ReactElement, useState } from "react";
import ProfileLayout from "../../components/ProfileLayout";
import type { NextPageWithLayout } from '../_app';
import { BsHeartFill } from 'react-icons/bs';
import { AiTwotoneMessage } from 'react-icons/ai';
import { currentProfileState } from '../../atoms/currentProfileAtom';
import { useRecoilState } from "recoil";
import { useRouter } from 'next/router';
import isMobile from "../../utils/useMediaQuery";
import { useContextualRouting } from 'next-use-contextual-routing';

const Saved: NextPageWithLayout = () => {
    const [currentUserProfile ,setCurrentProfileState] = useRecoilState(currentProfileState);
    const [savedPosts, setSavedPosts] = useState(true);
    const isMb = isMobile();
    const { makeContextualHref, returnHref } = useContextualRouting();

    // set currentProfileState here
    //setCurrentProfileState(true);

    return (
        <div className="my-12">
            {
                currentUserProfile ? (
                    savedPosts ? (
                        <>
                            <p className="text-center text-gray-400 mb-8">Only you can see your saved posts</p>
                            <div className="profileContentContainer">
                            <div className="relative pt-[100%]">
                                <div className="absolute inset-0">
                                    <Link href={
                                            isMb ?
                                            '/post/postId'
                                            :
                                            makeContextualHref({
                                                routeModalId: 'post',
                                                currentPageURL: returnHref
                                            })
                                        }
                                        as={isMb ? undefined : `/post/postID`}  
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
                        <p className="text-center text-gray-400">You don't have any saved posts yet</p>
                    )
                ):(
                    <p className="text-center text-gray-400">You don't have access to this content</p>
                )
            }
        </div>
    )
}

Saved.getLayout = function (page: ReactElement) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}

export default Saved