import { Session } from 'next-auth'

export type CurrentSession = {
    user: Session['user'] & {username: string, id: string},
    expires: Session['expires']
}