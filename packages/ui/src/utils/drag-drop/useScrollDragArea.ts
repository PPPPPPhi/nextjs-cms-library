"use client"
import React, { useEffect, useState, useRef, RefObject } from "react"

export interface IUseScroll {
    position: number
    isScrollAllowed: boolean
    scrollTo?: string
}

const UPPER_BOUND_HEIGHT = 400
const LOWER_BOUND_HEIGHT = 400

function getScrollDirection({
    position,
    upperBounds = Infinity,
    lowerBounds = -Infinity
}: // scrollTo
{
    position: number | undefined
    upperBounds: number | undefined
    lowerBounds: number | undefined
    scrollTo: string | undefined
}): "top" | "bottom" | "stable" {
    if (position === undefined) {
        return "stable"
    }
    if (position > lowerBounds - LOWER_BOUND_HEIGHT) {
        return "bottom"
    }
    if (position < upperBounds + UPPER_BOUND_HEIGHT) {
        return "top"
    }
    return "stable"
}

export const useScrollDragArea = (ref: RefObject<HTMLElement | null>) => {
    const [config, setConfig] = useState<Partial<IUseScroll>>({
        position: 0,
        isScrollAllowed: true
    })

    const scrollTimer = useRef<null | NodeJS.Timeout>(null)

    const scrollSpeed = 3
    const { position, isScrollAllowed, scrollTo } = config

    const bounds = ref.current?.getBoundingClientRect()
    // console.log(`[scroll] scroll ??`, bounds)
    const direction = getScrollDirection({
        position,
        upperBounds: bounds?.top,
        lowerBounds: bounds?.bottom,
        scrollTo
    })

    useEffect(() => {
        if (direction !== "stable" && isScrollAllowed) {
            scrollTimer.current = setInterval(() => {
                ref.current?.scrollBy(
                    0,
                    scrollSpeed * (direction === "top" ? -1 : 1)
                )
            }, 1)
        }
        return () => {
            if (scrollTimer.current) {
                clearInterval(scrollTimer.current)
            }
        }
    }, [isScrollAllowed, direction, ref, scrollSpeed])

    return { updatePosition: setConfig } as const
}
