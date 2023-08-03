import React from 'react'
import useTracksStore from '../../../stores/tracks/useTrackStore'
import ProgressSlider from '../../form/progress_slider/ProgressSlider'
import PlayButton from '../../form/buttons/filled/playButton/PlayButton'
import PrevButton from '../../form/buttons/default/skipButton/prevButton/PrevButton'
import NextButton from '../../form/buttons/default/skipButton/nextButton/NextButton'
import FavouriteButton from '../../form/buttons/outlined/favouriteButton/FavouriteButton'
import SoundToggle from '../../form/sound/SoundToggle'
import './PlayerContainer.css'
import RepeatButton from "../../form/buttons/default/repeat_button/RepeatButton";
import ShuffleButton from "../../form/buttons/default/shuffle_button/ShuffleButton";

const PlayerContainer = () => {

    const {playingTrack} = useTracksStore()

    return (
        playingTrack ?
            <div id='player-container'>
                <div className='controls' style={{justifySelf: 'flex-start', gridArea: 'left'}}>
                    <FavouriteButton id='player-container--favourite' itemId={playingTrack.id}
                                     itemType={playingTrack.type} displayContent='image'/>
                    <FavouriteButton id='player-container--favourite' itemId={playingTrack.id}
                                     itemType={playingTrack.type} displayContent='image'/>
                    <FavouriteButton id='player-container--favourite' itemId={playingTrack.id}
                                     itemType={playingTrack.type} displayContent='image'/>
                </div>

                <div className='controls' style={{gridArea: 'middle'}}>
                    <RepeatButton/>
                    <PrevButton/>
                    <PlayButton id='player-container--play' trackUri={playingTrack.uri}
                                itemType={playingTrack.type}
                                displayContent='image'/>
                    <NextButton/>
                    <ShuffleButton/>
                </div>

                <div className='controls' style={{justifySelf: 'flex-end', gridArea: 'right'}}>
                    <SoundToggle/>
                </div>

                <div style={{alignSelf: 'center', gridArea: 'down'}}>
                    <ProgressSlider/>
                </div>
            </div>
            : null
    )
}

export default PlayerContainer