import React from 'react'
import {Album, Artist, Track} from '../../../data/data_types'
import './SearchItem.css'
import useRecentSearchStore from "../../../stores/search/recentSearchStore";

interface SearchItemProps {
    item: Album | Artist | Track
}

const SearchItem = ({item}: SearchItemProps) => {

    const {addRecentSearch} = useRecentSearchStore()

    const onClickHandle = () => {
        addRecentSearch(item)
    }

    return (
        <div id='search-item' onClick={onClickHandle}>
            <div>
                {
                    item.name
                }
                <span>
                    {
                        (item as Album).uri.includes('album') ? (item as Album).artists.map(artist => artist.name).join(', ') : null
                    }
                </span>
            </div>
        </div>
    )
}

export default SearchItem