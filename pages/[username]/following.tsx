// user following page
import Following from '../../components/Following';
import { useRouter } from 'next/router';

const FollowingPage = () => {
    const router = useRouter();

    return (
        <div className="pb-16 md:mt-5 md:w-fit md:mx-auto">
            <Following onClose={() => router.back()} userID="userid"/>
        </div>
    )
}

export default FollowingPage