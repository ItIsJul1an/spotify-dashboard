import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {webApiEndpoint} from '../../data/configs/webApi/webApiConfig'
import useUserSessionStore from '../../stores/user_session/userSessionStore'
import useTracksStore from '../../stores/tracks/useTrackStore'
import useUserStore from "../../stores/users/useUserStore";

export const useGetMyProfileQuery = () => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['myProfile'], () =>
            axios.get(`${webApiEndpoint}/me`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '',
            onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
        }
    )
}

export const useGetUserTrendingTracksQuery = (limit: number = 20) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['userTrendingTracks'], () =>
            axios.get(`${webApiEndpoint}/me/top/tracks?limit=${limit}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '',
            onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
        }
    )
}

export const useGetArtistQuery = (id: string | undefined) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['artists', id], () =>
            axios.get(`${webApiEndpoint}/me/artists/${id}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '' && id !== undefined,
            onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
        }
    )
}

export const useGetAlbumQuery = (id: string | undefined) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['album', id], () =>
        axios.get(`${webApiEndpoint}/albums/${id}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then((res) => res.data), {
        enabled: accessToken !== undefined && accessToken !== '' && id !== undefined,
        onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
    })
}

export const useGetUserDevicesQuery = () => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['userDevices'], () =>
            axios.get(`${webApiEndpoint}/me/player/devices`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '',
            onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
        }
    )
}

export const useGetFollowedArtistsQuery = () => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['followedArtists'], () =>
            axios.get(`${webApiEndpoint}/me/following?type=artist&limit=50`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '',
            onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
        }
    )
}

export const useGetCheckFollowArtistQuery = (artist: string | undefined) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['checkFollowArtist', artist], () =>
            axios.get(`${webApiEndpoint}/me/following/contains?type=artist&ids=${artist}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '' && artist !== '',
            onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
        }
    )
}

export const useGetCheckFollowUserQuery = (user: string) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['checkFollowUser', user], () =>
            axios.get(`${webApiEndpoint}/me/following/contains?type=user&ids=${user}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '',
            onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
        }
    )
}

export const useGetCheckFollowPlaylistQuery = (playlistId: string | undefined, userId?: string) => {
    const {accessToken} = useUserSessionStore()
    const {myProfile} = useUserStore()

    return useQuery(['checkFollowPlaylist', playlistId], () =>
            axios.get(`${webApiEndpoint}/playlists/${playlistId}/followers/contains?ids=${userId ? userId : myProfile.id}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '' && playlistId !== undefined,
            onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
        }
    )
}

export const useGetCheckFollowAlbumQuery = (albumId: string | undefined) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['checkFollowAlbum', albumId], () =>
            axios.get(`${webApiEndpoint}/me/albums/contains?ids=${albumId}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '' && albumId !== undefined,
            onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
        }
    )
}

export const useGetCheckFollowTrackQuery = (trackId: string | undefined) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['checkFollowTrack', trackId], () =>
            axios.get(`${webApiEndpoint}/me/tracks/contains?ids=${trackId}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '' && trackId !== undefined,
            onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
        }
    )
}

export const useGetSearchQuery = (searchQuery: string = '') => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['search'], () =>
            axios.get(`${webApiEndpoint}/search?q=${searchQuery}&type=album%2Cplaylist%2Cartist%2Ctrack`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then((res) => res.data), {
            enabled: accessToken !== undefined && accessToken !== '' && searchQuery !== '' && searchQuery !== ' ',
            onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
        }
    )
}

export const useGetCurrentlyPlayingQuery = () => {
    const {accessToken} = useUserSessionStore()
    const {playingTrack} = useTracksStore()

    return useQuery(['currentlyPlayingTrack'], () =>
        axios.get(`${webApiEndpoint}/me/player/currently-playing`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then((res) => res.data), {
        enabled: accessToken !== undefined && accessToken !== '',
        refetchInterval: playingTrack && playingTrack.playing_progress_ms ? playingTrack.duration_ms - playingTrack.playing_progress_ms + 400 : false,
        onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
    })
}

export const useGetPlaylistItemsQuery = (playlistId: string | undefined) => {
    const {accessToken} = useUserSessionStore()

    return useQuery(['playlistItems'], () =>
        axios.get(`${webApiEndpoint}/playlists/${playlistId}/tracks`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then((res) => res.data), {
        enabled: accessToken !== undefined && accessToken !== '' && playlistId !== undefined,
        onError: (err) => toast.error('Something went wrong: ' + (err as AxiosError).message)
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
                'position_ms': playingTrack && playingTrack.playing_progress_ms && playingTrack.uri === track ? playingTrack.playing_progress_ms : 0
            }
        } else {
            data = {
                'context_uri': track,
                'position_ms': playingTrack && playingTrack.playing_progress_ms && playingTrack.uri === track ? playingTrack.playing_progress_ms : 0
            }
        }

        return axios.put(`${webApiEndpoint}/me/player/play?${device ? `device_id=${device}` : ''}`, data, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
    }, {
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries(['currentlyPlayingTrack'])
            }, 800)
        },
        onError: (err) => toast.error('Cannot play track: ' + (err as AxiosError).message)
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
            }, 800)
        },
        onError: (err) => toast.error('Cannot pause track: ' + (err as AxiosError).message)
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
            }, 400)
        },
        onError: (err) => toast.error('Cannot follow artist: ' + (err as AxiosError).message)
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
            }, 400)
        },
        onError: (err) => toast.error('Cannot unfollow artist: ' + (err as AxiosError).message)
    })
}

export const useSaveAlbumMutation = () => {
    const {accessToken} = useUserSessionStore()
    const queryClient = useQueryClient()

    return useMutation((albumId: string) => {
        return axios.put(`${webApiEndpoint}/me/albums?ids=${albumId}`, null, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
    }, {
        onSuccess: () => {
            setTimeout(() => {
                //queryClient.invalidateQueries(['followedArtists'])
            }, 400)
        },
        onError: (err) => toast.error('Cannot save album: ' + (err as AxiosError).message)
    })
}

export const useRemoveAlbumMutation = () => {
    const {accessToken} = useUserSessionStore()
    const queryClient = useQueryClient()

    return useMutation((albumId: string) => {
        return axios.delete(`${webApiEndpoint}/me/albums?ids=${albumId}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
    }, {
        onSuccess: () => {
            setTimeout(() => {
                //queryClient.invalidateQueries(['followedArtists'])
            }, 400)
        },
        onError: (err) => toast.error('Cannot remove album: ' + (err as AxiosError).message)
    })
}

export const useSaveTrackMutation = () => {
    const {accessToken} = useUserSessionStore()
    const queryClient = useQueryClient()

    return useMutation((albumId: string) => {
        return axios.put(`${webApiEndpoint}/me/tracks?ids=${albumId}`, null, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
    }, {
        onSuccess: () => {
            setTimeout(() => {
                //queryClient.invalidateQueries(['followedArtists'])
            }, 400)
        },
        onError: (err) => toast.error('Cannot save track: ' + (err as AxiosError).message)
    })
}

export const useRemoveTrackMutation = () => {
    const {accessToken} = useUserSessionStore()
    const queryClient = useQueryClient()

    return useMutation((albumId: string) => {
        return axios.delete(`${webApiEndpoint}/me/tracks?ids=${albumId}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
    }, {
        onSuccess: () => {
            setTimeout(() => {
                //queryClient.invalidateQueries(['followedArtists'])
            }, 400)
        },
        onError: (err) => toast.error('Cannot remove track: ' + (err as AxiosError).message)
    })
}