import React from 'react'
import './PlayerContainer.css'
import ProgressSlider from '../../form/progress_slider/ProgressSlider'
import PlayButton from '../../form/buttons/filled/playButton/PlayButton'
import useTracksStore from '../../../stores/tracks/useTrackStore'
import PrevButton from "../../form/buttons/default/skipButton/prevButton/PrevButton";
import NextButton from "../../form/buttons/default/skipButton/nextButton/NextButton";

const PlayerContainer = () => {

    const {playingTrack} = useTracksStore()

    const onClickHandle = () => {

    }

    return (
        playingTrack ?
            <div id='player-container'>
                <div id='controls'>
                    <PrevButton/>
                    <PlayButton id='player-container--play' trackUri={playingTrack.uri}
                                itemType={playingTrack.type}
                                displayContent='image'
                                onClickHandle={onClickHandle}/>
                    <NextButton/>
                </div>

                <div>
                    <ProgressSlider/>
                </div>
            </div>
            : null
    )
}

export default PlayerContainer