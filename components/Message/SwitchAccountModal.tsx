import Modal from "../Modal"
import { switchAccountState } from '../../atoms/switchAccountAtom'
import { useRecoilState } from "recoil"
import { MdOutlineClose } from 'react-icons/md'
import Link from "next/link"
import { RiCheckboxCircleFill } from 'react-icons/ri'

const SwitchAccountModal = () => {
    const [open, setOpen] = useRecoilState(switchAccountState)

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
                    <Link href='/username' className='mr-3'>
                        <img 
                            src="/images/dorji.jpg" 
                            alt="current user image"
                            className='h-[56px] w-[56px] rounded-full' />
                    </Link>
                    <p className='font-bold'>dorji_dev</p>
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