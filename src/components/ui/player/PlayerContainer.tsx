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
import useMouseMove from "../../../hooks/useMouseMove";

const PlayerContainer = () => {

    const playerParentRef = useRef<HTMLDivElement>(null)
    const playerContainerRef = useRef<HTMLDivElement>(null)
    const fullSizeRef = useRef<HTMLDivElement>(null)
    const fullSizeImgRef = useRef<HTMLImageElement>(null)

    const isMouseMoving = useMouseMove(2_000)

    const {playingTrack} = useTracksStore()
    const {websiteState} = useWebsiteStateStore()

    const artists = playingTrack ? playingTrack.artists.map(artist => artist.name).join(', ') : undefined

    useEffect(() => {
        if (playerParentRef.current === null || playerContainerRef.current === null)
            return

        const refClassList: DOMTokenList = playerParentRef.current.classList

        if (websiteState.playerFullSize) {
            if (fullSizeRef.current === null || fullSizeImgRef.current === null)
                return

            refClassList.add('active--full-size--ref-container')
            playerParentRef.current.style.height = '100vh'
            playerParentRef.current.style.backgroundColor = 'var(--nl-clr-2)'

            playerContainerRef.current.style.backgroundColor = 'transparent'

            if (isMouseMoving) {
                playerContainerRef.current.style.opacity = '1'
                fullSizeRef.current.style.marginTop = '0'
                fullSizeImgRef.current.style.width = '420px'
            } else {
                playerContainerRef.current.style.opacity = '0'
                fullSizeRef.current.style.marginTop = '500px'
                fullSizeImgRef.current.style.width = '640px'
            }
        } else {
            refClassList.remove('active--full-size--ref-container')
            playerParentRef.current.style.height = '120px'
            playerParentRef.current.style.backgroundColor = 'unset'

            playerContainerRef.current.style.backgroundColor = 'var(--nl-clr-2)'
            playerContainerRef.current.style.opacity = '1'
        }
    }, [websiteState.playerFullSize, isMouseMoving])

    return (
        playingTrack ?
            <div id='player--parent-container' ref={playerParentRef}>
                {
                    websiteState.playerFullSize ?
                        <div id='full-size--information-container' ref={fullSizeRef}>
                            <img id='full-size--img' ref={fullSizeImgRef} src={playingTrack.album.images[0].url}
                                 alt='track cover'/>
                            <div>
                                <h1 style={{fontSize: '58px'}}>{playingTrack.name}</h1>
                                <h2 className='fs-pr-1 clr-sc-1 fw--semi-bold'>{artists}</h2>
                            </div>
                        </div>
                        : null
                }
                <div id='player-container' ref={playerContainerRef}>
                    <div className='controls' style={{justifySelf: 'flex-start', gridArea: 'left'}}>
                        <FavouriteButton id='player-container--favourite' itemId={playingTrack.id}
                                         itemType={playingTrack.type} displayContent='image'/>
                        <FullSizeButton/>
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