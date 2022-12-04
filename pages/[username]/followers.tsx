// user followers page
import Followers from '../../components/Followers';
import { useRouter } from 'next/router';


const FollowersPage = () => {
    const router = useRouter();

    return ( 
        <div className="pageContent border border-solid border-gray-200 rounded-lg
            mx-1 xs:max-w-[400px] xs:mx-auto text-center">
            <Followers onClose={() => router.back()} userID="userid"/>
        </div>
    )
}

export default FollowersPage