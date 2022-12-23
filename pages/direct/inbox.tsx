import Left from "../../components/Message/Left"
import Right from "../../components/Message/Right"
import ChatRoom from "../../components/Message/ChatRoom"
import { FiSend } from 'react-icons/fi'
import { newMessageModalState } from '../../atoms/newMessageAtom'
import { useSetRecoilState } from "recoil"
import isMobile from '../../utils/useMediaQuery'
import { AiOutlineWechat } from "react-icons/ai"

const Inbox = () => {
    const openNewMessageModal = useSetRecoilState(newMessageModalState)
    const isMb = isMobile()
    const inbox = true

    return (
        <div className="md:px-5 mx-auto md:max-w-[800px] bg-white h-full md:h-[calc(100vh-100px)]\ md:mt-5 md:pb-14">
            <div className="md:shadow-mainShadow md:rounded-lg flex md:h-full">
                <Left>
                        {
                            false ? (
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

                                    <section className='grow flex flex-col items-center justify-center px-10 text-center mt-10 text-gray-500'>
                                        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-50 mb-10">
                                            <AiOutlineWechat size={30}/>
                                        </div>
                                        <p>Feature <span className="font-bold">coming soon!</span> You can still play with the UI though.</p>
                                    </section>
                                </>
                            )
                        }
                </Left>
                {
                    !isMb && (
                        <Right>
                            {
                                false ? (
                                    <ChatRoom/>
                                ):(
                                    <div className='flex flex-col justify-center items-center h-full'>
                                        <div className='w-[96px] h-[96px] border-2 border-black rounded-full flex 
                                            justify-center items-center mb-4'>
                                            <FiSend className='rotate-[20deg] relative -left-1' size={44}/>
                                        </div>
                                        <h1 className='text-2xl mb-2'>Your Messages</h1>
                                        <p className='text-gray-400 mb-8 text-center'>Send private photos and messages to a friend or group.</p>
                                        <button onClick={() => openNewMessageModal(true)}className='px-4 py-2 bg-instaBlue text-white rounded-md font-bold'>Send Message</button>
                                    </div>
                                )
                            }
                        </Right>
                    )
                }
            </div>
        </div>
    )
}

export default Inbox
