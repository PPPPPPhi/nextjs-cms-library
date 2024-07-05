"use client"

import { useState, useEffect } from "react"

export type WindowSizes = {
    width: number
    height: number
}

const WINDOW_SIZE = {
    small: 576,
    medium: 768,
    large: 991,
    xLarge: 1200,
    xxLarge: 1400
}

const { medium, large, xLarge } = WINDOW_SIZE

export const useWindowSize = (): WindowSizes => {
    const [windowSize, setWindowSize] = useState({
        width: 1920,
        height: 1080
    })
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])
    return windowSize
}

export const useIsMobile = (): boolean => {
    const size = useWindowSize()
    return size.width < medium
}
