"use client"

import { useState, useEffect } from "react"

export const AdminSVGIcon: React.FC<{
    svgName: string
    style?: React.CSSProperties
}> = ({ svgName, style }) => {
    const [Icon, setIcon] = useState()

    const getComp = async (iconText: string) => {
        if (!window.ReactIcon)
            window.ReactIcon = await import("react-icons/fa6")

        const Component = () => window.ReactIcon[iconText]
        setIcon(Component)
    }

    useEffect(() => {
        getComp(svgName)
    }, [svgName])

    return <>{Icon && <Icon style={{ width: 36, height: 36, ...style }} />}</>
}
