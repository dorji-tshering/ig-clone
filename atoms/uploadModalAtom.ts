import { atom } from 'recoil';

/**
 * State to show upload modal for post
 */
export const uploadModalState = atom({
    key: 'UploadModalState',
    default: false
});