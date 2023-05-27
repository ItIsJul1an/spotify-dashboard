import React from 'react'
import {intervalToDuration} from 'date-fns'
import {Album, Artist, Track} from '../../../data/data_types'
import spotify from '../../../data/images/spotify.svg'
import useRecentSearchStore from '../../../stores/search/recentSearchStore'
import './SearchItem.css'
import PlayButton from "../../form/buttons/filled/playButton/PlayButton";

interface SearchItemProps {
    item: Album | Artist | Track
}

const SearchItem = ({item}: SearchItemProps) => {

    const {addRecentSearch} = useRecentSearchStore()

    const trackTimeDuration = (item as Track).uri.includes('track') ? intervalToDuration({
        start: 0,
        end: (item as Track).duration_ms
    }) : null

    const onClickHandle = () => {
        addRecentSearch(item)
    }

    return (
        <div id='search-item' onClick={onClickHandle}>
            <div>
                {
                    (item as Album).uri.includes('album') ?
                        (item as Album).images.length !== 0 ?
                            <img src={(item as Album).images[0].url} alt='album'/> :
                            <img src={spotify} alt='spotify logo'/> :
                        null
                }
                {
                    (item as Artist).uri.includes('artist') ?
                        (item as Artist).images.length !== 0 ?
                            <img src={(item as Artist).images[0].url} alt='artist'/> :
                            <img src={spotify} alt='spotify logo'/> :
                        null
                }
                {
                    (item as Track).uri.includes('track') ?
                        <img src={(item as Track).album.images[0].url} alt='track'/> : null
                }
                <div>
                    {item.name}
                    <span>
                        {
                            (item as Album).uri.includes('album') ? new Date((item as Album).release_date).getFullYear() : null
                        }
                        {
                            (item as Album).uri.includes('album') ? ' • ' : null
                        }
                        {
                            (item as Album).uri.includes('album') ?
                                (item as Album).artists.map(artist => artist.name).join(', ')
                                : null
                        }
                        {
                            (item as Artist).uri.includes('artist') ? (item as Artist).followers.total.toLocaleString() + ' followers' : null
                        }
                        {
                            trackTimeDuration ? `${trackTimeDuration.minutes}:${trackTimeDuration.seconds}` : null
                        }
                    </span>
                </div>
            </div>
            <PlayButton trackUri={item.uri}
                        style={{backgroundColor: 'hsl(0, 0%, 0%)', color: 'hsl(0, 0%, 100%)'}}/>
        </div>
    )
}

export default SearchItem