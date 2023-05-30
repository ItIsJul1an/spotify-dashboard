import React from 'react'
import Login from '../../components/form/login/Login'
import SpotifyIcon from '../../data/images/spotify.svg'
import './LandingPage.css'
import '../Layout.css'

const LandingPage = () => {

    return (
        <div id='landing-container'>
            <div>
                <div>
                    <h1 className='fs-pr-1'>Welcome back</h1>
                    <span className='fw--semi-bold'>Please login through OAuth 2.0.</span>
                </div>
                <Login/>
            </div>

            <div>
                <img id='landing-img' src={SpotifyIcon} alt='Spotify logo' aria-label='Spotify logo'/>
            </div>
        </div>
    )
}

export default LandingPage