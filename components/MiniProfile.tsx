import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { useRouter } from 'next/router'
import { CurrentSession } from '../utils/types'

function MiniProfile() {
    const router = useRouter()
    const session = useSession().data as CurrentSession

    return (
        <div className='flex items-center'>
            <Link href={`/${session.user.username}`}>
                <img className='rounded-full border p-[2px] w-14 h-14' src={session?.user?.image as string ?? '/images/placeholder.png'} alt="current user image" />
            </Link>
            <div className="ml-3">
                <Link href={`/${session.user.username}`} className='font-bold'>{session?.user?.username}</Link>
                <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
            </div>
            <button 
                onClick={async () =>  {
                    // redirect without reloading the page
                    // const data = await signOut({redirect: false, callbackUrl: '/auth/signin'})
                    // router.push(data.url)
                    await signOut()
                    router.push('/auth/signin')
                }} className='text-instaBlue font-bold mt-2 block ml-auto'>Sign out</button>
        </div>
    )
}

export default MiniProfile