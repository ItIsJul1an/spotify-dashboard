import React, {useState} from 'react'
import {createPortal} from 'react-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import './Search.css'
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import SearchBar from "../search_bar/SearchBar";

const Search = () => {

    const [renderResult, setRender] = useState<boolean>(false)

    const [outClickRef] = useOnClickOutside(() => renderResult ? setRender(() => false) : null)

    return (
        <>
            <button id='search' onClick={() => setRender(() => true)}>
                <SearchRoundedIcon/>
                <label className='fs-sc-body-1'>Search for artist, songs and ...</label>
            </button>

            {
                renderResult ? createPortal(
                    <div className='blocking-container'>
                        <div id='search-result-container' ref={outClickRef}>
                            <SearchBar/>
                        </div>
                    </div>,
                    document.querySelector('#layout-container')!,
                ) : null
            }
        </>
    )
}

export default Search