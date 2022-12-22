import Modal from './Modal'
import {faker} from '@faker-js/faker'
import { MdOutlineClose, MdKeyboardBackspace } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Notifications = ({onClose, onModal=false}: {onClose: () => void, onModal?: boolean}) => {
    const [notis, setNotis] = useState<{image: string, username: string, message: string, follows: boolean}[]>([])
    const router = useRouter()

    useEffect(() => {
        setNotis([{
            image: faker.image.avatar(),
            username: faker.internet.userName(),
            message: faker.lorem.sentence(3),
            follows: true
        },
        {
            image: faker.image.avatar(),
            username: faker.internet.userName(),
            message: faker.lorem.sentence(3),
            follows: true
        },
        {
            image: faker.image.avatar(),
            username: faker.internet.userName(),
            message: faker.lorem.sentence(3),
            follows: false
        },
        {
            image: faker.image.avatar(),
            username: faker.internet.userName(),
            message: faker.lorem.sentence(3),
            follows: true
        },
        {
            image: faker.image.avatar(),
            username: faker.internet.userName(),
            message: faker.lorem.sentence(3),
            follows: false
        },
        {
            image: faker.image.avatar(),
            username: faker.internet.userName(),
            message: faker.lorem.sentence(3),
            follows: false
        },
        {
            image: faker.image.avatar(),
            username: faker.internet.userName(),
            message: faker.lorem.sentence(3),
            follows: true
        },
        {
            image: faker.image.avatar(),
            username: faker.internet.userName(),
            message: faker.lorem.sentence(3),
            follows: false
        },
        {
            image: faker.image.avatar(),
            username: faker.internet.userName(),
            message: faker.lorem.sentence(3),
            follows: true
        }])
    },[])

    return (
        <div className={`md:max-w-[500px]`}>
            {/* header section */}
            <section className={`h-[50px] relative px-5 border-b ${!onModal && 'md:border-b-0 sticky md:rounded-bl-lg md:rounded-br-lg md:shadow-mainShadow'} ${onModal ? 'top-0':'top-[53px] md:rounded-tr-lg md:rounded-tl-lg'}
                bg-white`}>
                <div className='h-full float-left flex items-center relative z-10'>
                    <button className={`${onModal && 'hidden'}`} onClick={onClose}><MdKeyboardBackspace size={24}/></button>
                </div>
                <div className='absolute inset-0 flex items-center justify-center'>
                    <h1 className='text-lg font-bold'>Notifications</h1>
                </div>
                <div className='h-full float-right flex items-center relative'>
                    <button className={`${!onModal && 'hidden'}`} onClick={onClose}><MdOutlineClose size={24}/></button>
                </div>
            </section>
            {/* main content */}
            <section className={`py-5 bg-white ${!onModal && 'shadow-mainShadow my-5 rounded-lg'}`}>
                <p className='text-gray-400 text-sm text-center px-5 py-3'>These are fake notifications for now. Yet to implement!</p>
                {
                    notis ? (
                        notis.map(noti => (
                            <div key={noti.username} className='flex items-center px-5 py-3 cursor-pointer'>
                                <div className='min-w-[45px]'>
                                    <img className='h-[45px] w-[45px] object-cover rounded-full' src={noti.image} alt="user image" />
                                </div>
                                <div className='mx-4 mr-5 break-all text-left'>
                                    <span className='font-bold mr-3'>{noti.username}</span>
                                    <span className=''>{noti.message}</span>
                                </div>
                                <div className='w-fit ml-auto'>
                                    {
                                        noti.follows ? (
                                            <span className='px-4 py-2 border rounded-md font-[600]'>Following</span>
                                        ):(
                                            <button 
                                                className='px-4 py-2 border rounded-md font-[600] text-white bg-instaBlue'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}>Follow</button>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    ):(
                        <div><p>You don't have any notifications for now</p></div>
                    )
                }
            </section>
        </div>
    )
}

export default Notifications