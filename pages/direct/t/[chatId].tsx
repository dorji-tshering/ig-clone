import Left from '../../../components/Message/Left'
import Right from '../../../components/Message/Right'
import ChatRoom from '../../../components/Message/ChatRoom'
import { faker } from '@faker-js/faker'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import isMobile from '../../../utils/useMediaQuery'

const ChatPage = () => {
    const [activeChats, setActiveChats] = useState<{chatId: string, avatar: string, fullName: string} []>()
    const router = useRouter()
    const isMb = isMobile()

    useEffect(() => {
        let chats = [
            {
                chatId: '2342345345',
                avatar: faker.image.avatar(),
                fullName: faker.name.fullName(),
            },
            {
                chatId: '234264222',
                avatar: faker.image.avatar(),
                fullName: faker.name.fullName(),
            },
            {
                chatId: '45675634563',
                avatar: faker.image.avatar(),
                fullName: faker.name.fullName(),
            }
        ]
        setActiveChats(chats)
    }, [])

    return (
        <div className="pageContent md:px-5 mx-auto md:max-w-[800px] h-[calc(100%-55px)] md:h-[calc(100%-130px)]">
            <div className="md:border rounded-md -mt-5 md:mt-0 flex h-full">
                {
                    !isMb && (
                        <Left>
                            {
                                activeChats && activeChats.map(chat => (
                                    <Link href={`/direct/t/${chat.chatId}`} 
                                        className={classNames(
                                            'px-5 py-2 flex items-center hover:bg-gray-100/30',
                                            router.query.chatId === chat.chatId && 'bg-gray-100 hover:!bg-gray-100'
                                        )}>
                                        <img src={chat.avatar} alt="user image" className='h-[56px] w-[56px] rounded-full mr-6' />
                                        <p>{chat.fullName}</p>
                                    </Link>
                                ))
                            }
                        </Left>
                    )
                }
                <Right>
                    <ChatRoom/>
                </Right>
            </div>
        </div>
    )
}

export default ChatPage