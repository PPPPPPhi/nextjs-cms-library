"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import dynamic from "next/dynamic"
//@ts-ignore
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })

import "./editor.css"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

interface PropertyRichTextInterface {
    onChange: (html: string) => void
    defaultValue: string
}

export const PropertyRichText: React.FC<PropertyRichTextInterface> = ({
    onChange,
    defaultValue = ""
}) => {
    const editor = useRef(null)
    const [content, setContent] = useState("")

    const [isSettle, setIsSettle] = useState<boolean>(false)

    useEffect(() => {
        if (!isSettle && defaultValue) {
            setContent(defaultValue)
            setIsSettle(true)
        }
    }, [defaultValue])

    // const config = useMemo(
    //     {
    //         readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    //         placeholder: placeholder || "Start typings..."
    //     },
    //     [placeholder]
    // )

    return (
        //@ts-ignore
        <JoditEditor
            //@ts-ignore
            ref={editor}
            value={content}
            config={{}}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => {
                setContent(newContent)
                onChange(newContent)
            }}
            // preferred to use only this option to update the content for performance reasons
            // onChange={(newContent) => {
            //     onChange(newContent)
            //     console.log("new content", newContent)
            // }}
        />
    )
}
