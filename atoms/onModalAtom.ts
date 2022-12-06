import { atom } from 'recoil';

/**
 * This state is used to check if a post uses modal routing 
 * to control the post options show to the user
 */
export const onModalState = atom({
    key: 'OnModalState',
    default: false
});