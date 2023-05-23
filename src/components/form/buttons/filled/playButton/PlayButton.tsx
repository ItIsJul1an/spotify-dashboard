import React, {ButtonHTMLAttributes, useEffect, useState} from 'react'
import {
    useGetCurrentlyPlayingQuery,
    usePauseTrackMutation,
    usePlayTrackMutation
} from '../../../../../utils/api/apiService'
import useDeviceStore from '../../../../../stores/devices/useDeviceStore'
import './PlayButton.css'
import useTracksStore from "../../../../../stores/tracks/useTrackStore";
import {useQueryClient} from "@tanstack/react-query";

interface PlayButtonProps {
    trackUri: string
}

const PlayButton = ({trackUri, ...props}: PlayButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {

    const queryClient = useQueryClient()

    const {activeDevice} = useDeviceStore()
    const {playingTrack} = useTracksStore()

    const [isPlaying, setPlaying] = useState<boolean>(false)

    const playTrack = usePlayTrackMutation(activeDevice ? activeDevice.id : undefined)
    const pauseTrack = usePauseTrackMutation(activeDevice ? activeDevice.id : undefined)

    useEffect(() => {
        queryClient.refetchQueries(['currentlyPlayingTrack'])
    }, [])

    useEffect(() => {
        if (playingTrack) {
            if (playingTrack.uri === trackUri) {
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

    return (
        <button id='play-button' aria-label='Play button' {...props}
                onClick={() => isPlaying ? pauseTrack.mutate(trackUri) : playTrack.mutate(trackUri)}>
            {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>
    )
}

export default PlayButton