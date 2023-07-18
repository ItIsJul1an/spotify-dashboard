import React from 'react'
import FavArtists from '../fav_artists_section/FavArtists'
import './Action.css'
import PlayerCard from "../player/PlayerCard";

const Action = () => {

    return (
        <div id='action-container'>
            <div className='action'>
                <h1 className='fs-sc-1'>Fav Artists</h1>
                <FavArtists/>
            </div>

            <PlayerCard/>
        </div>
    )
}

export default Action