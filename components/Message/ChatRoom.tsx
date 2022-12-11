import { IoCallOutline, IoVideocamOutline, IoInformationCircleOutline } from 'react-icons/io5'
import { useRouter } from 'next/router'
import { BsEmojiSmile } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { HiOutlinePhoto } from 'react-icons/hi2'
import { useState } from 'react'
import EmojiPicker from '../EmojiPicker'

/**
 * Component to display and allow a user to chat with other users.
 * A single chat room component.
 * @returns 
 */
const ChatRoom = () => {
    const router = useRouter()
    const [message, setMessage] = useState<string>('')
    const [showPicker, setShowPicker] = useState(false)

    return (
        <div className='flex flex-col h-full relative'>
            {
                showPicker && (
                    <EmojiPicker
                        onClose={() => setShowPicker(false)}
                        onSelect={(emoji) => setMessage(prevMessage => prevMessage + emoji.native)}
                        customStyles='w-fit mx-auto left-0 right-0'
                        bottom='bottom-[70px]'
                    />
                )
            }
            <header className="flex border-b px-10 py-5">
                <button onClick={() => router.push('/username')}>
                    <img src="/images/dorji.jpg" alt="chat user image" className='h-8 w-8 rounded-full' />
                </button>
                <button onClick={() => router.push('/username')} className='font-bold text-lg ml-4'>dorji_dev</button>
                <div className="grow flex justify-end">
                    <button><IoCallOutline size={23}/></button>
                    <button className="ml-4"><IoVideocamOutline size={26}/></button>
                    <button className='ml-4'><IoInformationCircleOutline size={26}/></button>
                </div>
            </header>
            {/* messages section */}
            <section className='grow'></section>
            {/* message input */}
            <section className='p-6'>
                <div className='flex border rounded-full px-5 py-2 items-center'>
                    <button onClick={() => setShowPicker(true)}><BsEmojiSmile size={24}/></button>
                    <div className='grow mx-5'>
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
        </div>
    )
}

export default ChatRoom