import { useRouter } from 'next/router'

const NotFound = () => {
    const router = useRouter()

    return (
        <div className='h-full w-full flex flex-col items-center justify-center 
            overflow-y-auto bg-white px-5 pb-24 pt-16'>
            <h1 className='mb-16 bg-gray-700 px-7 py-3 rounded-full text-lg font-bold text-gray-100'>Page Not Found</h1>
            <div className='max-w-[400px] shadow-mainShadow rounded-lg p-10'>
                <img src="/images/notFound.svg" alt="Not found svg" />
            </div>
            <button className='py-5 mt-10 font-[600] hover:border-instaBlue hover:bg-instaBlue/10
                text-instaBlue border-y w-full max-w-[400px] transition-all duration-300' 
                    onClick={() => router.push('/')}>Back to home</button>
        </div>
    )
}

export default NotFound