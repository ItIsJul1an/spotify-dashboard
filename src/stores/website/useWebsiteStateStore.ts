import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {WebsiteState} from '../../data/data_types'

export interface WebsiteStateStore {
    websiteState: WebsiteState
    setWebsiteState: (websiteState: WebsiteState) => void
    setPlayerFullSize: (fullSize: boolean) => void
}

const useWebsiteStateStore = create(
    persist<WebsiteStateStore>((set, get) => ({
            websiteState: {
                playerFullSize: false
            },
            setWebsiteState: (websiteState) => set(prev => ({
                websiteState: prev.websiteState = websiteState
            })),
            setPlayerFullSize: (fullSize) => {
                set(prev => ({
                    websiteState: {...prev.websiteState, playerFullSize: fullSize}
                }))
            }
        }), {
            name: 'website-state-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useWebsiteStateStore