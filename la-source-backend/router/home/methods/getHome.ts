import { home } from '../Home.ts'

export const getHome = ({ response }: {response: any}) => {
    response.body = home
}