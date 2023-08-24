import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {Track} from '../../data/data_types'

export interface TracksStore {
    playingTrack: Track | undefined
    tracks: Track[]
    getTrackById: (id: string) => Track | undefined
    setPlayingTrack: (track: Track) => void
    setTracks: (tracks: Track[]) => void
    setPlayingTrackProgress: (progress: number) => void
}

const useTracksStore = create(
    persist<TracksStore>((set, get) => ({
            playingTrack: undefined,
            tracks: [{
                added_at: '',
                id: '',
                is_local: false,
                name: '',
                popularity: 0,
                duration_ms: 0,
                is_playing: false,
                timestamp: 0,
                type: '',
                uri: '',
                album: {
                    id: '',
                    name: '',
                    images: [{height: 0, width: 0, url: ''}],
                    uri: ''
                },
                artists: [{external_urls: {spotify: ''}, id: '', uri: '', name: '', type: ''}]
            }],
            getTrackById: (id: string) => {
                return get().tracks.find(track => track.id === id)
            },
            setPlayingTrack: (track) => set(prev => ({
                playingTrack: prev.playingTrack = track
            })),
            setTracks: (tracks) => set(prev => ({
                tracks: prev.tracks = tracks
            })),
            setPlayingTrackProgress: (progress) => {
                const track = get().playingTrack

                if (track) {
                    set(prev => (
                        prev.playingTrack ? {
                            playingTrack: {...prev.playingTrack, playing_progress_ms: progress}
                        } : {}
                    ))
                }
            },
        }), {
            name: 'tracks-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useTracksStore