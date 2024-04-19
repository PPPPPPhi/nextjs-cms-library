import Editor from "@monaco-editor/react"
import { useRef, useState, useEffect } from "react"
import {
    useActionAuthorizationHook,
    ACTION_TYPE,
    VIEW_TYPE
} from "@nextjs-cms-library/role-management/index"
import { HiOutlineFaceFrown } from "react-icons/hi2"

interface AdminCodeEditorInterface {
    defaultValue: string
    onCodeChange: (v: string) => void
    mode: string
    width?: string
    authCode?: keyof ACTION_TYPE | keyof VIEW_TYPE
}

const NotAuthorizedFooterContainer: React.FC<{}> = ({}) => {
    return (
        <div className="d-flex flex-column w-100 h-100">
            <div
                className="d-flex w-100 s-section-secondary"
                style={{ minHeight: 70 }}></div>
            <div
                className="d-flex flex-column w-100 align-items-center justify-content-center space-y-2 s-section-primary"
                style={{ flex: 1 }}>
                <HiOutlineFaceFrown style={{ width: 50, height: 50 }} />
                <span className="text-level-body text-font-medium px-2 text-center">
                    Sorry, you are not authorized to edit the footer.
                </span>
            </div>
            <div
                className="d-flex w-100 s-section-secondary"
                style={{ minHeight: 70 }}></div>
        </div>
    )
}

export const AdminCodeEditor: React.FC<AdminCodeEditorInterface> = ({
    defaultValue,
    onCodeChange,
    mode,
    width = "50%",
    authCode
}) => {
    const [value, setValue] = useState(defaultValue)
    const { isAuthorized } = useActionAuthorizationHook(authCode)

    const editorRef: any = useRef()

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    if (!isAuthorized)
        return (
            <div className={`w-${width.substring(0, 2)}`}>
                <NotAuthorizedFooterContainer />
            </div>
        )

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
