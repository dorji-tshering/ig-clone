// default profile posts component
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import type { NextPageWithLayout } from './_app';
import ProfileLayout from '../components/ProfileLayout';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { AiTwotoneMessage, AiOutlinePlus } from 'react-icons/ai';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { uploadModalState } from '../atoms/uploadModalAtom';
import { currentProfileState } from '../atoms/currentProfileAtom';

const Profile: NextPageWithLayout = () => {
    const router = useRouter();
    const {data: session}: any = useSession();
    const [posts, setPosts] = useState(false);

    const openUploadModal = useSetRecoilState(uploadModalState);
    const [currentUserProfile ,setCurrentProfileState] = useRecoilState(currentProfileState);

    // set currentProfileState here
    useEffect(() => {
        setCurrentProfileState(false);
    }, []);

    // useEffect(() => {
    //     const media = window.matchMedia('(max-width: 600px)');

    //     const mediaHandler = (e: MediaQueryListEvent) => {
    //         const mobileView = e.matches;
    //         if (mobileView) {
    //             console.log('mobile view');
    //         } else {
    //             console.log('desktop view');
    //         }
    //     }

    //     media.addEventListener('change', mediaHandler);

    //     return media.removeEventListener('change', mediaHandler);
    // }, []);


    return (
        <div className="mt-12">
            {
                posts ? (
                    <>
                        {
                            currentUserProfile ? (
                                <p className="text-center text-gray-400 mb-8">Your posts</p>
                            ):(
                                <p className="text-center text-gray-400 mb-8">
                                    <span className="font-bold text-black mr-1">{session?.user?.username}</span> posts
                                </p>
                            )
                        }
                        <div className="profileContentContainer">
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
                    // render depends whether the profile belongs to current user or not
                    currentUserProfile ? (
                        <div className="text-center">
                            <p className="text-gray-400 mb-5">You don't have any posts right now</p>
                            <p className="text-xl font-bold mb-16">Start creating one</p>
                            <div className="h-28 w-28 mx-auto relative">
                                <span className="absolute inset-0 animate-ping rounded-full bg-instaBlue opacity-25"/>
                                <button className="absolute inset-0 z-1 flex justify-center items-center
                                    rounded-full bg-instaBlue"
                                    onClick={() => openUploadModal(true)}><AiOutlinePlus size={30} className="text-white"/>
                                </button>
                            </div>
                        </div>
                    ):(
                        <p className="text-gray-400 text-center">This user has no post yet</p>
                    )
                )
            }
        </div>
    )
}

Profile.getLayout = function getLayout(page: ReactElement) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}

export default Profile