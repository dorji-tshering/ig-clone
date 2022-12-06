import Modal from "./Modal";
import { searchModalState } from "../atoms/searchAtom";
import { useRecoilState } from "recoil";

const SearchModal = () => {
    const [searchModalOpen, setSearchModalOpen] = useRecoilState(searchModalState);

    return (
        <Modal
            open={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
        >
            <div>hello there</div>
        </Modal>
    )
}

export default SearchModal