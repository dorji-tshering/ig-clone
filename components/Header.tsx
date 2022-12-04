import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { uploadModalState } from '../atoms/uploadModalAtom';
import { Tooltip } from 'flowbite-react';
import { FaHome } from 'react-icons/fa';
import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { TbSearch } from 'react-icons/tb';

const Header = () => {
    const {data: session}: any = useSession();
    const router = useRouter();     
    const openUploadModal = useSetRecoilState(uploadModalState);

    return (
       <div className="shadow-sm border-b bg-white sticky top-0 z-50 h-[54px]">
             <div className="flex justify-between h-full mx-6 md:max-w-4xl lg:max-w-6xl md:mx-auto">
                {/* Header left */}
                <div className="relative w-[100px] cursor-pointer" onClick={() => router.push('/')}>
                    <Image 
                        src="/images/instagram-logo.png"
                        alt="instagram-logo"
                        fill
                        priority
                        className="object-contain"
                        sizes="150px"
                    />
                </div>
                {/* Header middle */}
                <div className="relative hidden self-center md:block h-[35px] rounded-md max-w-xs">
                    <div className="absolute inset-y-0 flex pl-3 items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="w-5 h-5 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <input className="bg-gray-50 block h-full w-full pl-10 text-sm rounded-md border-gray-300 focus:ring-black focus:border-black" 
                        type="text" placeholder="Search" />
                </div>

                {/* Header right */}
                <div className="flex items-center justify-end space-x-4">
                    {/* home icon */}
                    <div className="dNavWrapper">
                        <Tooltip className="mt-[2px]" style="light" content="Home" placement="bottom" animation="duration-1000">
                            <span className="dNavBtn group" onClick={() => router.push('/')}>
                                <FaHome className="w-6 h-6 dNavIcon"/>
                            </span>
                        </Tooltip>
                    </div>
                    { session ? 
                        <>
                            {/* mobile search icon */}
                            <span className="md:hidden">
                                <TbSearch className="w-8 h-8"/>
                            </span>
                            {/* mobile notification icon */}
                            <span className="md:hidden">
                                <IoMdNotificationsOutline className="w-9 h-9"/>
                            </span>
                            {/* message icon */}
                            <div className="dNavWrapper">
                                <Tooltip className="mt-[2px]" style="light" content="Messages" placement="bottom" animation="duration-1000">
                                    <span className="relative dNavBtn group" onClick={() => router.push('/direct/inbox')}>
                                        <span className="absolute top-0 right-1 text-xs w-5 h-5 rounded-full bg-red-500
                                            flex items-center justify-center text-white z-10 animate-pulse">
                                            3
                                        </span>
                                        <BiMessageRounded className="w-6 h-6 dNavIcon"/>
                                    </span>
                                </Tooltip>
                            </div>
                            {/* create icon */}
                            <div className="dNavWrapper">
                                <Tooltip className="mt-[2px]" style="light" content="Create" placement="bottom" animation="duration-1000">
                                    <span className="dNavBtn group" onClick={() => openUploadModal(true)}>
                                        <AiOutlinePlusCircle className="w-[18px] h-[18px] dNavIcon"/>
                                    </span>
                                </Tooltip>
                            </div>
                            {/* explore icon */}
                            <div className="dNavWrapper">
                                <Tooltip className="mt-[2px]" style="light" content="Explore" placement="bottom" animation="duration-1000">
                                    <span className="dNavBtn group">
                                        <BsPeople className="w-[20px] h-[20px] dNavIcon"/>
                                    </span>
                                </Tooltip>
                            </div>
                            {/* notification icon */}
                            <div className="dNavWrapper">
                                <Tooltip className="mt-[2px]" style="light" content="Notification" placement="bottom" animation="duration-1000">
                                    <span className="dNavBtn -mr-3 md:mr-0 group">
                                        <IoMdNotificationsOutline className="w-6 h-6 dNavIcon"/>
                                    </span>
                                </Tooltip>
                            </div>
                            {/* profile link */}
                            <div className="dNavWrapper">
                                <Tooltip className="mt-[-1.5px]" style="light" content={`Profile: ${session?.user?.username}`} placement="bottom" animation="duration-1000">
                                    <span onClick={() => router.push(`/${session?.user?.username}`)} 
                                        className="h-12 w-12 flex items-center justify-center cursor-pointer
                                        bg-transparent ml-0 hover:bg-gray-100 rounded-full group">
                                        <img 
                                            src={session?.user?.image as string} 
                                            alt="avatar" 
                                            className="h-10 rounded-full cursor-pointer group-hover:w-[35px] group-hover:h-[35px] relative
                                            transition-all duration-75 ease-in-out" />
                                    </span>
                                </Tooltip>
                            </div>
                        </> : <button type="button" className="font-bold" onClick={() => signIn()}>Signin</button> }        
                </div>
            </div>
       </div>
    )
}

export default Header;