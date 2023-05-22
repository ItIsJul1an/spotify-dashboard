import React, {useEffect} from 'react'
import {getHashParams, removeHashParamsFromUrl} from '../../../utils/hashUtils'
import {getAuthorizeHref} from '../../../data/configs/oauth/oauthConfig'
import useUserSessionStore from '../../../stores/user_session/userSessionStore'
import SpotifyIcon from '../../../data/images/spotify.svg'
import './Login.css'

const Login = () => {

    const {
        loggedIn,
        setLoggedIn,
        setAccessToken,
        setTokenExpiryDate
    } = useUserSessionStore()

    useEffect(() => {
        const hashParams = getHashParams()
        const access_token = hashParams.access_token
        const expires_in = hashParams.expires_in
        removeHashParamsFromUrl()

        if (access_token) {
            setLoggedIn(true)
            setAccessToken(access_token)
            setTokenExpiryDate(new Date(expires_in))
        }
    }, [])

    return (
        <div>
            {
                !loggedIn &&
                <button id='login-btn' aria-label='Log in using OAuth 2.0' onClick={() => window.open(getAuthorizeHref(), '_self')}>
                    <img id='login-img' src={SpotifyIcon} alt='Spotify logo' aria-label='Spotify logo'/>
                    <span>Continue with Spotify</span>
                </button>
            }
        </div>
    )
}

export default Login