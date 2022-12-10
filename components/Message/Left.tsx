import { HiOutlinePencilAlt, HiOutlineChevronDown } from 'react-icons/hi'
import { useSetRecoilState } from 'recoil'
import { switchAccountState } from '../../atoms/switchAccountAtom'
import { newMessageModalState } from '../../atoms/newMessageAtom'

/**
 * Left side of the component used for desktop '/direct/*' route
 * @returns 
 */
const Left = ({children}: {children: React.ReactNode}) => {
    const openSwitchAccount = useSetRecoilState(switchAccountState)
    const openNewMessage = useSetRecoilState(newMessageModalState)

    return (
        <div className="basis-2/5 border-r overflow-y-auto">
            <section className='sticky h-[60px] border-b px-5 top-0 bg-white'>
                <div className="absolute inset-0 flex items-center justify-center">
                    <button onClick={() => openSwitchAccount(true)} className="flex items-center">
                        <span className='text-lg font-bold mr-2'>dorji_dev</span><HiOutlineChevronDown size={24}/>
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