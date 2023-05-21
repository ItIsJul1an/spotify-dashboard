import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {Device} from '../../data/data_types'

export interface UserDevicesStore {
    activeDevice: Device | undefined
    devices: [Device]
    setActiveDevice: (device: Device) => void
    setDevices: (devices: [Device]) => void
}

const useUserDevicesStore = create(
    persist<UserDevicesStore>((set, get) => ({
            activeDevice: undefined,
            devices: [{
                id: '',
                name: '',
                type: '',
                is_active: false,
                is_private_session: false,
                is_restricted: false,
                volume_percent: 0
            }],
            setActiveDevice: (device) => set(prev => ({
                activeDevice: prev.activeDevice = device
            })),
            setDevices: (devices) => set(prev => ({
                devices: prev.devices = devices
            })),
        }), {
            name: 'user-devices-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useUserDevicesStore