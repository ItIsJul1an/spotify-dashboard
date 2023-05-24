import React from 'react'
import {Album, Artist, Track} from '../../../data/data_types'
import SearchItem from './SearchItem'
import './SearchItemManager.css'
import Accordion from "../accordion/Accordion";

interface SearchItemManagerProps {
    data: any
}

const SearchItemManager = ({data}: SearchItemManagerProps) => {

    return (
        <div id='search-item--container'>
            <div>
                <Accordion header='Albums' content={<>
                    {
                        data.albums.items.map((item: Album) => (
                            <SearchItem item={item}/>
                        ))
                    }
                </>}/>
            </div>

            <div>
                <Accordion header='Artists' content={<>
                    {
                        data.artists.items.map((item: Artist) => (
                            <SearchItem item={item}/>
                        ))
                    }
                </>}/>
            </div>

            <div>
                <Accordion header='Tracks' content={<>
                    {
                        data.tracks.items.map((item: Track) => (
                            <SearchItem item={item}/>
                        ))
                    }
                </>}/>
            </div>
        </div>
    )
}

export default SearchItemManager