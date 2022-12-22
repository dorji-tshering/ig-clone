import { ReactElement, useEffect, useRef, useState } from "react"
import Header from "./Header"
import { useRouter } from 'next/router'
import MobileBottomNav from "./MobileBottomNav"
import PostUploadModal from "./PostUploadModal"
import ProfileImageUpload from "./ProfileImageUpload"
import RoutedModal from "./RoutedModal"
import PostOptionsModal from "./PostOptionsModal"
import SwitchAccountModal from "./Message/SwitchAccountModal"
import NewMessageModal from "./Message/NewMessageModal"
import { useSession } from "next-auth/react"
import Notice from '../components/Notice'
import { usePreserveScroll } from '../utils/usePreserveScroll'
import isMobile from '../utils/useMediaQuery'

const Layout = ({children}: {children: ReactElement}) => {
    const {data: session, status} = useSession()
    const router = useRouter()

    // secure unauthorized contents
    useEffect(() => {
        if(router.pathname !== '/auth/signin' && status === 'unauthenticated') {
            router.push('/auth/signin')
        }
    },[status])

    if(router.pathname !== '/auth/signin' && status === 'unauthenticated' || status === 'loading') return <></>

    return (
        <main>
            {session && <Header/>}
            <div>
                {children}
            </div>
            {session && <MobileBottomNav/>}
            <PostUploadModal/>
            <ProfileImageUpload/>
            <RoutedModal/>
            <PostOptionsModal/>
            <SwitchAccountModal/>
            <NewMessageModal/>
            <Notice/>
        </main>
    )
}

export default Layout