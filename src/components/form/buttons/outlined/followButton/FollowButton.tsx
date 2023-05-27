import React, {ButtonHTMLAttributes, useEffect, useState} from 'react'
import './FollowButton.css'
import {
    useFollowArtistMutation,
    useGetCheckFollowArtistQuery,
    useUnfollowArtistMutation
} from '../../../../../utils/api/apiService'

interface FollowButtonProps {
    artistUri: string
    onClickHandle?: Function
}

const FollowButton = ({
                          artistUri,
                          onClickHandle,
                          ...props
                      }: FollowButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {

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
        <button id='follow-button' aria-label='Follow button' {...props}
                onClick={() => {
                    onClickHandle?.()
                    if (artistUri !== '') {
                        isFollowing ? unfollowArtist.mutate(artistUri) : followArtist.mutate(artistUri)
                    }
                }}>
            {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
        </button>
    )
}

export default FollowButton