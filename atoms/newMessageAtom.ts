import { atom } from 'recoil';

/**
 * State to show modal for new message for '/direct/*' route
 */
export const newMessageModalState = atom({
    key: 'NewMessageModalState',
    default: false
});