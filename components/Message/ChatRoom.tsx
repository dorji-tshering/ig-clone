import { IoCallOutline, IoVideocamOutline, IoInformationCircleOutline } from 'react-icons/io5'
import { useRouter } from 'next/router'
import { BsEmojiSmile } from 'react-icons/bs'
import { AiOutlineHeart, AiOutlineWechat } from 'react-icons/ai'
import { HiOutlinePhoto } from 'react-icons/hi2'
import { useState } from 'react'
import EmojiPicker from '../EmojiPicker'
import { MdKeyboardBackspace } from 'react-icons/md'
import { CurrentSession } from '../../utils/types'
import { useSession } from 'next-auth/react'

/**
 * Component to display and allow a user to chat with other users.
 * A single chat room component.
 * @returns 
 */
const ChatRoom = () => {
    const router = useRouter()
    const [message, setMessage] = useState<string>('')
    const [showPicker, setShowPicker] = useState(false)
    const session = useSession().data as CurrentSession

    return (
        <>
            <header className="flex border-b px-5 md:px-8 py-5 sticky top-[54px] md:top-0 bg-white md:rounded-tr-lg">
                <button className='md:hidden mr-3' onClick={() => router.back()}><MdKeyboardBackspace size={24}/></button>
                <button onClick={() => router.push(`/${session.user.username}`)}>
                    <img src={session.user.image as string} alt="chat user image" className='h-8 w-8 rounded-full' />
                </button>
                <button onClick={() => router.push(`/${session.user.username}`)} className='font-bold text-lg ml-4'>
                    {session.user.username}
                </button>
                <div className="grow flex justify-end">
                    <button className='hidden md:block'><IoCallOutline size={23}/></button>
                    <button className="ml-4 hidden md:block"><IoVideocamOutline size={26}/></button>
                    <button className='ml-4'><IoInformationCircleOutline size={26}/></button>
                </div>
            </header>
            {/* messages section */}
            <section className='flex-1 flex flex-col items-center justify-center px-10 py-5 text-center text-gray-500'>
                <div className="mb-10">
                    <div className="flex items-center mx-auto justify-center w-32 h-32 rounded-full bg-gray-50 mb-10">
                        <AiOutlineWechat size={50}/>
                    </div>
                    <p>Feature <span className="font-bold">coming soon!</span> You can still play with the UI though.</p>
                </div>
                <div className="mb-10">
                    <div className="flex items-center mx-auto justify-center w-32 h-32 rounded-full bg-gray-50 mb-10">
                        <AiOutlineWechat size={50}/>
                    </div>
                    <p>Feature <span className="font-bold">coming soon!</span> You can still play with the UI though.</p>
                </div>
                <div className="mb-10">
                    <div className="flex items-center mx-auto justify-center w-32 h-32 rounded-full bg-gray-50 mb-10">
                        <AiOutlineWechat size={50}/>
                    </div>
                    <p>Feature <span className="font-bold">coming soon!</span> You can still play with the UI though.</p>
                </div>
                <div className="mb-10">
                    <div className="flex items-center mx-auto justify-center w-32 h-32 rounded-full bg-gray-50 mb-10">
                        <AiOutlineWechat size={50}/>
                    </div>
                    <p>Feature <span className="font-bold">coming soon!</span> You can still play with the UI though.</p>
                </div>
                



            </section>
            {/* message input */}
            <section className='px-5 py-3 md:px-8 sticky bottom-0 bg-white border-t'>
                {
                    showPicker && (
                        <EmojiPicker
                            onClose={() => setShowPicker(false)}
                            onSelect={(emoji) => setMessage(prevMessage => prevMessage + emoji.native)}
                            customStyles='w-fit mx-auto left-0 right-0'
                            bottom='bottom-[75px]'
                        />
                    )
                }
                <div className='flex border rounded-full px-3 py-1 items-center'>
                    <button onClick={() => setShowPicker(true)}><BsEmojiSmile size={24}/></button>
                    <div className='grow mx-1'>
                        <input 
                            type="text" 
                            className="w-full border-0 focus:ring-0" 
                            placeholder='Message...'
                            autoComplete='false'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <button className='mr-5'><HiOutlinePhoto size={24}/></button>
                    <button><AiOutlineHeart size={24}/></button>
                </div>
            </section>
        </>
    )
}

export default ChatRoom