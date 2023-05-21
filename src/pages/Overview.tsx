import React, {useEffect, useState} from 'react'
import Trending from '../components/ui/trending_section/Trending'
import {
    useGetFollowedArtistsQuery,
    useGetUserDevicesQuery,
    useGetUserTrendingTracksQuery
} from '../utils/api/apiService'
import {Artist, TrendingTrack} from '../data/data_types'
import useUserSessionStore from "../stores/user_session/userSessionStore"
import useDeviceStore from "../stores/devices/useDeviceStore"
import './Layout.css'
import useArtistStore from "../stores/artists/useArtistStore";

const Overview = () => {

    const {setDevices, setActiveDevice} = useDeviceStore()
    const {setFollowedArtists} = useArtistStore()

    const getUserTrendings = useGetUserTrendingTracksQuery(1)
    const getUserDevices = useGetUserDevicesQuery()
    const getFollowedArtists = useGetFollowedArtistsQuery()

    const [trendingTracks, setTrendingTracks] = useState<TrendingTrack>({
        items: [{
            album: {images: [{url: ''}]},
            artists: [{id: '', name: '', type: '', uri: ''}],
            name: '', uri: ''
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
            }
        }
    }, [getUserDevices.data])

    useEffect(() => {
        if (getFollowedArtists.isSuccess) {
            const artistsTemp: Artist[] = []

            getFollowedArtists.data.artists.items.forEach((entry: {
                id: string;
                name: string;
                followers: { total: number };
                images: { url: string }[];
                type: string;
                genres: string[];
                popularity: number;
                uri: string
            }) => {
                artistsTemp.push({
                    id: entry.id,
                    name: entry.name,
                    followers: entry.followers.total,
                    imageUrl: entry.images[0].url,
                    type: entry.type,
                    genres: entry.genres,
                    popularity: entry.popularity,
                    uri: entry.uri
                })
            })

            setFollowedArtists(artistsTemp)
        }
    }, [getFollowedArtists.data])

    return (
        <div id='layout-container'>
            <Trending trendingTracks={trendingTracks}/>
        </div>
    )
}

export default Overview