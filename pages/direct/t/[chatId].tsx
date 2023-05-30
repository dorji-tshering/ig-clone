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
                fullName: faker.person.fullName(),
            },
            {
                chatId: '234264222',
                avatar: faker.image.avatar(),
                fullName: faker.person.fullName(),
            },
            {
                chatId: '45675634563',
                avatar: faker.image.avatar(),
                fullName: faker.person.fullName(),
            }
        ]
        setActiveChats(chats)
    }, [])

    return (
        <div className="md:px-5 mx-auto md:max-w-[800px] h-full md:h-[calc(100vh-100px)] md:mt-5 md:pb-14">
            <div className="shadow-mainShadow bg-white md:rounded-lg flex h-full">
                {
                    !isMb && (
                        <Left>
                            {
                                activeChats && activeChats.map(chat => (
                                    <Link key={chat.chatId} href={`/direct/t/${chat.chatId}`} 
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