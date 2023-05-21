import React from 'react'
import Trending from '../components/ui/trending_section/Trending'

const Overview = () => {

    const getUserTrendings = useGetUserTrendingTracksQuery(1)
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
    return (
        <div id='layout-container'>
            <Trending trendingTracks={trendingTracks}/>
        </div>
    )
}

export default Overview