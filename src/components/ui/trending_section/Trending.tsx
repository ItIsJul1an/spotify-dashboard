import React from 'react'
import PlayButton from "../../form/buttons/filled/playButton/PlayButton"
import FollowButton from "../../form/buttons/outlined/followButton/FollowButton"
import {TrendingTrack} from "../../../data/data_types"
import './Trending.css'

interface TrendingProps {
    trendingTracks: TrendingTrack
}

const Trending = ({trendingTracks}: TrendingProps) => {

    return (
        <section id='trending-section'>
            <div>
                <h1 className='fs-pr-1 fw'>Trending</h1>
            </div>

            <div id='trending-player-container'
                 className={trendingTracks.items[0].uri === '' ? 'inactive-trending' : undefined}
                 style={{background: `linear-gradient(45deg, hsl(0, 0%, 100%) 30%, hsl(0, 0%, 100%, 20%)), url(${trendingTracks.items[0].album.images[0].url})`}}>
                {
                    trendingTracks.items[0].uri !== '' ?
                        <>
                            <span className='fw--semi-bold'>{trendingTracks.items[0].artists[0].name}</span>
                            <h1 className='fs-sc-1'>{trendingTracks.items[0].name}</h1>
                            <div>
                                <PlayButton trackUri={trendingTracks.items[0].uri}
                                            itemType={trendingTracks.items[0].type}
                                            style={{backgroundColor: 'hsl(0, 0%, 0%)', color: 'hsl(0, 0%, 100%)'}}/>
                                <FollowButton artistUri={trendingTracks.items[0].artists[0].id} style={{
                                    backgroundColor: 'transparent',
                                    color: 'hsl(0, 0%, 0%)',
                                    border: '1px solid hsl(0, 0%, 0%)'
                                }}/>
                            </div>
                        </>
                        : <h1 className='fs-sc-1'>Nothing to display</h1>
                }
            </div>
        </section>
    )
}

export default Trending