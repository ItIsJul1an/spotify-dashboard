import React from 'react'
import {SidebarItems} from '../../../data/sidebar/sidebarItems'
import SidebarListItem from './SidebarListItem'
import './SidebarItemsManager.css'

const SidebarItemsManager = () => {

    return (
        <ul id='sidebar-items-container'>
            {
                SidebarItems.map((group, index) => {
                    return <div key={`sidebar-group-item-${index}`} id='group-items-container'>
                        <h1 className='fs-tr-body-1 fw--semi-bold nv-clr--heading'>{group.name}</h1>
                        {
                            group.items.map((item, index) => (
                                <SidebarListItem key={`sidebar-item-${index}`}
                                                 value={{title: item.title, image: item.image, url: item.url}}/>
                            ))
                        }
                    </div>
                })
            }
        </ul>
    )
}

export default SidebarItemsManager