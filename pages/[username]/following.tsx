// user following page
import Following from '../../components/Following';
import { useRouter } from 'next/router';

const FollowingPage = () => {
    const router = useRouter();

    return (
        <div className="pageContent border border-solid border-gray-200 rounded-lg
            mx-1 xs:max-w-[400px] xs:mx-auto text-center">
            <Following onClose={() => router.back()} userID="userid"/>
        </div>
    )
}

export default FollowingPage