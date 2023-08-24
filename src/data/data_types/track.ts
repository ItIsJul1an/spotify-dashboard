export type Track = {
    added_at: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    duration_ms: number
    is_playing: boolean
    timestamp: number
    playing_progress_ms?: number
    type: string
    uri: string
    album: {
        id: string
        name: string
        images: { height: number; width: number; url: string }[]
        uri: string
    }
    artists: {
        external_urls: {
            spotify: string
        }
        id: string
        uri: string
        name: string
        type: string
    }[]
}