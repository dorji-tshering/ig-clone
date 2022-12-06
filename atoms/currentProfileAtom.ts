import { atom } from 'recoil';

/**
 * Check if the user profile page belongs to the current user
 */
export const currentProfileState = atom({
    key: 'CurrentProfileState',
    default: false
});