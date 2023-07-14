import React, {ButtonHTMLAttributes, createElement, useEffect, useState} from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import StopRoundedIcon from '@mui/icons-material/StopRounded'
import {
    useGetPlaylistItemsQuery,
    usePauseTrackMutation,
    usePlayTrackMutation
} from '../../../../../utils/api/apiService'
import useDeviceStore from '../../../../../stores/devices/useDeviceStore'
import useTracksStore from '../../../../../stores/tracks/useTrackStore'
import './PlayButton.css'
import TooltipManager from "../../../../ui/tooltip/TooltipManager";
import useHover from "../../../../../hooks/useHover";

interface PlayButtonProps {
    trackUri: string
    itemType: string
    displayContent?: 'text' | 'image'
    onClickHandle?: Function
}

const PlayButton = ({
                        trackUri,
                        itemType,
                        displayContent = 'text',
                        onClickHandle,
                        ...props
                    }: PlayButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {

    const [hoverRef, isHovered] = useHover()

    const {activeDevice} = useDeviceStore()
    const {playingTrack} = useTracksStore()

    const [isPlaying, setPlaying] = useState<boolean>(false)
    const [playlistItems, setPlaylistItems] = useState<{ track: { uri: string } }[]>([{track: {uri: ''}}])

    const playlistItemsQuery = useGetPlaylistItemsQuery(trackUri.includes('playlist') ? trackUri.split(':')[2] : undefined)

    const playTrack = usePlayTrackMutation(activeDevice ? activeDevice.id : undefined)
    const pauseTrack = usePauseTrackMutation(activeDevice ? activeDevice.id : undefined)

    useEffect(() => {
        if (playingTrack) {
            const isPlaying = playingTrack.is_playing
            const isTrackUriMatch =
                (trackUri.includes('album') && playingTrack.album.uri === trackUri) ||
                (trackUri.includes('artist') &&
                    playingTrack.artists.find(artist => artist.uri === trackUri) !== undefined) ||
                (trackUri.includes('playlist') && playlistItems.find((item) => item.track.uri === playingTrack.uri) !== undefined) ||
                playingTrack.uri === trackUri

            setPlaying(() => isPlaying && isTrackUriMatch)
        } else {
            setPlaying(() => false)
        }
    }, [trackUri, playingTrack, playlistItems])

    useEffect(() => {
        if (playlistItemsQuery.isSuccess) {
            setPlaylistItems(playlistItemsQuery.data.items)
        }
    }, [playlistItemsQuery.data])

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
        <>
            <button id='play-button' ref={hoverRef} aria-label='Play button' {...props}
                    onClick={() => {
                        onClickHandle?.()
                        isPlaying ? pauseTrack.mutate(trackUri) : playTrack.mutate(trackUri)
                    }}>
                {displayContent === 'image' ? isPlaying ? createElement<any>(StopRoundedIcon, {style: {fontSize: '24px'}})
                        : createElement<any>(PlayArrowRoundedIcon, {style: {fontSize: '24px'}}) :
                    displayContent === 'text' ? isPlaying ? 'PAUSE' : 'PLAY' : null}
            </button>

            {
                (isHovered) ? <TooltipManager content={
                    <span
                        className='fs-sc-body-1 fw--semi-bold'>{isPlaying ? `Pause ${itemType}` : `Play ${itemType}`}</span>
                }/> : null
            }
        </>
    )
}

export default PlayButton