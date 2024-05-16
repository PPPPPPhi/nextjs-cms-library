"use client"

import { useState, useEffect } from "react"

export const AdminSVGIcon: React.FC<{
    svgName: string
    style?: React.CSSProperties
}> = ({ svgName, style }) => {
    const [Icon, setIcon] = useState()

    const getComp = async (iconText: string) => {
        //@ts-ignore

        if (!window.ReactIconFa6)
            //@ts-ignore

            window.ReactIconFa6 = await import("react-icons/fa6")

        //@ts-ignore
        const Component = () => window?.ReactIconFa6?.[iconText]
        setIcon(Component)
    }

    useEffect(() => {
        getComp(svgName)
    }, [svgName])

    //@ts-ignore
    return <>{Icon && <Icon style={{ width: 36, height: 36, ...style }} />}</>
}
