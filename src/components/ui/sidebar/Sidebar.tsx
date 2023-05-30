import React from 'react'
import SidebarItemsManager from './SidebarItemsManager'
import spotify from  '../../../data/images/spotify.svg'
import './Sidebar.css'

const Sidebar = () => {

    return (
        <aside id='side-container'>
            <div id='side-content-container'>
                <div id='side-image-container'>
                    <img id='spotify-sidebar-logo' src={spotify} alt='spotify logo'/>
                    <div>
                        <h1 style={{color: 'hsl(127, 43%, 52%)'}}>Spotify</h1>
                        <h1>Dashboard</h1>
                    </div>
                </div>

                <nav className='side-content-nav'>
                    <SidebarItemsManager/>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar