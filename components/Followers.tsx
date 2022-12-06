// a user follower component
import Link from 'next/link'
import { MdOutlineClose, MdKeyboardBackspace } from 'react-icons/md';
import { useRouter } from 'next/router';

type Props = {
    onClose?: () => void, 
    userID: string,
    onModal?: boolean
}

const Followers = ({onClose, userID, onModal=false}: Props) => {
    const router = useRouter();
    const followerLength = 0;
    const loggedInUser = true;

    return (
        <div className="mb-6">
            <div className="h-[50px] px-4 relative border-b">
                <div className="flex items-center justify-center h-full w-full absolute inset-0">
                    <h1 className="font-bold text-xl">Followers</h1>
                </div>
                {
                    onModal ? (
                        <div className="h-full flex items-center justify-end relative">
                            <button onClick={onClose}><MdOutlineClose size={26}/></button>
                        </div>
                    ):(
                        <div className="h-full flex items-center relative">
                            <button onClick={onClose}><MdKeyboardBackspace size={26}/></button>
                        </div>
                    )
                }
            </div>
            {/* user */}
            {
                followerLength ? (
                    <div>
                        <div className="flex justify-between items-center py-3 px-5">
                            <div className="flex items-center">
                                <div className="h-14 w-14 mr-4">
                                    <Link href="/username">
                                            <img src="/images/dorji.jpg" alt="" className="h-full object-cover rounded-full border
                                                border-solid border-gray-100" />
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center">
                                        <Link href="/username" className="font-bold">
                                            dorji_dev
                                        </Link>
                                        <span className="mx-1 text-gray-500">&bull;</span>
                                        <button className="font-[600] text-instaBlue text-sm">Follow</button>
                                    </div>
                                    <p className="font-[600] text-gray-400">Dorji Tshering</p>
                                </div>
                            </div>
                            <div>
                                <button className="font-[600] py-1 px-3 border border-solid border-gray-200 rounded-md">Remove</button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-3 px-5">
                            <div className="flex items-center">
                                <div className="h-14 w-14 mr-4">
                                    <Link href="/username">
                                            <img src="/images/dorji.jpg" alt="" className="h-full object-cover rounded-full border
                                                border-solid border-gray-100" />
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center">
                                        <Link href="/username" className="font-bold">
                                            dorji_dev
                                        </Link>
                                        <span className="mx-1 text-gray-500">&bull;</span>
                                        <button className="font-[600] text-instaBlue text-sm">Follow</button>
                                    </div>
                                    <p className="font-[600] text-gray-400">Dorji Tshering</p>
                                </div>
                            </div>
                            <div>
                                <button className="font-[600] py-1 px-3 border border-solid border-gray-200 rounded-md">Remove</button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-3 px-5">
                            <div className="flex items-center">
                                <div className="h-14 w-14 mr-4">
                                    <Link href="/username">
                                            <img src="/images/dorji.jpg" alt="" className="h-full object-cover rounded-full border
                                                border-solid border-gray-100" />
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center">
                                        <Link href="/username" className="font-bold">
                                            dorji_dev
                                        </Link>
                                        <span className="mx-1 text-gray-500">&bull;</span>
                                        <button className="font-[600] text-instaBlue text-sm">Follow</button>
                                    </div>
                                    <p className="font-[600] text-gray-400">Dorji Tshering</p>
                                </div>
                            </div>
                            <div>
                                <button className="font-[600] py-1 px-3 border border-solid border-gray-200 rounded-md">Remove</button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-3 px-5">
                <div className="flex items-center">
                    <div className="h-14 w-14 mr-4">
                        <Link href="/username">
                                <img src="/images/dorji.jpg" alt="" className="h-full object-cover rounded-full border
                                    border-solid border-gray-100" />
                        </Link>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="flex items-center">
                            <Link href="/username" className="font-bold">
                                dorji_dev
                            </Link>
                            <span className="mx-1 text-gray-500">&bull;</span>
                            <button className="font-[600] text-instaBlue text-sm">Follow</button>
                        </div>
                        <p className="font-[600] text-gray-400">Dorji Tshering</p>
                    </div>
                </div>
                <div>
                    <button className="font-[600] py-1 px-3 border border-solid border-gray-200 rounded-md">Remove</button>
                </div>
                        </div>
                    </div>
                ):(
                    loggedInUser ? (
                        <p className="text-gray-400 mt-5">You don't have any followers right now</p>
                    ):(
                        <p className="text-gray-400 mt-5">This user does not have a follower right now</p>
                    )
                )
            }
        </div>
    )
}

export default Followers