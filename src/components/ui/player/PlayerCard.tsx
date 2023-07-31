import React, {useState} from 'react'
import spotify from '../../../data/images/spotify.svg'
import useTracksStore from '../../../stores/tracks/useTrackStore'
import './PlayerCard.css'
import useHover from "../../../hooks/useHover";
import TooltipManager from "../tooltip/TooltipManager";
import FollowButton from "../../form/buttons/outlined/followButton/FollowButton";

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

                        <div>
                            <div ref={hoverRef} id='player--text-wrapper'>
                                <div className='overflow-ellipsis'
                                     onMouseOver={() => setTooltipContent('🎵 ' + playingTrack.name)}>
                                    <h1>{playingTrack.name}</h1>
                                </div>
                                <div className='overflow-ellipsis'
                                     onMouseOver={() => setTooltipContent('👨‍🎤 ' + artists)}>
                                <span>
                                {artists}
                            </span>
                                </div>
                            </div>

                            {
                                playingTrack.artists.length === 1 && artists ?
                                    <FollowButton id='player-card-container--follow'
                                                  artistUri={playingTrack.artists[0].uri.split(':')[2]}
                                                  displayContent='image'/>
                                    : <h1>Only one artist can be followed at the same time</h1>
                            }
                        </div>
                    </>
                    :
                    <h1>Currently nothing playing</h1>
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