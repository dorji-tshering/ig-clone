import Modal from "../Modal"
import { newMessageModalState } from '../../atoms/newMessageAtom'
import { useRecoilState } from "recoil"
import { MdOutlineClose } from 'react-icons/md'
import { useState } from "react"
import { TfiClose } from 'react-icons/tfi'
import { v4 as uuidv4 } from 'uuid'
import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine } from 'react-icons/ri'
import { useRouter } from 'next/router'

const NewMessageModal = () => {
    const [open, setOpen] = useRecoilState(newMessageModalState)
    const [suggestions, setSuggestions] = useState([
        {
            name: 'Dorji Tshering',
            username: 'dorji_dev'
        }, 
        {
            name: 'Yangchen Dolkar',
            username: 'bumie'
        }, 
        {
            name: 'Tshering Lhamo',
            username: 'yuki'
        },
        {
            name: 'Pema Doeji',
            username: 'pe_doe'
        },
        {
            name: 'Cheki Lhamo',
            username: 'lhamo_'
        }
    ])
    const [chatUsers, setChatUsers] = useState<{
        name: string;
        username: string;
    }[] | null>(null)

    const router = useRouter();

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="flex flex-col pb-10">
                {/* header */}
                <div className='relative p-5 border-b'>
                    <div className='float-left h-full flex items-center relative z-10'>
                        <button onClick={() => setOpen(false)}><MdOutlineClose size={24}/></button>
                    </div>
                    <div className='absolute inset-0 flex justify-center items-center'>
                        <h1 className='text-lg font-bold'>New message</h1>
                    </div>
                    <div className='float-right h-full flex items-center relative'>
                        <button onClick={() => {
                            setOpen(false)
                            router.push('/direct/t/chatId')
                        }} className='font-bold text-instaBlue'>Next</button>
                    </div>
                </div>
                {/* search section */}
                <div className='flex px-5 py-2 items-center border-b'>
                    <div className='mr-5'><span>To:</span></div>
                    <div className='grow flex flex-wrap max-w-[400px]'>
                        {
                            chatUsers && chatUsers.map((chatUser) => (
                                <div key={uuidv4()} className='flex items-center rounded-full bg-instaBlue/10 px-3 py-1 mr-2 mb-2'>
                                    <span className='text-instaBlue mr-2'>{chatUser.username}</span>
                                    <button onClick={() => {
                                        setChatUsers(chatUsers.filter(user => user.username !== chatUser.username))
                                        setSuggestions(suggestions => [...suggestions, chatUser])
                                    }}>
                                        <TfiClose className='text-instaBlue' size={10}/>
                                    </button>
                                </div>
                            ))
                        }
                        <input 
                            type="text" 
                            className='border-0 focus:ring-0 placeholder:text-gray-400 placeholder:font-[500] w-full' 
                            placeholder="Search"/>
                    </div>
                </div>
                {/* search suggestion */}
                <div>
                    {
                        suggestions.length > 0 ? (
                            suggestions.map((user) => 
                                <div key={uuidv4()}>
                                    <div onClick={() => {
                                        setChatUsers(chatUsers => chatUsers ? [...chatUsers, user] : [user])
                                        setSuggestions(suggestions.filter(suggestion => suggestion.username !== user.username))
                                    }} 
                                        className="flex justify-between items-center px-5 py-2 cursor-pointer hover:bg-gray-100/40">
                                        <div className="flex items-center">
                                            <div className="h-14 w-14 mr-4">
                                                <img src="/images/dorji.jpg" alt="" className="h-full object-cover rounded-full border
                                                    border-solid border-gray-100" />
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <div className="flex items-center font-bold">
                                                        {user.username}
                                                </div>
                                                <p className="text-gray-400">{user.name}</p>
                                            </div>
                                        </div>
                                        <>{true && console.log('hello')}</>
                                        <div>
                                            <RiCheckboxBlankCircleLine size={24}/>
                                        </div>
                                    </div>                                
                                </div>  
                            )  
                        ):(
                            <div className="text-left p-5">
                                <h2 className='font-bold mb-8'>Suggested</h2>
                                <p className='text-gray-400 mb-20'>No account found.</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </Modal>
    )
}

export default NewMessageModal