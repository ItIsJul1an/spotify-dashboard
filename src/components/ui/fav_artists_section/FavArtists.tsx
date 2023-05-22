import React from 'react'
import './FavArtists.css'
import useArtistStore from "../../../stores/artists/useArtistStore";
import FavArtistChip from "./fav_artist_chip/FavArtistChip";

const FavArtists = () => {

    const {followedArtists} = useArtistStore()

    return (
        <div id='fav-artists-container'>
            {
                followedArtists.slice(0, 5).map((artist, index) => (
                    <FavArtistChip key={`artist-chip-${index}`} artist={artist}/>
                ))
            }
        </div>
    )
}

export default FavArtists