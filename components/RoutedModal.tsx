import Modal from "./Modal";
import { useRouter } from 'next/router';

const RoutedModal = () => {
    const router = useRouter();

    return (
        <Modal
            open={!!router.query.routeModalId}
            onClose={() => router.push(router.query.currentPageURL as string, undefined, {scroll: false})}>
                <div>{router.query.routeModalId as string}</div>
        </Modal>
    )
}

export default RoutedModal