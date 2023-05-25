import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import {webApiEndpoint} from '../../data/configs/webApi/webApiConfig'
import useUserSessionStore from '../../stores/user_session/userSessionStore'
import useTracksStore from "../../stores/tracks/useTrackStore";
import {useEffect} from "react";

export const useGetUserTrendingTracksQuery = (limit: number = 20) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['userTrendingTracks'], () =>
            axios.get(`${webApiEndpoint}/me/top/tracks?limit=${limit}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
                .then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== ''
        }
    )
}

export const useGetArtistQuery = (id: string | undefined) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['artists'], () =>
            axios.get(`${webApiEndpoint}/me/artists/${id}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
                .then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '' && id !== undefined
        }
    )
}

export const useGetAlbumQuery = (id: string | undefined) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['album'], () =>
        axios.get(`${webApiEndpoint}/albums/${id}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
            .then((res) => res.data), {
        enabled: accessToken !== undefined && accessToken !== '' && id !== undefined
    })
}

export const useGetUserDevicesQuery = () => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['userDevices'], () =>
            axios.get(`${webApiEndpoint}/me/player/devices`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
                .then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== ''
        }
    )
}

export const useGetFollowedArtistsQuery = () => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['followedArtists'], () =>
            axios.get(`${webApiEndpoint}/me/following?type=artist&limit=50`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
                .then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== ''
        }
    )
}

export const useGetCheckFollowArtistQuery = (artist: string) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['checkFollowArtist'], () =>
            axios.get(`${webApiEndpoint}/me/following/contains?type=artist&ids=${artist}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
                .then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== ''
        }
    )
}

export const useGetCheckFollowUserQuery = (user: string) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['checkFollowUser'], () =>
            axios.get(`${webApiEndpoint}/me/following/contains?type=user&ids=${user}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
                .then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== ''
        }
    )
}

export const useGetSearchQuery = (searchQuery: string = '') => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['search'], () =>
            axios.get(`${webApiEndpoint}/search?q=${searchQuery}&type=album%2Cplaylist%2Cartist%2Ctrack`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
                .then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '' && searchQuery !== '' && searchQuery !== ' '
        }
    )
}

export const useGetCurrentlyPlayingQuery = () => {
    const {accessToken} = useUserSessionStore()
    const {playingTrack} = useTracksStore()

    return useQuery(['currentlyPlayingTrack'], () =>
        axios.get(`${webApiEndpoint}/me/player/currently-playing`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
            .then((res) => res.data), {
        enabled: accessToken !== undefined && accessToken !== '',
        refetchInterval: playingTrack && playingTrack.playing_progress_ms ? playingTrack.duration_ms - playingTrack.playing_progress_ms + 400 : false
    })
}

export const usePlayTrackMutation = (device?: string) => {
    const {accessToken} = useUserSessionStore()
    const {playingTrack} = useTracksStore()
    const queryClient = useQueryClient()

    return useMutation((track: string) => {
        let data

        if (track.includes('track')) {
            data = {
                'uris': [track],
                'position_ms': playingTrack && playingTrack.playing_progress_ms ? playingTrack.playing_progress_ms : 0
            }
        } else {
            data = {
                'context_uri': track,
                'position_ms': playingTrack && playingTrack.playing_progress_ms ? playingTrack.playing_progress_ms : 0
            }
        }

        return axios.put(`${webApiEndpoint}/me/player/play?${device ? `device_id=${device}` : ''}`, data, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
    }, {
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries(['currentlyPlayingTrack'])
            }, 400)
        }
    })
}

export const usePauseTrackMutation = (device?: string) => {
    const {accessToken} = useUserSessionStore()
    const queryClient = useQueryClient()

    return useMutation((track: string) => {
        return axios.put(`${webApiEndpoint}/me/player/pause?${device ? `device_id=${device}` : ''}`, {
            'context_uri': track,
        }, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
    }, {
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries(['currentlyPlayingTrack'])
            }, 400)
        }
    })
}

export const useFollowArtistMutation = () => {
    const {accessToken} = useUserSessionStore()
    const queryClient = useQueryClient()

    return useMutation((artist: string) => {
        return axios.put(`${webApiEndpoint}/me/following?type=artist&ids=${artist}`, null, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
    }, {
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries(['followedArtists'])
                queryClient.invalidateQueries(['checkFollowArtist'])
            }, 400)
        }
    })
}

export const useUnfollowArtistMutation = () => {
    const {accessToken} = useUserSessionStore()
    const queryClient = useQueryClient()

    return useMutation((artist: string) => {
        return axios.delete(`${webApiEndpoint}/me/following?type=artist&ids=${artist}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
    }, {
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries(['followedArtists'])
                queryClient.invalidateQueries(['checkFollowArtist'])
            }, 400)
        }
    })
}