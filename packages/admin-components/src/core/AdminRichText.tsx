"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import dynamic from "next/dynamic"

//@ts-ignore
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })

interface AdminRichTextInterface {}

export const AdminRichText = ({}) => {
    const editor = useRef(null)
    const [content, setContent] = useState("")

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
            // onChange={(newContent) => {
            //     onChange(newContent)
            //     console.log("new content", newContent)
            // }}
        />
    )
}
