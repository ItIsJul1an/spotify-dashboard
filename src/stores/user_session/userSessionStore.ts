import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export interface UserSessionStore {
    loggedIn: boolean
    accessToken: string | undefined
    tokenExpiryDate: Date | undefined
    setLoggedIn: (loggedIn: boolean) => void
    setAccessToken: (accessToken: string) => void
    setTokenExpiryDate: (tokenExpiryDate: Date) => void
}

const useUserSessionStore = create(
    persist<UserSessionStore>((set, get) => ({
            loggedIn: false,
            accessToken: undefined,
            tokenExpiryDate: undefined,
            setLoggedIn: (loggedIn) => set(prev => ({
                loggedIn: prev.loggedIn = loggedIn
            })),
            setAccessToken: (accessToken) => set(prev => ({
                accessToken: prev.accessToken = accessToken
            })),
            setTokenExpiryDate: (tokenExpiryDate) => set(prev => ({
                tokenExpiryDate: prev.tokenExpiryDate = tokenExpiryDate
            })),
        }), {
            name: 'user-session-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useUserSessionStore