import React from 'react'
import {Album, Artist, Playlist, Track} from '../../../data/data_types'
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
                        data.albums.items.map((item: Album, index: number) => (
                            <SearchItem key={`album-search-item-${index}`} item={item}/>
                        ))
                    }
                </>}/>
            </div>

            <div>
                <Accordion header='Artists' content={<>
                    {
                        data.artists.items.map((item: Artist, index: number) => (
                            <SearchItem key={`artist-search-item-${index}`} item={item}/>
                        ))
                    }
                </>}/>
            </div>

            <div>
                <Accordion header='Tracks' content={<>
                    {
                        data.tracks.items.map((item: Track, index: number) => (
                            <SearchItem key={`track-search-item-${index}`} item={item}/>
                        ))
                    }
                </>}/>
            </div>

            <div>
                <Accordion header='Playlists' content={<>
                    {
                        data.playlists.items.map((item: Playlist, index: number) => (
                            <SearchItem key={`playlist-search-item-${index}`} item={item}/>
                        ))
                    }
                </>}/>
            </div>
        </div>
    )
}

export default SearchItemManager