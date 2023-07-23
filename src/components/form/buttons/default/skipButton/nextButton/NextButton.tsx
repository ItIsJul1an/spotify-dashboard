import React from 'react'
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded'
import {useSkipToNextMutation} from '../../../../../../utils/api/apiService'
import useHover from '../../../../../../hooks/useHover'
import TooltipManager from '../../../../../ui/tooltip/TooltipManager'
import './NextButton.css'

const NextButton = () => {

    const [hoverRef, isHovered] = useHover()

    const skipToNextTrackMutation = useSkipToNextMutation()

    return (
        <>
            <div id='next-container' ref={hoverRef} onClick={() => skipToNextTrackMutation.mutate()}>
                <SkipNextRoundedIcon fontSize='large'/>
            </div>

            {
                (isHovered) ? <TooltipManager content={
                    <span className='fs-sc-body-1 fw--semi-bold'>Next track</span>
                }/> : null
            }
        </>
    )
}

export default NextButton