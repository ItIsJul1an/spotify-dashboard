import React, {useEffect, useRef} from 'react'
import useTracksStore from '../../../stores/tracks/useTrackStore'
import ProgressSlider from '../../form/progress_slider/ProgressSlider'
import PlayButton from '../../form/buttons/filled/playButton/PlayButton'
import PrevButton from '../../form/buttons/default/skipButton/prevButton/PrevButton'
import NextButton from '../../form/buttons/default/skipButton/nextButton/NextButton'
import FavouriteButton from '../../form/buttons/outlined/favouriteButton/FavouriteButton'
import SoundToggle from '../../form/sound/SoundToggle'
import RepeatButton from "../../form/buttons/default/repeat_button/RepeatButton";
import ShuffleButton from "../../form/buttons/default/shuffle_button/ShuffleButton";
import FullSizeButton from "../../form/buttons/outlined/full_size/FullSizeButton";
import './PlayerContainer.css'
import useWebsiteStateStore from "../../../stores/website/useWebsiteStateStore";

const PlayerContainer = () => {

    const playContainerRef = useRef<HTMLDivElement>(null)

    const {playingTrack} = useTracksStore()
    const {websiteState} = useWebsiteStateStore()

    useEffect(() => {
        if (playContainerRef.current === null)
            return

        const refClassList: DOMTokenList = playContainerRef.current.classList

        if (websiteState.playerFullSize) {
            refClassList.add('active--full-size--ref-container')
            playContainerRef.current.style.height = '100vh'
            playContainerRef.current.style.backgroundImage = `url(${playingTrack!.album.images[0].url})`
        } else {
            refClassList.remove('active--full-size--ref-container')
            playContainerRef.current.style.height = '120px'
            playContainerRef.current.style.backgroundImage = 'unset'
        }
    }, [websiteState.playerFullSize])

    return (
        playingTrack ?
            <div ref={playContainerRef}>
                <div id='player-container'>
                    <div className='controls' style={{justifySelf: 'flex-start', gridArea: 'left'}}>
                        <FavouriteButton id='player-container--favourite' itemId={playingTrack.id}
                                         itemType={playingTrack.type} displayContent='image'/>
                        <FullSizeButton/>
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
            </div>
            : null
    )
}

export default PlayerContainer