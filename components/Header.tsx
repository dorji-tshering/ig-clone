import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';


const Header = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const openModal = useSetRecoilState(modalState);

    return (
       <div className="shadow-sm border-b bg-white sticky top-0 z-50">
             <div className="flex justify-between max-w-5xl mx-5 lg:mx-auto">
                {/* Header left */}
                <div className="relative hidden lg:inline-grid w-24 cursor-pointer" onClick={() => router.push('/')}>
                    <Image 
                        src="/images/instagram-logo.png"
                        alt="instagram-logo"
                        fill
                        priority
                        className="object-contain"
                        sizes="150px"
                    />
                </div>
                <div className="relative object-contain lg:hidden w-10 flex-shrink-0 cursor-pointer">
                    <Image 
                        src="/images/insta-mobile-logo.png"
                        alt="instagram-logo"
                        fill
                        className="object-contain"
                        sizes="50px"
                        priority
                    />
                </div>

                {/* Header middle */}
                <div className="relative p-3 rounded-md max-w-xs">
                    <div className="absolute inset-y-0 flex pl-3 items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="w-5 h-5 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <input className="bg-gray-50 block w-full pl-10 sm:text-sm rounded-md border-gray-300 focus:ring-black focus:border-black" 
                        type="text" placeholder="Search" />
                </div>

                {/* Header right */}
                <div className="flex items-center justify-end space-x-4">
                    <span className="dNavBtn" onClick={() => router.push('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                            className="">
                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                    </span>
                    <span className="mNavBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="h-7 w-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </span>
                    { session ? 
                        <>
                            <span className="relative dNavBtn">
                                <span className="absolute -top-2 -right-1 text-xs w-5 h-5 rounded-full bg-red-500
                                    flex items-center justify-center text-white z-10 animate-pulse">
                                    3
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                    className="-rotate-45">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </span>
                            <span className="dNavBtn" onClick={() => openModal(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            <span className="dNavBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                            </span>
                            <span className="dNavBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </span>
                            <img src={session?.user?.image as string} alt="avatar" className="h-10 rounded-full cursor-pointer" />
    
                        </> : <button type="button" onClick={() => signIn()}>Signin</button> }        
                </div>
            </div>
       </div>
    )
}

export default Header;