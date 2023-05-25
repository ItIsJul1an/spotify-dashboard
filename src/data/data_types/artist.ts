export type Artist = {
    followers: { href: string, total: number }
    genres: string[]
    id: string
    images: { height: number; width: number; url: string }[]
    name: string
    popularity: number
    type: string
    uri: string
}