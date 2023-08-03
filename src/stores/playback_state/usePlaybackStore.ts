import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {Playback} from '../../data/data_types'

export interface PlaybackStore {
    playback: Playback
    setPlayback: (playback: Playback) => void
}

const usePlaybackStore = create(
    persist<PlaybackStore>((set, get) => ({
            playback: {
                device: {
                    id: undefined,
                    is_active: false,
                    is_private_session: false,
                    is_restricted: false,
                    name: '',
                    type: '',
                    volume_percent: 0
                },
                repeat_state: '',
                shuffle_state: false,
                context: {
                    type: '',
                    href: '',
                    external_urls: {
                        spotify: ''
                    },
                    uri: ''
                },
                timestamp: 0,
                progress_ms: 0,
                is_playing: false
            },
            setPlayback: (playback) => set(prev => ({
                playback: prev.playback = playback
            })),
        }), {
            name: 'playback-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default usePlaybackStore