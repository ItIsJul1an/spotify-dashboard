import React, {useState} from 'react'
import './FavArtistChip.css'
import {Artist} from "../../../../data/data_types";
import KebabMenuButton from "../../../form/menu/kebab_menu/KebabMenuButton";
import FollowButton from "../../../form/buttons/outlined/followButton/FollowButton";

interface FavArtistChipProps {
    artist: Artist
}

const FavArtistChip = ({artist}: FavArtistChipProps) => {

    const [mountDropdown, setMountDropdown] = useState<boolean>(false)

    return (
        <div id='fav-artist-chip-container'>
            <img id='artist-img' src={artist.images.length !== 0 ? artist.images[0].url : undefined} alt='Artist logo'
                 aria-label='Artist logo'/>
            <div>
                <h1>{artist.name}</h1>
                <span className='fs-sc-body-1 fw--semi-bold'>{artist.followers} followers</span>
            </div>
            <div>
                <KebabMenuButton size='16' dropdownContent={
                    <div>
                        <FollowButton artistUri={artist.id} onClickHandle={() => setMountDropdown(() => false)} style={{
                            backgroundColor: 'transparent',
                            color: 'hsl(0, 0%, 0%)',
                            border: '1px solid hsl(0, 0%, 0%)'
                        }}/>
                    </div>
                } tooltipContent={`Options for ${artist.name}`} mountDropdown={mountDropdown}
                                 setMountDropdown={setMountDropdown}/>
            </div>
        </div>
    )
}

export default FavArtistChip