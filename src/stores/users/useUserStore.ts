import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {User} from "../../data/data_types";

export interface UserStore {
    users: User[]
    myProfile: User
    setUsers: (users: User[]) => void
    setMyProfile: (user: User) => void
}

const initialUserState: User = {
    country: '',
    display_name: '',
    email: '',
    explicit_content: {
        filter_enabled: false,
        filter_locked: false
    },
    external_urls: {
        spotify: ''
    },
    followers: {
        href: '',
        total: 0
    },
    href: '',
    id: '',
    images: [
        {
            url: '',
            height: 0,
            width: 0
        }
    ],
    product: '',
    type: '',
    uri: ''
}

const useUserStore = create(
    persist<UserStore>((set, get) => ({
            users: [{...initialUserState}],
            myProfile: {...initialUserState},
            setUsers: (users) => set(prev => ({
                users: prev.users = users
            })),
            setMyProfile: (user) => set(prev => ({
                myProfile: prev.myProfile = user
            }))
        }), {
            name: 'users-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useUserStore