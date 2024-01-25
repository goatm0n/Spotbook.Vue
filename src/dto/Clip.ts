export interface ClipInterface {
    id: number,
    username: string
    textContent: string,
    user: number,
    profile_picture?: string,
    image?: string,
    likes?: number[],
    likesCount: number,
}