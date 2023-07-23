import React, {ButtonHTMLAttributes, createElement, useEffect, useState} from 'react'
import './FavouriteButton.css'
import useHover from "../../../../../hooks/useHover";
import HeartBrokenRoundedIcon from "@mui/icons-material/HeartBrokenRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import TooltipManager from "../../../../ui/tooltip/TooltipManager"
import {
    useGetCheckFollowAlbumQuery,
    useGetCheckFollowPlaylistQuery,
    useGetCheckFollowTrackQuery,
    useRemoveAlbumMutation,
    useRemoveTrackMutation,
    useSaveAlbumMutation,
    useSaveTrackMutation
} from "../../../../../utils/api/apiService"

interface FavouriteButtonProps {
    itemId: string
    itemType: string
    displayContent?: 'text' | 'image'
    tooltip?: string
    onClickHandle?: Function
}

const FavouriteButton = ({
                             itemId,
                             itemType,
                             displayContent = 'text',
                             tooltip,
                             onClickHandle,
                             ...props
                         }: FavouriteButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {

    const [hoverRef, isHovered] = useHover()

    const [isFavourite, setFavourite] = useState<boolean>(false)

    const checkFollowAlbum = useGetCheckFollowAlbumQuery(itemType === 'album' ? itemId : undefined)
    const checkFollowPlaylist = useGetCheckFollowPlaylistQuery(itemType === 'playlist' ? itemId : undefined)
    const checkFollowTrack = useGetCheckFollowTrackQuery(itemType === 'track' ? itemId : undefined)

    const followAlbum = useSaveAlbumMutation()
    const followTrack = useSaveTrackMutation()
    const unfollowAlbum = useRemoveAlbumMutation()
    const unfollowTrack = useRemoveTrackMutation()

    const unfollowMutationMap: { [key: string]: any } = {
        'album': unfollowAlbum,
        'track': unfollowTrack,
    }

    const followMutationMap: { [key: string]: any } = {
        'album': followAlbum,
        'track': followTrack,
    }

    useEffect(() => {
        if (checkFollowAlbum.isSuccess) {
            setFavourite(() => checkFollowAlbum.data[0])
        }
    }, [checkFollowAlbum.data])

    useEffect(() => {
        if (checkFollowPlaylist.isSuccess) {
            setFavourite(() => checkFollowPlaylist.data[0])
        }
    }, [checkFollowPlaylist.data])

    useEffect(() => {
        if (checkFollowTrack.isSuccess) {
            setFavourite(() => checkFollowTrack.data[0])
        }
    }, [checkFollowTrack.data])

    useEffect(() => {
        if (followAlbum.isSuccess || followTrack.isSuccess) {
            setFavourite(() => true)
        }
    }, [followAlbum.data, followTrack.data])

    useEffect(() => {
        if (unfollowAlbum.isSuccess || unfollowTrack.isSuccess) {
            setFavourite(() => false)
        }
    }, [unfollowAlbum.data, unfollowTrack.data])

    const handleMutation = () => {
        if (itemId !== '') {
            const mutation = isFavourite ? unfollowMutationMap[itemType] : followMutationMap[itemType]
            mutation.mutate(itemId)
        }
    }

    const getDisplayValue = (): string => {
        return isFavourite ? `Remove favour ${itemType}` : `Favour ${itemType}`
    }

    return (
        <>
            <button id='favourite-button' ref={hoverRef} aria-label='Favourite button' {...props}
                    onClick={() => {
                        onClickHandle?.()
                        handleMutation()
                    }}>
                {displayContent === 'image' ? isFavourite ? createElement<any>(HeartBrokenRoundedIcon, {style: {fontSize: '24px'}})
                        : createElement<any>(FavoriteRoundedIcon, {style: {fontSize: '24px'}}) :
                    displayContent === 'text' ? getDisplayValue().toUpperCase() : null}
            </button>

            {
                (isHovered) ? <TooltipManager content={
                        <span className='fs-sc-body-1 fw--semi-bold'>
                    {tooltip ? tooltip : getDisplayValue()}
                    </span>
                    }/> :
                    null
            }
        </>
    )
}

export default FavouriteButton