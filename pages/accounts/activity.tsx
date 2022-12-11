import Notifications from "../../components/Notifications"
import { useRouter } from 'next/router'

const Activity = () => {
    const router = useRouter()

    return (
        <div className='pb-16 md:mt-5 md:w-fit md:mx-auto'>
            <Notifications onClose={() => router.back()}/>
        </div>
    )
}

export default Activity