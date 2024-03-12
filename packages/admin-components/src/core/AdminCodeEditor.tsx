import Editor from "@monaco-editor/react"
import { useRef, useState, useEffect } from "react"

interface AdminCodeEditorInterface {
    defaultValue: string
    onCodeChange: (v: string) => void
    mode: string
    width?: string
}

export const AdminCodeEditor: React.FC<AdminCodeEditorInterface> = ({
    defaultValue,
    onCodeChange,
    mode,
    width = "50%"
}) => {
    const [value, setValue] = useState(defaultValue)

    const editorRef: any = useRef()

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    return (
        <Editor
            height="100%"
            width={width}
            theme="vs-dark"
            path="index.html"
            defaultLanguage={mode}
            defaultValue={defaultValue}
            value={value}
            onMount={(editor) => (editorRef.current = editor)}
            onChange={(value, event) => {
                onCodeChange(value as string)
            }}
        />
    )
}
