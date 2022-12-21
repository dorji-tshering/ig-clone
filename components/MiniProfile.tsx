import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { useRouter } from 'next/router'
import { CurrentSession } from '../utils/types'

function MiniProfile() {
    const router = useRouter()
    const session = useSession().data as CurrentSession

    return (
        <div className='flex items-center justify-between mt-5 ml-10'>
            <Link href={`/${session.user.username}`}>
                <img className='rounded-full border p-[2px] w-16 h-16' src={session?.user?.image as string} alt="current user image" />
            </Link>
            <div className="flex-1 mx-4">
                <Link href={`/${session.user.username}`} className='font-bold'>{session?.user?.username}</Link>
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