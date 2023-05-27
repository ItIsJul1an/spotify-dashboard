import React, {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {Album} from '../../../data/data_types'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import useRecentSearchStore from '../../../stores/search/recentSearchStore'
import SearchBar from '../search_bar/SearchBar'
import SearchItem from '../../ui/search/SearchItem'
import SearchItemManager from '../../ui/search/SearchItemManager'
import './Search.css'
import SearchDialog from "./SearchDialog";

const Search = () => {

    const [renderResult, setRender] = useState<boolean>(false)

    return (
        <>
            <button id='search' onClick={() => setRender(() => true)}>
                <SearchRoundedIcon/>
                <label className='fs-sc-body-1'>Search for artist, songs and ...</label>
            </button>

            {
                renderResult ? createPortal(
                    <SearchDialog setRender={setRender}/>,
                    document.querySelector('#layout-container')!,
                ) : null
            }
        </>
    )
}

export default Search