import { atom } from 'recoil'

/**
 * State to show modal switching accounts from the message/inbox page
 */
export const switchAccountState = atom({
    key: 'SwitchAccountState',
    default: false
});