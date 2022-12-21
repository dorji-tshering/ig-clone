// user followers page
import Followers from '../../components/Followers';
import { useRouter } from 'next/router';


const FollowersPage = () => {
    const router = useRouter();

    return ( 
        <div className="pb-16 md:mt-5 md:w-fit md:mx-auto">
            <Followers onClose={() => router.back()} userId="userid"/>
        </div>
    )
}

export default FollowersPage