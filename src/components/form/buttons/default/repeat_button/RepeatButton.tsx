import React from 'react'
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded'
import useHover from '../../../../../hooks/useHover'
import {useSetRepeatModeMutation} from '../../../../../utils/api/apiService'
import usePlaybackStore from '../../../../../stores/playback_state/usePlaybackStore'
import TooltipManager from '../../../../ui/tooltip/TooltipManager'
import './RepeatButton.css'

const RepeatButton = () => {

    const {playback} = usePlaybackStore()

    const [hoverRef, isHovered] = useHover()

    const setRepeatModeMutation = useSetRepeatModeMutation()

    return (
        <>
            <div id='repeat-container' ref={hoverRef} onClick={() => {
                if (playback.repeat_state === 'track') {
                    setRepeatModeMutation.mutate('off')
                } else {
                    setRepeatModeMutation.mutate('track')
                }
            }}>
                <RepeatRoundedIcon fontSize='large'/>
            </div>

            {
                (isHovered) ? <TooltipManager content={
                    <span className='fs-sc-body-1 fw--semi-bold'>
                        {playback.repeat_state === 'track' ? 'Deactivate' : 'Activate'} repeat
                    </span>
                }/> : null
            }
        </>
    )
}

export default RepeatButton