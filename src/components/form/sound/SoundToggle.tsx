import React, {ChangeEvent} from 'react'
import {toNumber} from 'lodash'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded'
import VolumeMuteRoundedIcon from '@mui/icons-material/VolumeMuteRounded'
import useDeviceStore from '../../../stores/devices/useDeviceStore'
import useHover from '../../../hooks/useHover'
import {useSetPlaybackVolumeMutation} from '../../../utils/api/apiService'
import TooltipManager from '../../ui/tooltip/TooltipManager'
import './SoundToggle.css'

const SoundToggle = () => {

    const {activeDevice} = useDeviceStore()

    const [volumeMuteRef, isMuteHovered] = useHover()
    const [volumeUpRef, isUpHovered] = useHover()
    const [volumeRef, isSliderHovered] = useHover()

    const setPlaybackVolumeMutation = useSetPlaybackVolumeMutation()

    const onProgressChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPlaybackVolumeMutation.mutate(toNumber(event.target.value))
    }

    const increaseVolume = (volume: number) => {
        if (activeDevice)
            setPlaybackVolumeMutation.mutate(activeDevice.volume_percent + volume)
    }

    const decreaseVolume = (volume: number) => {
        if (activeDevice)
            setPlaybackVolumeMutation.mutate(activeDevice.volume_percent - volume)
    }

    return (
        <>
            <div id='volume-container'>
                <div className='control' ref={volumeMuteRef} onClick={() => decreaseVolume(10)}>
                    <VolumeMuteRoundedIcon/>
                </div>

                <input id='volume-indicator' ref={volumeRef} type='range'
                       value={activeDevice ? activeDevice.volume_percent : 50}
                       max={100}
                       onChange={onProgressChange}/>

                <div className='control' ref={volumeUpRef} onClick={() => increaseVolume(10)}>
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

            {
                (isSliderHovered) ? <TooltipManager content={
                    <span className='fs-sc-body-1 fw--semi-bold'>
                        {activeDevice ? 'Current volume: ' + activeDevice.volume_percent : 'Cannot display volume'}
                    </span>
                }/> : null
            }
        </>
    )
}

export default SoundToggle