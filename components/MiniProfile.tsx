import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router'

function MiniProfile() {
    const router = useRouter()
    const {data: session}: any = useSession();

    return (
        <div className='flex items-center justify-between mt-5 ml-10'>
            <img className='rounded-full border p-[2px] w-16 h-16' src={session?.user?.image} alt="" />
            <div className="flex-1 mx-4">
                <h2 className='font-bold'>{session?.user?.username}</h2>
                <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
            </div>
            <button 
                onClick={async () =>  {
                    // redirect without reloading the page
                    const data = await signOut({redirect: false, callbackUrl: '/auth/signin'})
                    router.push(data.url)
                }} className='text-instaBlue text-sm font-bold'>Sign Out</button>
        </div>
    )
}

export default MiniProfile