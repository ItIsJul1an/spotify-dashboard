export type Track = {
    id: string
    is_local: boolean
    name: string
    popularity: number
    duration_ms: number
    is_playing: boolean
    playing_progress_ms?: number
    type: string
    uri: string
    album: {
        id: string
    }
}