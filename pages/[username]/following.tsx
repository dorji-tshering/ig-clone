// user following page
import Following from '../../components/Following';
import { useRouter } from 'next/router';

const FollowingPage = () => {
    const router = useRouter();

    return (
        <div className="pageContent">
            <div className="border border-solid rounded-lg mx-auto max-w-[400px] text-center">
                <Following onClose={() => router.back()} userID="userid"/>
            </div>
        </div>
    )
}

export default FollowingPage