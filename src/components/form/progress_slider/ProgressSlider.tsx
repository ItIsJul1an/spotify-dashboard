import React, {ChangeEvent} from 'react'
import {toNumber} from 'lodash'
import {Duration, intervalToDuration} from 'date-fns'
import useTracksStore from '../../../stores/tracks/useTrackStore'
import {useSkipToPositionMutation} from '../../../utils/api/apiService'
import './ProgressSlider.css'

const ProgressSlider = () => {

const {playingTrack} = useTracksStore()

const skipToPositionMutation = useSkipToPositionMutation()

const progress: Duration | undefined = playingTrack && playingTrack.playing_progress_ms ? intervalToDuration({
    start: 0,
    end: playingTrack.playing_progress_ms
}) : undefined

const duration: Duration | undefined = playingTrack ? intervalToDuration({
    start: 0,
    end: playingTrack.duration_ms
}) : undefined

const onProgressChange = (event: ChangeEvent<HTMLInputElement>) => {
    skipToPositionMutation.mutate(toNumber(event.target.value))
}

return (
    playingTrack && progress && duration ?
        <div id='progress-container'>
            <span>{progress?.minutes}:{progress.seconds! < 10 ? '0' + progress.seconds! : progress?.seconds}</span>

            <input id='progress-indicator' type='range'
                   value={playingTrack.playing_progress_ms}
                   max={playingTrack.duration_ms}
                   onChange={onProgressChange}/>

            <span>{duration?.minutes}:{duration.seconds! < 10 ? '0' + duration.seconds! : duration?.seconds}</span>
        </div>
        : null
)
}

export default ProgressSlider