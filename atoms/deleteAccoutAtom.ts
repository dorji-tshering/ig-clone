import { atom } from 'recoil';

/**
 * State to show modal for new message for '/direct/*' route
 */
export const deleteAccountState = atom({
    key: 'DeleteAccountState',
    default: false
});