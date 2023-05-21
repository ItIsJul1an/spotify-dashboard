export type Album = {
    id: string
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    image_url: string
    type: string
    uri: string
    artists: [
        {
            name: string
            type: string
            uri: string
        }
    ]
}