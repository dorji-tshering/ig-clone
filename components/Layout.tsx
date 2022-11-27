import { ReactElement } from "react";
import Header from "./Header";
import MobileBottomNav from "./MobileBottomNav";
import Modal from "./Modal";

const Layout = ({children}: {children: ReactElement}) => {

    
    return (
        <main className="mb-14">
            <Header/>
            {children}
            <MobileBottomNav/>
            <Modal/>
        </main>
    )
}

export default Layout