import React from 'react'
import {Album, Artist, Track} from '../../../data/data_types'
import spotify from '../../../data/images/spotify.svg'
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
                    (item as Album).uri.includes('album') ?
                        (item as Album).images.length !== 0 ?
                            <img src={(item as Album).images[0].url} alt='album image'/> :
                            <img src={spotify} alt='spotify logo'/> :
                        null
                }
                {
                    (item as Artist).uri.includes('artist') ?
                        (item as Artist).images.length !== 0 ?
                            <img src={(item as Artist).images[0].url} alt='album image'/> :
                            <img src={spotify} alt='spotify logo'/> :
                        null
                }
                <div>
                    {item.name}
                    <span>
                    {
                        (item as Album).uri.includes('album') ? (item as Album).artists.map(artist => artist.name).join(', ') : null
                    }
                </span>
                </div>
            </div>
        </div>
    )
}

export default SearchItem