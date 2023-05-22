import React, {ButtonHTMLAttributes, useEffect, useState} from 'react'
import {
    useGetCurrentlyPlayingQuery,
    usePauseTrackMutation,
    usePlayTrackMutation
} from '../../../../../utils/api/apiService'
import './PlayButton.css'
import useDeviceStore from "../../../../../stores/devices/useDeviceStore";
import useTracksStore from "../../../../../stores/tracks/useTrackStore";

interface PlayButtonProps {
    trackUri: string
}

const PlayButton = ({trackUri, ...props}: PlayButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {

    const {activeDevice} = useDeviceStore()
    const {setPlayingTrack} = useTracksStore()

    const [isPlaying, setPlaying] = useState<boolean>(false)

    const currentlyPlaying = useGetCurrentlyPlayingQuery()

    const playTrack = usePlayTrackMutation(activeDevice ? activeDevice.id : undefined)
    const pauseTrack = usePauseTrackMutation(activeDevice ? activeDevice.id : undefined)

    useEffect(() => {
        if (currentlyPlaying.isSuccess && currentlyPlaying.data.item !== undefined) {
            const data = currentlyPlaying.data
            if (data.item.uri === trackUri) {
                setPlayingTrack({
                    id: data.item.id,
                    uri: data.item.uri,
                    is_playing: data.is_playing,
                    name: data.item.name,
                    type: data.item.type,
                    popularity: data.item.popularity,
                    is_local: data.item.is_local,
                    duration_ms: data.item.duration_ms,
                    album: {
                        id: data.item.album.id
                    },
                    playing_progress_ms: data.progress_ms
                })
                if (data.is_playing) {
                    setPlaying(() => true)
                } else {
                    setPlaying(() => false)
                }
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