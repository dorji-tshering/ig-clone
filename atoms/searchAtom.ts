import { atom } from 'recoil';

/**
 * State to show the search modal component
 */
export const searchModalState = atom({
    key: 'SearchModalState',
    default: false
});