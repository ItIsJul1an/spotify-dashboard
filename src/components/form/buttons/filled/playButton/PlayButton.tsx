import React, {ButtonHTMLAttributes, useEffect, useState} from 'react'
import {
    usePauseTrackMutation,
    usePlayTrackMutation
} from '../../../../../utils/api/apiService'
import useDeviceStore from '../../../../../stores/devices/useDeviceStore'
import './PlayButton.css'
import useTracksStore from "../../../../../stores/tracks/useTrackStore";

interface PlayButtonProps {
    trackUri: string
}

const PlayButton = ({trackUri, ...props}: PlayButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {

    const {activeDevice} = useDeviceStore()
    const {playingTrack} = useTracksStore()

    const [isPlaying, setPlaying] = useState<boolean>(false)

    const playTrack = usePlayTrackMutation(activeDevice ? activeDevice.id : undefined)
    const pauseTrack = usePauseTrackMutation(activeDevice ? activeDevice.id : undefined)

    useEffect(() => {
        if (playingTrack) {
            if (trackUri.includes('album') && playingTrack.album.uri === trackUri) {
                if (playingTrack.is_playing) {
                    setPlaying(() => true)
                } else {
                    setPlaying(() => false)
                }
            } else if (playingTrack.uri === trackUri) {
                if (playingTrack.is_playing) {
                    setPlaying(() => true)
                } else {
                    setPlaying(() => false)
                }
            } else {
                setPlaying(() => false)
            }
        }
    }, [trackUri, playingTrack])

    useEffect(() => {
        if (playTrack.isSuccess) {
            setPlaying(() => true)
        }
    }, [playTrack.data])

    useEffect(() => {
        if (pauseTrack.isSuccess) {
            setPlaying(() => false)
        }
    }, [pauseTrack.data])

    return (
        <button id='play-button' aria-label='Play button' {...props}
                onClick={() => isPlaying ? pauseTrack.mutate(trackUri) : playTrack.mutate(trackUri)}>
            {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>
    )
}

export default PlayButton