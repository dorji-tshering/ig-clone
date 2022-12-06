import { atom } from 'recoil';

/**
 * State to show modal for profile image upload
 */
export const profileImageUploadState = atom({
    key: 'ProfileImageUploadState',
    default: false
});