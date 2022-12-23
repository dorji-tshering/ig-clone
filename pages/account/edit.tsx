import { FormEvent } from "react"
import { useSetRecoilState } from "recoil"
import { profileImageUploadState } from "../../atoms/profileImageUploadAtom"
import { MdKeyboardBackspace } from 'react-icons/md'
import { useRouter } from 'next/router'
import { CurrentSession } from "../../utils/types"
import { useSession } from 'next-auth/react'


const EditProfile = () => {
    const openModal = useSetRecoilState(profileImageUploadState)
    const router = useRouter()
    const session = useSession().data as CurrentSession

    const submitForm = async (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className="pb-24">
            {/* header in mobile view */}
            <section className='h-[60px] sticky top-[53px] -mt-5 md:hidden bg-white border-b px-5 mb-5'>
                <div className='float-left relative h-full flex items-center z-10'>
                    <button onClick={() => router.back()}><MdKeyboardBackspace size={24}/></button>
                </div>
                <div className='absolute inset-0 flex justify-center items-center'>
                    <h1 className='text-lg font-bold'>Edit Profile</h1>
                </div>
            </section>
            {/* edit form */}
            <form className="py-12 bg-white shadow-mainShadow rounded-bl-lg rounded-br-lg mx-3 md:max-w-[70%] md:mx-auto" onSubmit={(e) => submitForm(e)}>
                <div className='flex px-5 md:px-10 md:justify-center items-center mb-8'>
                    <aside className='md:basis-2/5 mr-4 md:mb-0 md:mr-10'>
                        <button onClick={() => openModal(true)} className='md:block md:ml-auto'>
                            <img 
                                src={session.user.image as string} 
                                alt="profile image"
                                className='h-12 w-12 rounded-full' />
                        </button>
                    </aside>
                    <div className='editDiv'>
                        <h1 className='font-[500] text-2xl'>{session.user.username}</h1>
                        <button onClick={() => openModal(true)} className='font-bold text-instaBlue'>Change profile photo</button>
                    </div>
                </div>
                <div className='editWrapper'>
                    <aside className='editAside'>
                        <label htmlFor="name">Name</label>
                    </aside>
                    <div className='editDiv'>
                        <input type="text" placeholder="Name" id="name" />
                        <p className='text-sm text-gray-500 mt-3'>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                    </div>
                </div>
                <div className='editWrapper'>
                    <aside className='editAside'>
                        <label htmlFor="username">Username</label>
                    </aside>
                    <div className='editDiv'>
                        <input type="text" placeholder="Username" id="username" />
                        <p className='text-sm text-gray-500 mt-3'>In most cases, you'll be able to change your username back to dorji_dev for another 14 days.</p>
                    </div>
                </div>
                <div className='editWrapper'>
                    <aside className='editAside'>
                        <label htmlFor="bio">Bio</label>
                    </aside>
                    <div className='editDiv'>
                        <textarea className='focus:border-instaBlue' placeholder="Bio" id="bio" cols={30} />
                    </div>
                </div>
                <div className='editWrapper'>
                    <aside className='editAside'></aside>
                    <div className='editDiv'>
                        <h1 className='text-lg font-bold text-gray-400 mt-3'>Personal information</h1>
                        <p className='text-sm text-gray-500'>Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.</p>
                    </div>
                </div>
                <div className='editWrapper'>
                    <aside className='editAside'>
                        <label htmlFor="email">Email</label>
                    </aside>
                    <div className='editDiv'>
                        <input type="email" placeholder="Email" id="email" />
                    </div>
                </div>
                <div className='editWrapper'>
                    <aside className='editAside'>
                        <label htmlFor="phoneNumber">Phone number</label>
                    </aside>
                    <div className='editDiv'>
                        <input type="text" placeholder="Phone number" id="phoneNumber" />
                    </div>
                </div>
                <div className='flex px-5 md:px-10'>
                    <aside className='editAside'></aside>
                    <div className='editDiv'>
                        <button className='px-5 py-2 bg-instaBlue text-white font-[600] rounded-md' type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfile