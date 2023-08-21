import React from 'react'
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded'
import useHover from '../../../../../hooks/useHover'
import {useSetTogglePlaybackShuffleMutation} from '../../../../../utils/api/apiService'
import usePlaybackStore from '../../../../../stores/playback_state/usePlaybackStore'
import TooltipManager from '../../../../ui/tooltip/TooltipManager'
import './ShuffleButton.css'

const ShuffleButton = () => {

    const {playback} = usePlaybackStore()

    const [hoverRef, isHovered] = useHover()

    const setShuffleModeMutation = useSetTogglePlaybackShuffleMutation()

    return (
        <>
            <div id='shuffle-container' ref={hoverRef}
                 onClick={() => setShuffleModeMutation.mutate(!playback.shuffle_state)}>
                <ShuffleRoundedIcon fontSize='large'/>
            </div>

            {
                (isHovered) ? <TooltipManager content={
                    <span className='fs-sc-body-1 fw--semi-bold'>
                        {playback.shuffle_state ? 'Deactivate' : 'Activate'} shuffle
                    </span>
                }/> : null
            }
        </>
    )
}

export default ShuffleButton