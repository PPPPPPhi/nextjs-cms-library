"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import dynamic from "next/dynamic"

//@ts-ignore
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })

interface AdminRichTextInterface {
    onChange: (v: string) => void
    defaultValue: string
}

export const AdminRichText = ({
    onChange,
    defaultValue
}: AdminRichTextInterface) => {
    const editor = useRef(null)
    const [content, setContent] = useState("")

    useEffect(() => {
        if (!defaultValue) return

        setContent(defaultValue)
    }, [defaultValue])

    return (
        //@ts-ignore
        <JoditEditor
            //@ts-ignore
            ref={editor}
            value={content}
            config={{}}
            // tabIndex={1} // tabIndex of textarea
            // @ts-ignore
            onBlur={(newContent) => {
                // setContent(newContent)
                // onChange(newContent)
            }}
            // preferred to use only this option to update the content for performance reasons
            onChange={(newContent: any) => {
                onChange(newContent)
            }}
        />
    )
}
