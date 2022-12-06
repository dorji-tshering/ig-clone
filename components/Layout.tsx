import { ReactElement } from "react";
import Header from "./Header";
import MobileBottomNav from "./MobileBottomNav";
import PostUploadModal from "./PostUploadModal";
import ProfileImageUpload from "./ProfileImageUpload";
import RoutedModal from "./RoutedModal";
import PostOptionsModal from "./PostOptionsModal";

const Layout = ({children}: {children: ReactElement}) => {

    
    return (
        <main className="mb-14">
            <Header/>
            {children}
            <MobileBottomNav/>
            <PostUploadModal/>
            <ProfileImageUpload/>
            <RoutedModal/>
            <PostOptionsModal/>
        </main>
    )
}

export default Layout