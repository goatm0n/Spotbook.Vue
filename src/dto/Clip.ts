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

export interface ClipDetail {
    user: number,
    spot: number,
    textContent: string,
    image: string | null,
    id: number,
    likes: number[],
    username: string,
    likesCount: number,
    profile_picture: string | null,
}

export interface ClipForm {
    spot: number,
    textContent?: string,
    image?: File,
}