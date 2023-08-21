import React, {useEffect, useState, memo} from 'react'
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded'
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded'
import useHover from '../../../../../hooks/useHover'
import useWebsiteStateStore from '../../../../../stores/website/useWebsiteStateStore'
import TooltipManager from '../../../../ui/tooltip/TooltipManager'
import './FullSizeButton.css'

const FullSizeButton = () => {

    const {setPlayerFullSize} = useWebsiteStateStore()

    const [fullSizeContainerRef, isHovered] = useHover()

    const [fullSize, setFullSize] = useState<boolean>(false)

    useEffect(() => {
        toggleFullSize()
    }, [fullSize])

    const toggleFullSize = (): void => {
        setPlayerFullSize(fullSize)

        if (fullSizeContainerRef.current !== null) {
            fullSizeContainerRef.current.classList.toggle('active--full-size')
        }
    }

    return (
        <>
            <div ref={fullSizeContainerRef} id='full-size--container'
                 onClick={() => setFullSize(prevState => !prevState)}>
                {
                    fullSize ? <CloseFullscreenRoundedIcon/> : <OpenInFullRoundedIcon/>
                }
            </div>

            {
                (isHovered) ? <TooltipManager content={
                        <span className='fs-sc-body-1 fw--semi-bold'>{fullSize ? 'Deactivate' : 'Activate'} full-size</span>
                    }/> :
                    null
            }
        </>
    )
}

export default memo(FullSizeButton)