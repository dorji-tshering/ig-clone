// page header component
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { uploadModalState } from '../atoms/uploadModalAtom'
import { Tooltip } from 'flowbite-react'
import { FaHome } from 'react-icons/fa'
import { BiMessageRounded } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { BsPeople } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { TbSearch } from 'react-icons/tb'
import { useState } from 'react'
import InstantSearch from './InstantSearch'
import { useContextualRouting } from 'next-use-contextual-routing'

const Header = () => {
    const {data: session}: any = useSession()
    const [searchText, setSearchText] = useState<string | null>(null)
    const router = useRouter()
    const openUploadModal = useSetRecoilState(uploadModalState)
    const { makeContextualHref, returnHref } = useContextualRouting()

    return (
       <div className="shadow-sm border-b bg-white sticky top-0 z-50 h-[54px]">
             <div className="flex justify-between h-full items-center mx-6 md:max-w-4xl lg:max-w-6xl md:mx-auto">
                {/* Header left */}
                <div className="relative w-[100px] h-full cursor-pointer" onClick={() => router.push('/')}>
                    <Image 
                        src="/images/instagram-logo.png"
                        alt="instagram-logo"
                        fill
                        priority
                        className="object-contain"
                        sizes="150px"
                    />
                </div>
                {/* Header middle/search input */}
                {
                    router.pathname !== '/search' && (
                        <div className="relative hidden md:block h-[35px] min-w-[200px]
                            transition-all ease-in-out duration-100 ml-6 mr-auto 
                            focus-within:flex-1">
                            <div className="focus-within:shadow-searchShadow rounded-md overflow-hidden">
                                <InstantSearch/>
                            </div>
                        </div>
                    )
                }

                {/* Header right */}
                <div className="flex md:ml-5 items-center justify-end space-x-4">
                    {/* home icon */}
                    <div className="dNavWrapper">
                        <Tooltip className="mt-[2px]" style="light" content="Home" placement="bottom" animation="duration-1000">
                            <button className="dNavBtn group" onClick={() => router.push('/')}>
                                <FaHome className="w-6 h-6 dNavIcon"/>
                            </button>
                        </Tooltip>
                    </div>
                    { session ? 
                        <>
                            {/* mobile search icon */}
                            <button onClick={() => router.push('/search')} className="md:hidden">
                                <TbSearch className="w-8 h-8"/>
                            </button>
                            {/* mobile notification icon */}
                            <button onClick={() => router.push('/accounts/activity')} className="md:hidden">
                                <IoMdNotificationsOutline className="w-9 h-9"/>
                            </button>
                            {/* message icon */}
                            <div className="dNavWrapper">
                                <Tooltip className="mt-[2px]" style="light" content="Messages" placement="bottom" animation="duration-1000">
                                    <button className="relative dNavBtn group" onClick={() => router.push('/direct/inbox')}>
                                        <span className="absolute top-0 right-1 text-xs w-5 h-5 rounded-full bg-red-500
                                            flex items-center justify-center text-white z-10 animate-pulse">
                                            3
                                        </span>
                                        <BiMessageRounded className="w-6 h-6 dNavIcon"/>
                                    </button>
                                </Tooltip>
                            </div>
                            {/* create icon */}
                            <div className="dNavWrapper">
                                <Tooltip className="mt-[2px]" style="light" content="Create" placement="bottom" animation="duration-1000">
                                    <button className="dNavBtn group" onClick={() => openUploadModal(true)}>
                                        <AiOutlinePlusCircle className="w-[18px] h-[18px] dNavIcon"/>
                                    </button>
                                </Tooltip>
                            </div>
                            {/* explore icon */}
                            <div className="dNavWrapper">
                                <Tooltip className="mt-[2px]" style="light" content="Explore" placement="bottom" animation="duration-1000">
                                    <button className="dNavBtn group">
                                        <BsPeople className="w-[20px] h-[20px] dNavIcon"/>
                                    </button>
                                </Tooltip>
                            </div>
                            {/* notification icon */}
                            <div className="dNavWrapper">
                                <Tooltip className="mt-[2px]" style="light" content="Notification" placement="bottom" animation="duration-1000">
                                    <button 
                                        onClick={() => router.push(makeContextualHref({
                                            routeModalId: 'notification',
                                            currentPageURL: returnHref,
                                        }), '/accounts/activity')}
                                        className="dNavBtn -mr-3 md:mr-0 group">
                                        <IoMdNotificationsOutline className="w-6 h-6 dNavIcon"/>
                                    </button>
                                </Tooltip>
                            </div>
                            {/* profile link */}
                            <div className="dNavWrapper">
                                <Tooltip className="mt-[-1.5px]" style="light" content={`Profile @${session?.user?.username}`} placement="bottom" animation="duration-1000">
                                    <button onClick={() => router.push(`/${session?.user?.username}`)} 
                                        className="h-12 w-12 flex items-center justify-center cursor-pointer
                                        bg-transparent ml-0 hover:bg-gray-100 rounded-full group">
                                        <img 
                                            src={session?.user?.image as string} 
                                            alt="avatar" 
                                            className="h-10 rounded-full cursor-pointer group-hover:w-[35px] group-hover:h-[35px] relative
                                            transition-all duration-75 ease-in-out" />
                                    </button>
                                </Tooltip>
                            </div>
                        </> : <button type="button" className="font-bold" onClick={() => signIn()}>Signin</button> }        
                </div>
            </div>
       </div>
    )
}

export default Header;