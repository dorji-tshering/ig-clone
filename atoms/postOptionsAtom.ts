import { atom } from 'recoil';

/**
 * PostId state to control the post options shown to the user
 */
export const postOptionsModalState = atom<string | null>({
    key: 'PostOptionsModalState',
    default: null
    
});