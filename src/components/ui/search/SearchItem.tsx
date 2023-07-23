import React from 'react'
import {intervalToDuration} from 'date-fns'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import spotify from '../../../data/images/spotify.svg'
import {Album, Artist, Playlist, Track} from '../../../data/data_types'
import PlayButton from '../../form/buttons/filled/playButton/PlayButton'
import useRecentSearchStore from '../../../stores/search/recentSearchStore'
import './SearchItem.css'
import FollowButton from "../../form/buttons/outlined/followButton/FollowButton"
import FavouriteButton from "../../form/buttons/outlined/favouriteButton/FavouriteButton"
import Tag from "../tag/Tag";

interface SearchItemProps {
    item: Album | Artist | Track | Playlist
}

const SearchItem = ({item}: SearchItemProps) => {

    const {addRecentSearch} = useRecentSearchStore()

    const album: Album | undefined = (item as Album).uri.includes('album') ? item as Album : undefined
    const playlist: Playlist | undefined = (item as Playlist).uri.includes('playlist') ? item as Playlist : undefined
    const artist: Artist | undefined = (item as Artist).uri.includes('artist') ? item as Artist : undefined
    const track: Track | undefined = (item as Track).uri.includes('track') ? item as Track : undefined

    const trackTimeDuration = track ? intervalToDuration({
        start: 0,
        end: (item as Track).duration_ms
    }) : undefined

    const onClickHandle = () => {
        addRecentSearch(item)
    }

    return (
        <div id='search-item'>
            <div>
                {
                    album ?
                        album.images.length !== 0 ?
                            <img src={album.images[0].url} alt='album'/> :
                            <img src={spotify} alt='spotify logo'/> :
                        null
                }
                {
                    artist ?
                        artist.images.length !== 0 ?
                            <img src={artist.images[0].url} alt='artist'/> :
                            <img src={spotify} alt='spotify logo'/> :
                        null
                }
                {
                    playlist ?
                        playlist.images.length !== 0 ?
                            <img src={playlist.images[0].url} alt='playlist'/> :
                            <img src={spotify} alt='spotify logo'/> :
                        null
                }
                {track ? <img src={track.album.images[0].url} alt='track'/> : null}
                <div>
                    <div id='heading-name' className='overflow-ellipsis'>
                        <h1 className='fw--semi-bold'>{item.name}</h1>
                    </div>

                    <div id='information-wrapper'>
                        {
                            album ?
                                <div>
                                    <CalendarMonthRoundedIcon fontSize='small'/>
                                    {new Date(album.release_date).getFullYear()}
                                </div> : null
                        }
                        {album ? <span>&nbsp;•&nbsp;</span> : null}
                        {
                            album ?
                                <div className='artists'>
                                    <PersonRoundedIcon fontSize='small'/>
                                    <span className='overflow-ellipsis'>
                                        {album.artists.map(artist => artist.name).join(', ')}
                                    </span>
                                </div> : null
                        }
                        {
                            artist ?
                                <div>
                                    <Diversity1RoundedIcon fontSize='small'/>
                                    {artist.followers.total.toLocaleString() + ' followers'}
                                </div> : null
                        }
                        {
                            track ?
                                <div className='artists'>
                                    <PersonRoundedIcon fontSize='small'/>
                                    <span className='overflow-ellipsis'>
                                        {track.artists.map(artist => artist.name).join(', ')}
                                    </span>
                                </div> : null
                        }
                        {track ? <span>&nbsp;•&nbsp;</span> : null}
                        {
                            trackTimeDuration ?
                                <div>
                                    <AccessTimeRoundedIcon fontSize='small'/>
                                    {`${trackTimeDuration.minutes}:${trackTimeDuration.seconds}`}
                                </div>
                                : null
                        }
                        {
                            playlist ?
                                <div className='artists'>
                                    <PersonRoundedIcon fontSize='small'/>
                                    <span className='overflow-ellipsis'>{playlist.owner.display_name}</span>
                                </div> : null
                        }
                    </div>
                </div>
            </div>
            {
                artist ?
                    <FollowButton id='search-follow' artistUri={artist.id}
                                  displayContent='image'
                                  onClickHandle={onClickHandle}/>
                    :
                    <div id='mutation-wrapper'>
                        <PlayButton id='search-play' trackUri={item.uri}
                                    itemType={item.type}
                                    displayContent='image'
                                    onClickHandle={onClickHandle}/>
                        <FavouriteButton id='search-favourite' itemId={item.id}
                                         itemType={item.type} displayContent='image'
                                         onClickHandle={onClickHandle}/>
                    </div>
            }

            <Tag className='tag-item' displayText={item.type.slice(0, 1).toUpperCase() + item.type.substring(1)}
                 style={{backgroundColor: 'hsl(0,0%,91%)', color: 'hsl(0, 0%, 50%)'}}/>
        </div>
    )
}

export default SearchItem