import { ReactElement } from "react";
import Header from "./Header";
import MobileBottomNav from "./MobileBottomNav";
import PostUploadModal from "./PostUploadModal";
import ProfileImageUpload from "./ProfileImageUpload";
import RoutedModal from "./RoutedModal";
import PostOptionsModal from "./PostOptionsModal";
import SwitchAccountModal from "./Message/SwitchAccountModal";
import NewMessageModal from "./Message/NewMessageModal";

const Layout = ({children}: {children: ReactElement}) => {

    
    return (
        <main>
            <Header/>
            {children}
            <MobileBottomNav/>
            <PostUploadModal/>
            <ProfileImageUpload/>
            <RoutedModal/>
            <PostOptionsModal/>
            <SwitchAccountModal/>
            <NewMessageModal/>
        </main>
    )
}

export default Layout