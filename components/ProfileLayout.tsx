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

    const uploadProfileImage = async () => {
        if(profileImage) {
            openProfileUploadModal(true);
        } else {
            // upload image code
        }
    }

    return (
        <div className="md:p-16">
            {/* profile meta-data */}
            <section className="flex p-5 md:p-0 min-h-[80px] sm:h-[150px] justify-between sm:justify-center">
                <div className="mr-5 sm:mr-10">
                    <div className="flex justify-center items-center flex-col sm:h-full">
                        <img 
                            className="h-[70px] w-[70px] min-w-[70px] object-contain sm:h-full sm:w-auto 
                                rounded-full p-1 border border-solid border-gray-300
                                cursor-pointer"
                            onClick={uploadProfileImage} 
                            src={session?.user?.image} alt="avatar" />
                    </div>
                </div>
                <div className="sm:ml-10 grow sm:grow-0 flex flex-col justify-between sm:py-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <h1 className="text-2xl sm:text-3xl mb-3 sm:mb-0 sm:mr-6">{session?.user?.username}</h1>
                        {
                            currentUserProfile ? (
                                <Link 
                                    className="text-lg xs:w-[200px] text-center sm:w-auto py-1 px-3 font-[600] border border-solid border-gray-200 rounded-md" 
                                    href="/account/edit" >Edit profile
                                </Link>
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
                                currentPageURL: returnHref
                            })}
                            as={`/${encodeURIComponent(session?.user?.username)}/followers`}>
                                <span className="font-bold mr-1">200</span> followers
                        </Link>
                        <Link
                            className="mr-10" 
                            href={makeContextualHref({
                                routeModalId: 'following',
                                currentPageURL: returnHref
                            })}
                            as={`/${session?.user?.username}/following`}>
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
                        as={`/${encodeURIComponent(session?.user?.username)}/followers`}>
                            <span className="font-bold sm:mr-1 block">200</span><span className="text-gray-400">followers</span></Link>
                    <Link 
                        className="w-[33.3%]" 
                        href={makeContextualHref({
                            routeModalId: 'following',
                            currentPageURL: returnHref
                        })}
                        as={`/${session?.user?.username}/following`}>
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
    )
}

export default ProfileLayout