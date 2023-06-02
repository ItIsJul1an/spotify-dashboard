export type Track = {
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
        images: { height: number; width: number; url: string }[]
        uri: string
    }
    artists: {
        id: string
        uri: string
        name: string
    }[]
}