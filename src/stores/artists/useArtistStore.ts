import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {Artist} from '../../data/data_types'

export interface ArtistsStore {
    followedArtists: Artist[]
    getArtistById: (id: string) => Artist | undefined
    setFollowedArtists: (artists: Artist[]) => void
}

const useArtistsStore = create(
    persist<ArtistsStore>((set, get) => ({
            followedArtists: [{
                followers: {href: '', total: 0},
                genres: [''],
                id: '',
                images: [{height: 0, width: 0, url: ''}],
                name: '',
                popularity: 0,
                type: '',
                uri: ''
            }],
            getArtistById: (id: string) => {
                return get().followedArtists.find(artist => artist.id === id)
            },
            setFollowedArtists: (artists) => set(prev => ({
                followedArtists: prev.followedArtists = artists
            })),
        }), {
            name: 'artists-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useArtistsStore