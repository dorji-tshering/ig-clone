import Modal from "./Modal"
import { postOptionsModalState } from '../atoms/postOptionsAtom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { useRouter } from 'next/router'
import { onModalState } from '../atoms/onModalAtom'
import { noticeState } from "../atoms/noticeAtom"

const PostOptionsModal = () => {
    const [postId, setPostIdForOptions] = useRecoilState(postOptionsModalState);
    const onRoutedModal = useRecoilValue(onModalState);
    const router = useRouter();
    const myPost = false;
    const setNotice = useSetRecoilState(noticeState)

    const copyLink = () => {
        navigator.clipboard.writeText(
            window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + `/post/${postId}`)
        setNotice({
            show: true,
            message: 'Post link copied successfully'
        })
        setPostIdForOptions(null)
    }

    return (
        <Modal
            open={!!postId}
            onClose={() => setPostIdForOptions(null)}
        >
            <div className="flex flex-col">
                { 
                    !myPost && 
                    <button 
                        className="py-4 border-b font-bold text-red-600">
                        Report
                    </button>
                }
                {
                    (onRoutedModal || router.query.postId === undefined) &&
                    <button 
                        onClick={() => {
                            router.push(`/post/${postId}`, undefined, {scroll: false})
                            setPostIdForOptions(null)
                        }} 
                        className="py-4 border-b font-[500]">
                        Go to post
                    </button>
                }
                <button 
                    onClick={copyLink}
                    className="py-4 border-b font-[500]">Copy link</button>
                <button 
                    onClick={() => setPostIdForOptions(null)} 
                    className="py-4 font-[500]">Cancel</button>
            </div>
        </Modal>
    )
}

export default PostOptionsModal