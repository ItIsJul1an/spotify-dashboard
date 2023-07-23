import React from 'react'
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded'
import {useSkipToPrevMutation} from '../../../../../../utils/api/apiService'
import useHover from '../../../../../../hooks/useHover'
import TooltipManager from '../../../../../ui/tooltip/TooltipManager'
import './PrevButton.css'

const PrevButton = () => {

    const [hoverRef, isHovered] = useHover()

    const skipToPrevTrackMutation = useSkipToPrevMutation()

    return (
        <>
            <div id='prev-container' ref={hoverRef} onClick={() => skipToPrevTrackMutation.mutate()}>
                <SkipPreviousRoundedIcon fontSize='large'/>
            </div>

            {
                (isHovered) ? <TooltipManager content={
                    <span className='fs-sc-body-1 fw--semi-bold'>Previous track</span>
                }/> : null
            }
        </>
    )
}

export default PrevButton