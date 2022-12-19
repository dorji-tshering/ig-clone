import { atom } from 'recoil'

/**
 * State to show or hide error, success, and other notices
 */
export const noticeState = atom({
    key: 'NoticeState',
    default: {
        show: false, 
        message: 'sdfdfhdfg',
    }
})