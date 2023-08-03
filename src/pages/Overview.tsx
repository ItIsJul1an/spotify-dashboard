import React, {memo, useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import Trending from '../components/ui/trending_section/Trending'
import {
    useGetCurrentlyPlayingQuery,
    useGetFollowedArtistsQuery, useGetMyProfileQuery, useGetPlaybackStateQuery,
    useGetUserDevicesQuery,
    useGetUserTrendingTracksQuery
} from '../utils/api/apiService'
import {Artist, TrendingTrack} from '../data/data_types'
import useUserSessionStore from '../stores/user_session/userSessionStore'
import useDeviceStore from '../stores/devices/useDeviceStore'
import useArtistStore from '../stores/artists/useArtistStore'
import useTracksStore from '../stores/tracks/useTrackStore'
import 'react-toastify/dist/ReactToastify.css'
import './Layout.css'
import useUserStore from "../stores/users/useUserStore";
import PlayerContainer from "../components/ui/player/PlayerContainer";
import usePlaybackStore from "../stores/playback_state/usePlaybackStore";

const Overview = () => {

    const {setDevices, setActiveDevice} = useDeviceStore()
    const {setFollowedArtists} = useArtistStore()
    const {setPlayingTrack} = useTracksStore()
    const {setMyProfile} = useUserStore()
    const {setPlayback} = usePlaybackStore()

    const getUserTrendings = useGetUserTrendingTracksQuery(1)
    const getUserDevices = useGetUserDevicesQuery()
    const getFollowedArtists = useGetFollowedArtistsQuery()
    const getPlayingTrack = useGetCurrentlyPlayingQuery()
    const getMyProfile = useGetMyProfileQuery()
    const getPlaybackState = useGetPlaybackStateQuery()

    const [trendingTracks, setTrendingTracks] = useState<TrendingTrack>({
        items: [{
            album: {images: [{url: ''}]},
            artists: [{id: '', name: '', type: '', uri: ''}],
            name: '', uri: '', type: ''
        }]
    })

    console.log(useUserSessionStore().accessToken)

    useEffect(() => {
        if (getUserTrendings.isSuccess) {
            setTrendingTracks(getUserTrendings.data)
        }
    }, [getUserTrendings.data])

    useEffect(() => {
        const data = getUserDevices.data

        if (getUserDevices.isSuccess) {
            setDevices(data)

            if (data.devices.length !== 0) {
                setActiveDevice(data.devices[0])
            } else {
                toast.warn(<div>
                    <h1 className='fw--semi-bold'>No active Device</h1>
                    <div style={{display: 'grid', gridGap: '15px'}}>
                        <span>In order to be able to play music, at least one device must be active</span>
                        <a href='https://open.spotify.com/' target='_blank' rel='noreferrer noopener'>Open Spotify</a>
                    </div>
                </div>, {
                    draggable: false,
                    closeOnClick: false,
                    style: {cursor: 'default'}
                })
            }
        }
    }, [getUserDevices.data])

    useEffect(() => {
        if (getFollowedArtists.isSuccess) {
            const artistsTemp: Artist[] = []

            getFollowedArtists.data.artists.items.forEach((entry: {
                id: string;
                name: string;
                followers: { href: string, total: number };
                images: { height: number, width: number, url: string }[];
                type: string;
                genres: string[];
                popularity: number;
                uri: string
            }) => {
                artistsTemp.push({
                    id: entry.id,
                    name: entry.name,
                    followers: entry.followers,
                    images: entry.images,
                    type: entry.type,
                    genres: entry.genres,
                    popularity: entry.popularity,
                    uri: entry.uri
                })
            })

            setFollowedArtists(artistsTemp)
        }
    }, [getFollowedArtists.data])

    useEffect(() => {
        const data = getPlayingTrack.data

        if (getPlayingTrack.isSuccess && data.item !== undefined && data.item !== null) {
            setPlayingTrack({
                id: data.item.id,
                uri: data.item.uri,
                is_playing: data.is_playing,
                name: data.item.name,
                type: data.item.type,
                popularity: data.item.popularity,
                is_local: data.item.is_local,
                duration_ms: data.item.duration_ms,
                timestamp: data.timestamp,
                album: {
                    id: data.item.album.id,
                    images: data.item.album.images,
                    uri: data.item.album.uri
                },
                artists: data.item.artists,
                playing_progress_ms: data.progress_ms
            })
        }
    }, [getPlayingTrack.data])

    useEffect(() => {
        if (getMyProfile.isSuccess) {
            setMyProfile(getMyProfile.data)
        }
    }, [getMyProfile.data])

    useEffect(() => {
        if (getPlaybackState.isSuccess) {
            setPlayback(getPlaybackState.data)
        }
    }, [getPlaybackState.data])

    return (
        <div id='layout-container' style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <Trending trendingTracks={trendingTracks}/>

            <PlayerContainer/>
        </div>
    )
}

export default memo(Overview)