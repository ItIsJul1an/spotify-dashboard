import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {Track} from '../../data/data_types'

export interface TracksStore {
    playingTrack: Track | undefined
    tracks: [Track]
    getTrackById: (id: string) => Track | undefined
    setPlayingTrack: (track: Track) => void
    setTracks: (tracks: [Track]) => void
}

const useTracksStore = create(
    persist<TracksStore>((set, get) => ({
            playingTrack: undefined,
            tracks: [{
                id: '',
                is_local: false,
                name: '',
                popularity: 0,
                duration_ms: 0,
                is_playing: false,
                type: '',
                uri: '',
                album: {
                    id: ''
                }
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
        }), {
            name: 'tracks-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useTracksStore