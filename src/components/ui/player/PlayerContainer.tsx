import React from 'react'
import './PlayerContainer.css'
import useTracksStore from "../../../stores/tracks/useTrackStore"
import spotify from "../../../data/images/spotify.svg"
import PlayButton from "../../form/buttons/filled/playButton/PlayButton"

const PlayerContainer = () => {

    const {playingTrack} = useTracksStore()

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

                        <h1>{playingTrack.name}</h1>
                        <span>
                            {playingTrack.artists.map(artist => artist.name)
                                .join(', ')}
                        </span>

                        <progress id='progress-indicator' value={playingTrack.playing_progress_ms}
                                  max={playingTrack.duration_ms}/>

                        <PlayButton id='search-play' trackUri={playingTrack.uri}
                                    itemType={playingTrack.type}
                                    displayContent='image'/>
                    </>
                    :
                    <h1>Currently not playing</h1>
            }
        </div>
    )
}

export default PlayerContainer