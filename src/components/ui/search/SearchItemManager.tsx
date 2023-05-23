import React from 'react'
import {Album, Artist} from '../../../data/data_types'
import SearchItem from './SearchItem'
import './SearchItemManager.css'

interface SearchItemManagerProps {
    data: any
}

const SearchItemManager = ({data}: SearchItemManagerProps) => {

    return (
        <div id='search-item--container'>
            <div>
                <div className='stick-to-head'>
                    <h1>Albums</h1>
                </div>
                {
                    data.albums.items.map((item: Album) => (
                        <SearchItem item={item}/>
                    ))
                }
            </div>

            <div>
                <div className='stick-to-head'>
                    <h1>Artists</h1>
                </div>
                {
                    data.artists.items.map((item: Artist) => (
                        <SearchItem item={item}/>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchItemManager