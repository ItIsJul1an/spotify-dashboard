import React from 'react'
import './PlayerContainer.css'
import ProgressSlider from '../../form/progress_slider/ProgressSlider'
import PlayButton from '../../form/buttons/filled/playButton/PlayButton'
import useTracksStore from '../../../stores/tracks/useTrackStore'
import PrevButton from "../../form/buttons/default/skipButton/prevButton/PrevButton";
import NextButton from "../../form/buttons/default/skipButton/nextButton/NextButton";
import FavouriteButton from "../../form/buttons/outlined/favouriteButton/FavouriteButton";
import SoundToggle from "../../form/sound/SoundToggle";

const PlayerContainer = () => {

    const {playingTrack} = useTracksStore()

    return (
        playingTrack ?
            <div id='player-container'>
                <div>
                    <FavouriteButton id='player-container--favourite' itemId={playingTrack.id}
                                     itemType={playingTrack.type} displayContent='image'/>

                    <div className='controls'>
                        <PrevButton/>
                        <PlayButton id='player-container--play' trackUri={playingTrack.uri}
                                    itemType={playingTrack.type}
                                    displayContent='image'/>
                        <NextButton/>
                    </div>

                    <div className='controls'>
                        <SoundToggle/>
                    </div>
                </div>

                <div>
                    <ProgressSlider/>
                </div>
            </div>
            : null
    )
}

export default PlayerContainer