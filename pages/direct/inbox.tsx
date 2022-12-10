import Left from "../../components/Message/Left"
import Right from "../../components/Message/Right"
import ChatRoom from "../../components/Message/ChatRoom"
import { FiSend } from 'react-icons/fi'
import { newMessageModalState } from '../../atoms/newMessageAtom'
import { useSetRecoilState } from "recoil"

const Inbox = () => {
    const openNewMessageModal = useSetRecoilState(newMessageModalState)
    const inbox = false

    return (
        <div className="pageContent px-5 mx-auto md:max-w-[800px] h-[calc(100%-130px)]">
            <div className="md:border rounded-md flex h-full">
                <Left>
                    {
                        inbox ? (
                            <></>
                        ):(
                            // skeleton
                            <>
                                <div className='flex p-5'>
                                    <div className='h-[60px] w-[60px] bg-gray-200 rounded-full mr-4'></div>
                                    <div className='flex flex-col justify-center grow'>
                                        <div className='h-4 w-[80%] bg-gray-200 rounded-[4px] mb-3'></div>
                                        <div className='h-4 w-[60%] bg-gray-200 rounded-[4px]'></div>
                                    </div>
                                </div>
                                <div className='flex p-5'>
                                    <div className='h-[60px] w-[60px] bg-gray-200 rounded-full mr-4'></div>
                                    <div className='flex flex-col justify-center grow'>
                                        <div className='h-4 w-[80%] bg-gray-200 rounded-[4px] mb-3'></div>
                                        <div className='h-4 w-[60%] bg-gray-200 rounded-[4px]'></div>
                                    </div>
                                </div>
                                <div className='flex p-5'>
                                    <div className='h-[60px] w-[60px] bg-gray-200 rounded-full mr-4'></div>
                                    <div className='flex flex-col justify-center grow'>
                                        <div className='h-4 w-[80%] bg-gray-200 rounded-[4px] mb-3'></div>
                                        <div className='h-4 w-[60%] bg-gray-200 rounded-[4px]'></div>
                                    </div>
                                </div>
                                <div className='flex p-5'>
                                    <div className='h-[60px] w-[60px] bg-gray-200 rounded-full mr-4'></div>
                                    <div className='flex flex-col justify-center grow'>
                                        <div className='h-4 w-[80%] bg-gray-200 rounded-[4px] mb-3'></div>
                                        <div className='h-4 w-[60%] bg-gray-200 rounded-[4px]'></div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </Left>
                <Right>
                    {
                        inbox ? (
                            <div></div>
                        ):(
                            <div className='flex flex-col justify-center items-center h-full'>
                                <div className='w-[96px] h-[96px] border-2 border-black rounded-full flex 
                                    justify-center items-center mb-4'>
                                    <FiSend className='rotate-[20deg] relative -left-1' size={44}/>
                                </div>
                                <h1 className='text-2xl mb-2'>Your Messages</h1>
                                <p className='text-gray-400 mb-8'>Send private photos and messages to a friend or group.</p>
                                <button onClick={() => openNewMessageModal(true)}className='px-4 py-2 bg-instaBlue text-white rounded-md font-bold'>Send Message</button>
                            </div>
                        )
                    }
                </Right>
            </div>
        </div>
    )
}

export default Inbox
