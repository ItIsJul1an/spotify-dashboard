import React, {useState} from 'react'
import './BasicTrackListDropdownContent.css'
import PlayButton from "../../buttons/filled/playButton/PlayButton";
import {Track} from "../../../../data/data_types";
import FavouriteButton from "../../buttons/outlined/favouriteButton/FavouriteButton";

interface BasicTrackTableDropdownContentProps {
    track: Track
    setMountDropdown: Function
}

const BasicTrackListDropdownContent = ({track, setMountDropdown}: BasicTrackTableDropdownContentProps) => {

    const PAGE_SIZE_ITEMS: number[] = [5, 10, 20, 30, 40, 50]

    /* User selected item, so change the list size */
    const handleChange = (cr: number): void => {
        //setClientPageSize(cr)
    }

    return (
        <ul id='dropdown-content' className='bc-tbl--ddn-cnt--cr'>
            <div id='action-wrapper'>
                <PlayButton id='search-play' trackUri={track.uri}
                            itemType={track.type}
                            displayContent='image' style={{height: '32px', width: '32px'}}/>

                <FavouriteButton id='search-favourite' itemId={track.id}
                                 itemType={track.type}
                                 displayContent='image' style={{height: '32px', width: '32px'}}/>
            </div>

            <hr/>

            <li>
                <button /*onClick={() => previousClientPage()}
                        disabled={!canPreviousClientPage()}*/>
                    <span>Previous Page</span>
                </button>
            </li>
            <li>
                <button /*onClick={() => nextClientPage()}
                        disabled={!canNextClientPage()}*/>
                    <span>Next Page</span>
                </button>
            </li>

            <hr/>

            {/*<div>
                <Dropdown prefix='Page Size' defaultValue={6} firstSelectedValue={clientPageSize}
                          items={PAGE_SIZE_ITEMS}
                          handleChange={handleChange}/>
            </div>*/}
        </ul>
    )
}

export default BasicTrackListDropdownContent