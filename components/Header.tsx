import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { uploadModalState } from '../atoms/uploadModalAtom';
import { Tooltip } from 'flowbite-react';

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
                    <div className="dNavWrapper group">
                        <Tooltip className="mt-[2px]" style="light" content="Home" placement="bottom" animation="duration-1000">
                            <span className="dNavBtn" onClick={() => router.push('/')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="w-6 h-6 dNavIcon">
                                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                </svg>
                            </span>
                        </Tooltip>
                    </div>
                    { session ? 
                        <>
                            {/* mobile search icon */}
                            <span className="md:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </span>
                            {/* mobile notification icon */}
                            <span className="md:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </span>

                            <div className="dNavWrapper group">
                                <Tooltip className="mt-[2px]" style="light" content="Messages" placement="bottom" animation="duration-1000">
                                    <span className="relative dNavBtn" onClick={() => router.push('/direct/inbox')}>
                                        <span className="absolute top-0 right-1 text-xs w-5 h-5 rounded-full bg-red-500
                                            flex items-center justify-center text-white z-10 animate-pulse">
                                            3
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dNavIcon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="dNavWrapper group">
                                <Tooltip className="mt-[2px]" style="light" content="Create" placement="bottom" animation="duration-1000">
                                    <span className="dNavBtn" onClick={() => openUploadModal(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 dNavIcon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="dNavWrapper group">
                                <Tooltip className="mt-[2px]" style="light" content="Explore" placement="bottom" animation="duration-1000">
                                    <span className="dNavBtn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 dNavIcon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                        </svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="dNavWrapper group">
                                <Tooltip className="mt-[2px]" style="light" content="Notification" placement="bottom" animation="duration-1000">
                                    <span className="dNavBtn -mr-3 md:mr-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 dNavIcon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className="dNavWrapper group">
                                <Tooltip className="mt-[-1.5px]" style="light" content={`Profile: ${session?.user?.username}`} placement="bottom" animation="duration-1000">
                                    <span onClick={() => router.push(`/${session?.user?.username}`)} className="h-12 w-12 flex items-center justify-center cursor-pointer
                                        bg-transparent ml-0 hover:bg-gray-100 rounded-full">
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