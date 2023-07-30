import React, {ChangeEvent} from 'react'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded'
import VolumeMuteRoundedIcon from '@mui/icons-material/VolumeMuteRounded'
import './SoundToggle.css'
import useHover from "../../../hooks/useHover";
import TooltipManager from "../../ui/tooltip/TooltipManager";

const SoundToggle = () => {

    const [volumeMuteRef, isMuteHovered] = useHover()
    const [volumeUpRef, isUpHovered] = useHover()

    const onProgressChange = (event: ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <>
            <div id='volume-container'>
                <div className='control' ref={volumeMuteRef}>
                    <VolumeMuteRoundedIcon/>
                </div>

                <input id='volume-indicator' type='range'
                       value={50}
                       max={100}
                       onChange={onProgressChange}/>

                <div className='control' ref={volumeUpRef}>
                    <VolumeUpRoundedIcon/>
                </div>
            </div>

            {
                (isMuteHovered) ? <TooltipManager content={
                    <span className='fs-sc-body-1 fw--semi-bold'>Volume Down</span>
                }/> : null
            }

            {
                (isUpHovered) ? <TooltipManager content={
                    <span className='fs-sc-body-1 fw--semi-bold'>Volume Up</span>
                }/> : null
            }
        </>
    )
}

export default SoundToggle