import dynamic from "next/dynamic"
const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
)
import { EditorState, convertToRaw, ContentState } from "draft-js"
import { useState, useEffect } from "react"

import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import "./editor.css"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

interface RichTextEditorInterface {
    onChange: (html: string) => void
    defaultValue: string
}

export const RichTextEditor: React.FC<RichTextEditorInterface> = ({
    onChange,
    defaultValue = ""
}) => {
    const [editorState, setEditorState] = useState<any>()
    const [isSettle, setIsSettle] = useState<boolean>(false)

    useEffect(() => {
        if (!defaultValue) {
            setEditorState(EditorState.createEmpty())
        } else if (!isSettle) {
            const contentBlock = htmlToDraft(defaultValue)
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            )
            const editorState = EditorState.createWithContent(contentState)
            setEditorState(editorState)
            setIsSettle(true)
        }
    }, [defaultValue])

    return (
        <div className="s-text-color-alpha">
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(e: any) => {
                    setEditorState(e)
                    onChange(
                        draftToHtml(convertToRaw(e.getCurrentContent())) ?? ""
                    )
                }}
            />
        </div>
    )
}
