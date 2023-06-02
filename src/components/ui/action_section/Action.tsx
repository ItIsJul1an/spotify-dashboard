import React from 'react'
import FavArtists from '../fav_artists_section/FavArtists'
import './Action.css'
import PlayerContainer from "../player/PlayerContainer";

const Action = () => {

    return (
        <div id='action-container'>
            <div>
                <h1 className='fs-sc-1'>Shortcuts</h1>
                <span>Comming soon</span>
            </div>

            <div className='action'>
                <h1 className='fs-sc-1'>Fav Artists</h1>
                <FavArtists/>
            </div>

            <PlayerContainer/>
        </div>
    )
}

export default Action