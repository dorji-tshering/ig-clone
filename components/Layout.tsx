import { ReactElement } from "react";
import Header from "./Header";
import MobileBottomNav from "./MobileBottomNav";
import PostUploadModal from "./PostUploadModal";

const Layout = ({children}: {children: ReactElement}) => {

    
    return (
        <main className="mb-14">
            <Header/>
            {children}
            <MobileBottomNav/>
            <PostUploadModal/>
        </main>
    )
}

export default Layout