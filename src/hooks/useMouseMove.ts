import {useEffect, useState} from 'react'

const useMouseMove = (debounceTime: number = 1_000) => {

    const [isMouseMoving, setMouseMoving] = useState<boolean>(false)

    useEffect(() => {
        const updateMouseMove = (ev: MouseEvent) => {
            setMouseMoving(() => true)

            if (!isMouseMoving) {
                const timer = setTimeout(() => {
                    setMouseMoving(() => false)
                }, debounceTime)

                return () => clearTimeout(timer)
            }
        }

        window.addEventListener('mousemove', updateMouseMove)

        return () => {
            window.removeEventListener('mousemove', updateMouseMove)
        }
    }, [isMouseMoving])

    return isMouseMoving
}

export default useMouseMove