import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useSession } from 'next-auth/react';

const Feed = () => {
    const {data: session} = useSession();

    return (
        <div className={`grid grid-cols-1 md:mx-auto ${session && 'lg:grid-cols-3 lg:max-w-6xl'}`}>
            {/* left section */}
            <section className="col-span-1 lg:col-span-2">
                <Posts/>
            </section>

            {/* right section */}
            <section className={`hidden ${session && 'lg:block'} lg:col-span-1`}>
                <div className="fixed top-20 w-[308px] overflow-y-auto h-[calc(100vh-100px)] pb-11">
                    <MiniProfile/>
                    <Suggestions/>
                </div>
            </section>
        </div>
    )
}

export default Feed;