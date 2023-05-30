import React, {useEffect, useState} from 'react'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import SearchBar from "../search_bar/SearchBar";
import SearchItemManager from "../../ui/search/SearchItemManager";
import {Album} from "../../../data/data_types";
import SearchItem from "../../ui/search/SearchItem";
import useRecentSearchStore from "../../../stores/search/recentSearchStore";

interface SearchDialogProps {
    setRender: Function
}

const SearchDialog = ({setRender}: SearchDialogProps) => {

    const {recentSearches, resetRecentSearch} = useRecentSearchStore()

    const [searchResult, setSearchResult] = useState<any>(undefined)

    const [outClickRef] = useOnClickOutside(() => setRender(() => false))

    console.log(searchResult)

    /* Reset search every time the component rerender */
    useEffect(() => {
        setSearchResult(() => undefined)
    }, [])

    return (
        <div className='blocking-container'>
            <div id='search-result-container' ref={outClickRef}>
                <SearchBar setSearchResult={setSearchResult}/>
                {
                    searchResult ? <SearchItemManager data={searchResult}/> :
                        <div id='recent-search-container'>
                            <div className='stick-to-head'>
                                <h1>Recent Interaction</h1>
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
        </div>
    )
}

export default SearchDialog