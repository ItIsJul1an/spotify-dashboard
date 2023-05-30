import React, {HTMLAttributes} from 'react'
import './Tag.css'

interface TagProps {
    displayText: string
}

const Tag = ({displayText, ...props}: TagProps & HTMLAttributes<HTMLDivElement>) => {

    return (
        <div id='tag' {...props}>
            <b className='fw--semi-bold'>{displayText}</b>
        </div>
    )
}

export default Tag