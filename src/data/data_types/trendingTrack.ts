export type TrendingTrack = {
    items: [{
        album: { images: [{ url: string }] }
        artists: [{ id: string, name: string, type: string, uri: string }]
        name: string
        uri: string
        type: string
    }]
}