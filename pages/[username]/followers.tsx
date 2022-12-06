// user followers page
import Followers from '../../components/Followers';
import { useRouter } from 'next/router';


const FollowersPage = () => {
    const router = useRouter();

    return ( 
        <div className="pageContent px-2">
            <div className="border border-solid rounded-lg mx-auto max-w-[400px] text-center">
                <Followers onClose={() => router.back()} userID="userid"/>
            </div>
        </div>
    )
}

export default FollowersPage