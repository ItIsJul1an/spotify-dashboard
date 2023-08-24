import React, {memo, useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import Trending from '../../components/ui/trending_section/Trending'
import {
    useGetCurrentlyPlayingQuery,
    useGetFollowedArtistsQuery, useGetMyProfileQuery, useGetPlaybackStateQuery, useGetSavedTracksQuery,
    useGetUserDevicesQuery,
    useGetUserTrendingTracksQuery
} from '../../utils/api/apiService'
import {Artist, Track, TrendingTrack} from '../../data/data_types'
import useUserSessionStore from '../../stores/user_session/userSessionStore'
import useDeviceStore from '../../stores/devices/useDeviceStore'
import useArtistStore from '../../stores/artists/useArtistStore'
import useTracksStore from '../../stores/tracks/useTrackStore'
import 'react-toastify/dist/ReactToastify.css'
import '../Layout.css'
import useUserStore from "../../stores/users/useUserStore";
import PlayerContainer from "../../components/ui/player/PlayerContainer";
import usePlaybackStore from "../../stores/playback_state/usePlaybackStore";
import BasicTable from "../../components/ui/table/basic_table/BasicTable";

const Overview = () => {

    const {setDevices, setActiveDevice} = useDeviceStore()
    const {setFollowedArtists} = useArtistStore()
    const {setPlayingTrack, setTracks, tracks} = useTracksStore()
    const {setMyProfile} = useUserStore()
    const {setPlayback} = usePlaybackStore()

    const getUserTrendings = useGetUserTrendingTracksQuery(1)
    const getUserDevices = useGetUserDevicesQuery()
    const getFollowedArtists = useGetFollowedArtistsQuery()
    const getSavedTracks = useGetSavedTracksQuery()
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
        if (getSavedTracks.isSuccess) {
            const tracksTemp: Track[] = []

            getSavedTracks.data.items.forEach((entry: any) => {
                tracksTemp.push({
                    added_at: entry.added_at,
                    id: entry.track.id,
                    is_local: entry.track.is_local,
                    name: entry.track.name,
                    popularity: entry.track.popularity,
                    duration_ms: entry.track.duration_ms,
                    is_playing: entry.track.is_playing,
                    timestamp: entry.track.timestamp,
                    type: entry.track.type,
                    uri: entry.track.uri,
                    album: {
                        id: entry.track.album.id,
                        name: entry.track.album.name,
                        images: entry.track.album.images,
                        uri: entry.track.album.uri,
                    },
                    artists: entry.track.artists
                })
            })

            setTracks(tracksTemp)
            console.log(tracks)
        }
    }, [getSavedTracks.data])

    useEffect(() => {
        const data = getPlayingTrack.data

        if (getPlayingTrack.isSuccess && data.item !== undefined && data.item !== null) {
            setPlayingTrack({
                added_at: '',
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
                    name: data.item.album.name,
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
        <div id='layout-container'>
            <Trending trendingTracks={trendingTracks}/>

            <div style={{display: 'grid', gridGap: '20px'}}>
                <div>
                    <h1 className='fs-pr-1 fw'>My Playlist</h1>
                </div>
                <BasicTable/>
            </div>
        </div>
    )
}

export default memo(Overview)