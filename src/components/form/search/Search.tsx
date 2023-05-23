import React, {useState} from 'react'
import {createPortal} from 'react-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import SearchBar from '../search_bar/SearchBar'
import SearchItemManager from '../../ui/search/SearchItemManager'
import './Search.css'
import {Album} from "../../../data/data_types";
import SearchItem from "../../ui/search/SearchItem";
import useRecentSearchStore from "../../../stores/search/recentSearchStore";

const Search = () => {

    const {recentSearches, resetRecentSearch} = useRecentSearchStore()

    const [renderResult, setRender] = useState<boolean>(false)
    const [searchResult, setSearchResult] = useState<any>(undefined)

    const [outClickRef] = useOnClickOutside(() => renderResult ? setRender(() => false) : null)
    console.log(searchResult)

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
                            <SearchBar setSearchResult={setSearchResult}/>
                            {
                                searchResult ? <SearchItemManager data={searchResult}/> :
                                    <div id='recent-search-container'>
                                        <div className='stick-to-head'>
                                            <h1>Recent</h1>
                                            {
                                                recentSearches.length !== 0 ? <button id='clear-recent'
                                                                                      onClick={() => resetRecentSearch()}>Clear</button> : null
                                            }
                                        </div>
                                        {
                                            recentSearches.length !== 0 ? recentSearches.map((item: Album) => (
                                                <SearchItem item={item}/>
                                            )) : <span>No recent searches</span>
                                        }
                                    </div>
                            }
                        </div>
                    </div>,
                    document.querySelector('#layout-container')!,
                ) : null
            }
        </>
    )
}

export default Search