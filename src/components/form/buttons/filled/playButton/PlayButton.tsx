import React, {ButtonHTMLAttributes, useEffect, useState} from 'react'
import {
    useGetCurrentlyPlayingQuery,
    usePauseTrackMutation,
    usePlayTrackMutation
} from '../../../../../utils/api/apiService'
import useDeviceStore from '../../../../../stores/devices/useDeviceStore'
import './PlayButton.css'

interface PlayButtonProps {
    trackUri: string
}

const PlayButton = ({trackUri, ...props}: PlayButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {

    const {activeDevice} = useDeviceStore()

    const [isPlaying, setPlaying] = useState<boolean>(false)

    const currentlyPlaying = useGetCurrentlyPlayingQuery()

    const playTrack = usePlayTrackMutation(activeDevice ? activeDevice.id : undefined)
    const pauseTrack = usePauseTrackMutation(activeDevice ? activeDevice.id : undefined)

    useEffect(() => {
        if (currentlyPlaying.isSuccess && currentlyPlaying.data.item !== undefined) {
            if (currentlyPlaying.data.item.uri === trackUri) {
                if (currentlyPlaying.data.is_playing) {
                    setPlaying(() => true)
                } else {
                    setPlaying(() => false)
                }
            } else {
                setPlaying(() => false)
            }
        }
    }, [currentlyPlaying.data, trackUri])

    return (
        <button id='play-button' aria-label='Play button' {...props}
                onClick={() => isPlaying ? pauseTrack.mutate(trackUri) : playTrack.mutate(trackUri)}>
            {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>
    )
}

export default PlayButton