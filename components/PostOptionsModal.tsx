import Modal from "./Modal";
import { postOptionsModalState } from '../atoms/postOptionsAtom';
import { useRecoilState } from "recoil";
import { useRouter } from 'next/router';
import { onModalState } from '../atoms/onModalAtom';

const PostOptionsModal = () => {
    const [postId, setPostIdForOptions] = useRecoilState(postOptionsModalState);
    const [onModal, setOnModal] = useRecoilState(onModalState);
    const router = useRouter();
    const myPost = false;

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
                    (onModal || router.query.postId === undefined) &&
                    <button 
                        onClick={() => {
                            router.push(`/post/${postId}`, undefined, {scroll: false})
                            setPostIdForOptions(null)
                            onModal && setOnModal(false)
                        }} 
                        className="py-4 border-b font-[500]">
                        Go to post
                    </button>
                }
                <button 
                    onClick={() => navigator.clipboard.writeText(window.location.toString())}
                    className="py-4 border-b font-[500]">Copy link</button>
                <button 
                    onClick={() => setPostIdForOptions(null)} 
                    className="py-4 font-[500]">Cancel</button>
            </div>
        </Modal>
    )
}

export default PostOptionsModal