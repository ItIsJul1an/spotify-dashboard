import React from 'react'
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded'
import useHover from '../../../../../hooks/useHover'
import {useSetRepeatModeMutation} from '../../../../../utils/api/apiService'
import TooltipManager from '../../../../ui/tooltip/TooltipManager'
import './RepeatButton.css'

const RepeatButton = () => {

    const [hoverRef, isHovered] = useHover()

    const setRepeatModeMutation = useSetRepeatModeMutation()

    return (
        <>
            <div id='repeat-container' ref={hoverRef} onClick={() => setRepeatModeMutation.mutate('track')}>
                <RepeatRoundedIcon fontSize='medium'/>
            </div>

            {
                (isHovered) ? <TooltipManager content={
                    <span className='fs-sc-body-1 fw--semi-bold'>Activate repeat</span>
                }/> : null
            }
        </>
    )
}

export default RepeatButton