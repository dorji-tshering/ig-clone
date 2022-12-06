// modal routing component
import Modal from "./Modal";
import { useRouter } from 'next/router';
import Followers from "./Followers";
import Following from './Following';
import DetailedPost from './DetailedPost';
import { onModalState } from '../atoms/onModalAtom';
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

const RoutedModal = () => {
    const router = useRouter();
    const modalName = router.query.routeModalId as string;
    const followers = modalName === 'followers';
    const following = modalName === 'following';
    const post = modalName === 'post';
    const setOnModalState = useSetRecoilState(onModalState);

    // set onModal state to true
    useEffect(() => {
        setOnModalState(true);
    },[])

    return (
        <Modal
            open={!!router.query.routeModalId}
            onClose={() => {
                router.push(router.query.currentPageURL as string, undefined, {scroll: false})
                setOnModalState(false)
            }}
            bg={post ? 'bg-transparent':'bg-white'}
            overflowY={post ? false : true}>
            <>
                {
                    followers && (
                        <Followers 
                            onClose={() => router.push(router.query.currentPageURL as string, undefined, {scroll: false})}
                            userID="userId"
                            onModal={true}/>
                    )
                }
                {
                    following && (
                        <Following 
                            onClose={() => router.push(router.query.currentPageURL as string, undefined, {scroll: false})}
                            userID="userId"
                            onModal={true}/>
                    )
                }
                {
                    post && (
                        <DetailedPost 
                            postID="postId"
                            onModal={true}/>
                    )
                }
            </>
        </Modal>
    )
}

export default RoutedModal