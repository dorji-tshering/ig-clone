import { useSession } from 'next-auth/react';
import classNames from 'classnames';
import Link from 'next/link';
import { BiGridAlt, BiHeart } from 'react-icons/bi';
import { HiOutlineBookmark } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { currentProfileState } from '../atoms/currentProfileAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { profileImageUploadState } from '../atoms/profileImageUploadAtom';
import { useContextualRouting } from 'next-use-contextual-routing';

type Props = {
    children: React.ReactElement;
}

const ProfileLayout = ({ children }: Props) => {
    const {data: session}: any = useSession();
    const router = useRouter();
    const currentUserProfile = useRecoilValue(currentProfileState);
    const openProfileUploadModal = useSetRecoilState(profileImageUploadState);

    const { makeContextualHref, returnHref } = useContextualRouting();

    const profileImage = true;

    // profile image upload for the logged in user
    const uploadProfileImage = async () => {
        if(profileImage) {
            openProfileUploadModal(true);
        } else {
            // upload image code
        }
    }

    return (
        <div className="pageContent">
            <div className="sm:pt-5">
                {/* profile meta-data */}
                <section className="flex px-5 pb-5 sm:p-0 justify-between sm:justify-center">
                    <div className="mr-5 sm:mr-10">
                        <div className="flex justify-center items-center flex-col sm:h-full">
                            {
                                currentUserProfile ? (
                                    <div className="w-[80px] sm:w-[150px] pt-[100%] relative">
                                        <button className="rounded-full overflow-hidden h-full absolute inset-0" 
                                            onClick={uploadProfileImage}>
                                            <img 
                                                className="w-full h-full object-cover 
                                                    rounded-full p-1 border border-solid border-gray-300
                                                    cursor-pointer" 
                                                src={`/images/hori.jpeg`} alt="avatar"
                                            />
                                        </button>
                                    </div>
                                ):(
                                    <div className="w-[80px] sm:w-[150px] pt-[100%] relative">
                                        <img 
                                            className="w-full h-full object-cover
                                                rounded-full p-1 border border-solid border-gray-300 
                                                absolute inset-0"
                                            src={`/images/verti.jpeg`} alt="avatar"
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="sm:ml-10 grow sm:grow-0 flex flex-col justify-between sm:py-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center">
                            <h1 className="text-2xl sm:text-3xl mb-3 sm:mb-0 sm:mr-6">{session?.user?.username}</h1>
                            {
                                currentUserProfile ? (
                                    <div className="flex flex-col xs:flex-row">
                                        <Link 
                                            className="text-lg text-center py-1 px-3 font-[600] border border-solid 
                                            border-gray-200 rounded-md mr-8" 
                                            href="/account/edit" >Edit profile
                                        </Link>
                                        <button 
                                            onClick={() => 'logout'}
                                            className="font-bold text-instaBlue mt-3 xs:mt-0 w-fit">Logout</button>
                                    </div>   
                                ):(
                                    <div>
                                        <button className="py-1 px-4 font-[600] bg-instaBlue text-white rounded-md
                                            border border-solid border-instaBlue mr-2">Follow</button>
                                        <button className="py-1 px-4 font-[600] border border-solid border-gray-200 rounded-md">Message</button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="hidden sm:flex">
                            <div className="mr-10"><span className="font-bold mr-1">0</span> posts</div>
                            <Link 
                                className="mr-10" 
                                href={makeContextualHref({
                                    routeModalId: 'followers',
                                    currentPageURL: returnHref,
                                    userID: 'userId',
                                })}
                                as={`/${encodeURIComponent(session?.user?.username)}/followers`}
                                scroll={false}>
                                    <span className="font-bold mr-1">200</span> followers
                            </Link>
                            <Link
                                className="mr-10" 
                                href={makeContextualHref({
                                    routeModalId: 'following',
                                    currentPageURL: returnHref,
                                    userID: 'userId',
                                })}
                                as={`/${encodeURIComponent(session?.user?.username)}/following`}
                                scroll={false}>
                                    <span className="font-bold mr-1">10</span> following
                            </Link>
                        </div>
                        <div className="hidden sm:block">
                            <p className="font-bold text-xl mb-1">{session?.user?.name}</p>
                            <p>Currently working in Bhutan. Love Music and Movies.</p>
                        </div>
                    </div>
                </section>
                {/* mobile markup */}
                <div className="sm:hidden my-5 px-4">
                        <p className="font-bold text-lg mb-1">{session?.user?.name}</p>
                        <p>Currently working in Bhutan. Love Music and Movies.</p>
                </div>
                <section className="sm:hidden border border-solid border-gray-300 border-r-0 border-l-0 py-4">
                    <div className="flex text-center">
                        <div className="w-[33.3%]"><span className="font-bold sm:mr-1 block">0</span><span className="text-gray-400">posts</span></div>
                        <Link 
                            className="w-[33.3%]" 
                            href={makeContextualHref({
                                routeModalId: 'followers',
                                currentPageURL: returnHref
                            })}
                            as={`/${encodeURIComponent(session?.user?.username)}/followers`}
                            scroll={false}>
                                <span className="font-bold sm:mr-1 block">200</span><span className="text-gray-400">followers</span></Link>
                        <Link 
                            className="w-[33.3%]" 
                            href={makeContextualHref({
                                routeModalId: 'following',
                                currentPageURL: returnHref
                            })}
                            as={`/${session?.user?.username}/following`}
                            scroll={false}>
                                <span className="font-bold sm:mr-1 block">10</span> <span className="text-gray-400">following</span></Link>
                    </div>
                </section>
                {/* link tabs */}
                <section className="mt-16 flex justify-center border-t border-solid border-t-gray-200">
                    <Link href={`/${session?.user?.username}`} className={classNames(
                        'profileTabLink', router.asPath === `/${session?.user?.username}` ? 
                        'border-t-black' : 'border-t-transparent text-gray-400'
                    )}>
                        <BiGridAlt className="mr-2 h-8 w-8 sm:h-4 sm:w-4"/> <span className="hidden sm:block">POSTS</span>
                    </Link>
                    <Link href={`/${session?.user?.username}/likes`} className={classNames(
                        'profileTabLink', router.asPath === `/${session?.user?.username}/likes` ? 
                        'border-t-black' : 'border-t-transparent text-gray-400'
                    )}>
                        <BiHeart className="mr-2 h-8 w-8 sm:h-[14px] sm:w-[14px]"/> <span className="hidden sm:block">LIKES</span>
                    </Link>
                    {
                        currentUserProfile && (
                            <Link href={`/${session?.user?.username}/saved`} className={classNames(
                                'profileTabLink', router.asPath === `/${session?.user?.username}/saved` ? 
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