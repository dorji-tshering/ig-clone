import { atom } from 'recoil';

export const currentProfileState = atom({
    key: 'CurrentProfileState',
    default: false
});