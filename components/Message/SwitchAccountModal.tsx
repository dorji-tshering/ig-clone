import Modal from "../Modal"
import { switchAccountState } from '../../atoms/switchAccountAtom'
import { useRecoilState } from "recoil"
import { MdOutlineClose } from 'react-icons/md'
import Link from "next/link"
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { CurrentSession } from '../../utils/types'
import { useSession } from 'next-auth/react'

const SwitchAccountModal = () => {
    const [open, setOpen] = useRecoilState(switchAccountState)
    const session = useSession().data as CurrentSession

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className='flex flex-col'>
                {/* header */}
                <div className='relative p-5 border-b'>
                    <div className='absolute inset-0 flex justify-center items-center'>
                        <h1 className='font-bold text-lg'>Switch accounts</h1>
                    </div>
                    <button onClick={() => setOpen(false)} className='float-right relative'><MdOutlineClose size={24}/></button>
                </div>
                {/* active account */}
                <div className='p-5 flex items-center mb-10'>
                    <Link onClick={() => setOpen(false)} href={`/${session?.user.username}`} className='mr-3'>
                        <img 
                            src={session?.user.image as string}
                            alt="current user image"
                            className='h-[56px] w-[56px] rounded-full border p-[2px]' />
                    </Link>
                    <p className='font-bold'>{session?.user.username}</p>
                    <div className='ml-auto w-fit'><RiCheckboxCircleFill size={24} className='text-instaBlue' /></div>
                </div>
                {/* footer */}
                <div className='p-5 border-t'>
                    <button className='font-bold text-instaBlue'>Log into an Existing Account</button>
                </div>
            </div>
        </Modal>
    )
}

export default SwitchAccountModal