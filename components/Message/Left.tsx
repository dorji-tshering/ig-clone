import { HiOutlinePencilAlt, HiOutlineChevronDown } from 'react-icons/hi'
import { MdKeyboardBackspace } from 'react-icons/md'
import { useSetRecoilState } from 'recoil'
import { switchAccountState } from '../../atoms/switchAccountAtom'
import { newMessageModalState } from '../../atoms/newMessageAtom'
import { useRouter } from 'next/router'
import { CurrentSession } from '../../utils/types'
import { useSession } from 'next-auth/react'

/**
 * Left side of the component used for desktop '/direct/*' route
 * @returns 
 */
const Left = ({children}: {children: React.ReactNode}) => {
    const openSwitchAccount = useSetRecoilState(switchAccountState)
    const openNewMessage = useSetRecoilState(newMessageModalState)
    const router = useRouter()
    const session = useSession().data as CurrentSession

    return (
        <div className="basis-full md:rounded-tl-lg md:basis-2/5 md:border-r overflow-y-auto">
            <section className='sticky h-[64px] border-b px-5 top-0 bg-white'>
                <div className='float-left z-10 relative md:hidden h-full flex items-center'>
                    <button onClick={() => router.back()}>
                        <MdKeyboardBackspace size={26}/>
                    </button>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <button onClick={() => openSwitchAccount(true)} className="flex items-center">
                        <span className='text-lg font-bold mr-2'>{session.user.username}</span><HiOutlineChevronDown size={24}/>
                    </button>
                </div>
                <div className='float-right relative h-full flex items-center'>
                    <button onClick={() => openNewMessage(true)}>
                        <HiOutlinePencilAlt size={26}/>
                    </button>
                </div>
            </section>
            {/* content specific to a page */}
            {children}
        </div>
    )
}

export default Left