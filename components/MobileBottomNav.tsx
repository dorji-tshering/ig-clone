import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useSetRecoilState } from 'recoil';
import { uploadModalState } from '../atoms/uploadModalAtom';
import { FaHome } from 'react-icons/fa';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { BiMessageRounded } from 'react-icons/bi';

const MobileBottomNav = () => {
    const router = useRouter();
    const {data: session}: any = useSession();
    const openUploadModal = useSetRecoilState(uploadModalState);

    return (
        <div className="md:hidden flex justify-between w-full border-solid border-0 border-t-[1px] border-gray-200  bg-white py-3 px-5 z-10 fixed bottom-0">
            <span className="order-1" onClick={() => router.push('/')}>
                <FaHome className="mBottomNavIcon"/>
            </span> 
            <span onClick={() => openUploadModal(true)} className="order-3">
                <AiOutlinePlusCircle className="mBottomNavIcon"/>
            </span>
            <span className="order-4">
                    <BsPeople className="mBottomNavIcon"/>
            </span>
            <span className="relative order-2" onClick={() => router.push('/direct/inbox')}>
                <span className="absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full bg-red-500
                    flex items-center justify-center text-white z-10 animate-pulse">
                    3
                </span>
                <BiMessageRounded className="mBottomNavIcon"/>
            </span>
            <img 
                onClick={() => router.push(`/${session?.user?.username}`)}
                src={session?.user?.image as string ?? '/images/placeholder.png'} 
                className="order-5 w-8 object-cover border border-solid border-gray-200 p-[3px] max-h-[28px] rounded-full" 
                alt="user-avatar" 
            />        
        </div>
    )
}

export default MobileBottomNav