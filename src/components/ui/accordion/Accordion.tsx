import React, {useRef, useState} from 'react'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import './Accordion.css'

interface AccordionProps {
    header: string
    content: React.ReactNode
}

const Accordion = ({header, content}: AccordionProps) => {

    const panelRef = useRef<HTMLDivElement>(null)

    const [active, setActive] = useState<boolean>(false)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (panelRef.current) {
            if (panelRef.current.clientHeight === 0) {
                setActive(() => true)
                e.currentTarget.classList.add('active')
                panelRef.current.style.maxHeight = panelRef.current.scrollHeight + 'px'
            } else {
                setActive(() => false)
                panelRef.current.style.maxHeight = '0px'
                e.currentTarget.classList.remove('active')
            }
        }
    }

    return (
        <>
            <button id='accordion-btn' className='stick-to-head' onClick={handleClick}>
                <h1>{header}</h1>
                {
                    active ? <KeyboardArrowUpRoundedIcon/> : <KeyboardArrowDownRoundedIcon/>
                }
            </button>
            <div ref={panelRef} id='panel'>
                {
                    content
                }
            </div>
        </>
    )
}

export default Accordion
