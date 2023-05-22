import React from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import Search from '../../form/search/Search'
import './Navbar.css'

const Navbar = () => {

    return (
        <nav id='navbar-container'>
            <div>
                <div className='nav-action md-menu'>
                    <ArrowBackRoundedIcon/>
                </div>

                <div className='nav-action md-menu'>
                    <ArrowForwardRoundedIcon/>
                </div>
            </div>

            <Search/>
        </nav>
    )
}

export default Navbar