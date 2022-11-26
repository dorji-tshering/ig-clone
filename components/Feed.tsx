import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useSession } from 'next-auth/react';

const Feed = () => {
    const {data: session} = useSession();

    return (
        <main className={`grid grid-cols-1 mx-2 md:mx-auto md:grid-cols-2 md:max-w-3xl ${session && 'lg:grid-cols-3 lg:max-w-5xl'}`}>
            <section className="col-span-2">
                <Stories/>  
                <Posts/>
            </section>

            {/* section */}
            <section className={`hidden ${session && 'lg:block'} lg:col-span-1`}>
                <div className="fixed top-20 max-w-[341px]">
                    {/* Mini profile */}
                    <MiniProfile/>
                    {/* Suggestions */}
                    <Suggestions/>
                </div>
            </section>
        </main>
    )
}

export default Feed;