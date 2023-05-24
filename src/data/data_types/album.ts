export type Album = {
    id: string
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    images: { height: number; width: number; url: string }[]
    type: string
    uri: string
    artists: {
        name: string
        type: string
        uri: string
    }[]
}