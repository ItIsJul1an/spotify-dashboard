import React, {ButtonHTMLAttributes, createElement, useEffect, useState} from 'react'
import './FollowButton.css'
import {
    useFollowArtistMutation,
    useGetCheckFollowArtistQuery,
    useUnfollowArtistMutation
} from '../../../../../utils/api/apiService'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import HeartBrokenRoundedIcon from '@mui/icons-material/HeartBrokenRounded'
import useHover from "../../../../../hooks/useHover";
import TooltipManager from "../../../../ui/tooltip/TooltipManager";

interface FollowButtonProps {
    artistUri: string
    displayContent?: 'text' | 'image'
    tooltip?: string
    onClickHandle?: Function
}

const FollowButton = ({
                          artistUri,
                          displayContent = 'text',
                          tooltip,
                          onClickHandle,
                          ...props
                      }: FollowButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {

    const [hoverRef, isHovered] = useHover()

    const [isFollowing, setFollowing] = useState<boolean>(false)

    const checkFollowArtist = useGetCheckFollowArtistQuery(artistUri)

    const followArtist = useFollowArtistMutation()
    const unfollowArtist = useUnfollowArtistMutation()

    useEffect(() => {
        if (checkFollowArtist.isSuccess) {
            setFollowing(() => checkFollowArtist.data[0])
        }
    }, [checkFollowArtist.data])

    useEffect(() => {
        if (followArtist.isSuccess) {
            setFollowing(() => true)
        }
    }, [followArtist.data])

    useEffect(() => {
        if (unfollowArtist.isSuccess) {
            setFollowing(() => false)
        }
    }, [unfollowArtist.data])

    return (
        <>
            <button id='follow-button' ref={hoverRef} aria-label='Follow button' {...props}
                    onClick={() => {
                        onClickHandle?.()
                        if (artistUri !== '' && artistUri !== undefined) {
                            isFollowing ? unfollowArtist.mutate(artistUri) : followArtist.mutate(artistUri)
                        }
                    }}>
                {displayContent === 'image' ? isFollowing ? createElement<any>(HeartBrokenRoundedIcon, {style: {fontSize: '24px'}})
                        : createElement<any>(FavoriteRoundedIcon, {style: {fontSize: '24px'}}) :
                    displayContent === 'text' ? isFollowing ? 'UNFOLLOW' : 'FOLLOW' : null}
            </button>

            {
                (isHovered) ? <TooltipManager content={
                    <span className='fs-sc-body-1 fw--semi-bold'>
                        {tooltip ? tooltip : isFollowing ? 'Unfollow artist' : 'Follow artist'}
                    </span>
                }/> : null
            }
        </>
    )
}

export default FollowButton