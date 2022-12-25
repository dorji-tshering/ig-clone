import { Session } from 'next-auth'

export type CurrentSession = {
    user: Session['user'] & {
        username: string
        id: string
        followers: string[]
        following: string[]
        savedPosts: string[]
    },
    expires: Session['expires']
}

export type Comment = {
    id: string
    text: string
    likes: string[]
    timeStamp: any
    postId: string
    userImage: string
    username: string
    userId: string
    parentColRef:string
    replies?: {
        id: string
        text: string
        likes: string[]
        timeStamp: any
        userImage: string
        username: string
        userId: string
        parentColRef:string
    }[]
}