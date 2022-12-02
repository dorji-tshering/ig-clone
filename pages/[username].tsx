import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Profile = () => {
    const router = useRouter();
    const {data: session}: any = useSession();

    return (
        <div className="md:p-16">
            {/* profile meta-data */}
            <section className="flex p-5 md:p-0 min-h-[80px] sm:h-[150px] justify-between sm:justify-center">
                <div className="mr-5 sm:mr-10">
                    <div className="flex justify-center items-center flex-col sm:h-full">
                        <img 
                            className="h-[70px] w-[70px] min-w-[70px] object-contain sm:h-full sm:w-auto rounded-full p-1 border border-solid border-gray-300" 
                            src={session?.user?.image} alt="avatar" />
                    </div>
                    <p className="font-bold mt-3 text-lg sm:hidden">{session?.user?.name}</p>
                </div>
                <div className="sm:ml-10 grow sm:grow-0 flex flex-col justify-between sm:py-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <h1 className="text-2xl sm:text-3xl mb-3 sm:mb-0 sm:mr-6">{session?.user?.username}</h1>
                        <Link 
                            className="text-lg w-[200px] text-center sm:w-auto py-1 px-3 font-[600] border border-solid border-gray-200 rounded-md" 
                            href="/account/edit" >Edit profile</Link>
                    </div>
                    <div className="hidden sm:flex">
                        <div className="mr-10"><span className="font-bold mr-1">0</span> posts</div>
                        <Link 
                            className="mr-10" 
                            href={`/${session?.user?.username}/followers`}>
                                <span className="font-bold mr-1">200</span> followers</Link>
                        <Link 
                            className="mr-10" 
                            href={`/${session?.user?.username}/following`}>
                                <span className="font-bold mr-1">10</span> following</Link>
                    </div>
                    <div className="hidden sm:flex">
                        <p className="font-bold text-xl">{session?.user?.name}</p>
                    </div>
                </div>
            </section>
            {/* mobile markup */}
            <section className="sm:hidden border border-solid border-gray-300 border-r-0 border-l-0 py-4">
                <div className="flex text-center">
                    <div className="w-[33.3%]"><span className="font-bold sm:mr-1 block">0</span><span className="text-gray-400">posts</span></div>
                    <Link 
                        className="w-[33.3%]" 
                        href={`/${session?.user?.username}/followers`}>
                            <span className="font-bold sm:mr-1 block">200</span><span className="text-gray-400">followers</span></Link>
                    <Link 
                        className="w-[33.3%]" 
                        href={`/${session?.user?.username}/following`}>
                            <span className="font-bold sm:mr-1 block">10</span> <span className="text-gray-400">following</span></Link>
                </div>
            </section>

            <section>

            </section>
        </div>
    )
}

export default Profile