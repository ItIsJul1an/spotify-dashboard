import React, {useState} from 'react'
import spotify from '../../../data/images/spotify.svg'
import useTracksStore from '../../../stores/tracks/useTrackStore'
import './PlayerCard.css'
import useHover from "../../../hooks/useHover";
import TooltipManager from "../tooltip/TooltipManager";

const PlayerCard = () => {

    const {playingTrack} = useTracksStore()

    const [tooltipContent, setTooltipContent] = useState<string>()
    const [hoverRef, isHovered] = useHover()

    const artists = playingTrack ? playingTrack.artists.map(artist => artist.name).join(', ') : undefined

    return (
        <div id='player'>
            {
                playingTrack ?
                    <>
                        <div id='player--image-wrapper'>
                            {
                                playingTrack.album.images.length !== 0 ?
                                    <img src={playingTrack.album.images[0].url} alt='album'/> :
                                    <img src={spotify} alt='spotify logo'/>
                            }
                        </div>

                        <div ref={hoverRef} id='player--text-wrapper'>
                            <div className='overflow-ellipsis' onMouseOver={() => setTooltipContent(playingTrack.name)}>
                                <h1>{playingTrack.name}</h1>
                            </div>
                            <div className='overflow-ellipsis' onMouseOver={() => setTooltipContent(artists)}>
                                <span>
                                {artists}
                            </span>
                            </div>
                        </div>
                    </>
                    :
                    <h1>Currently not playing</h1>
            }

            {
                (isHovered) ? <TooltipManager content={
                    <span className='fs-sc-body-1 fw--semi-bold'>
                        {tooltipContent}
                    </span>
                }/> : null
            }
        </div>
    )
}

export default PlayerCard