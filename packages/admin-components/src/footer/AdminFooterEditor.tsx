import { AdminButton, AdminCodeEditor } from "../core"
import { useEffect, useState } from "react"
import useFooterGenerator from "../hook/useFooterGenerator"
import { AdminTabMenu } from "../menu"

const FOOTER_TAB_MENU = ["html", "css", "script"]
const EDITOR_WIDTH_PERCENTAGE = ["25%", "50%", "75%"]

interface AdminFooterEditorInterface {
    properties: footerPropertiesType
    saveFooter: (p: footerPropertiesType) => void
}

export type footerPropertiesType = {
    footerHtml: string | null
    footerCss: string | null
    footerScript: string | null
}

export const AdminFooterEditor: React.FC<AdminFooterEditorInterface> = ({
    properties,
    saveFooter
}) => {
    const [footer, setFooter] = useState<string>()
    const [mode, setMode] = useState("html")

    const [editorWidth, setEditorWidth] = useState<string>("50%")

    const [defaultValue, setDefaultValue] = useState<footerPropertiesType>()
    const [value, setValue] = useState<footerPropertiesType>()
    const { footerHtml, footerCss, footerScript } = value ?? {}
    const template = useFooterGenerator(
        footerHtml ?? "",
        footerCss ?? "",
        footerScript ?? ""
    )

    const setFooterValue = (
        type: keyof footerPropertiesType,
        value: string
    ) => {
        setValue((prevState) => ({
            ...(prevState as footerPropertiesType),
            [type]: value
        }))
    }

    useEffect(() => {
        if (properties) {
            setDefaultValue(properties)
            setValue(properties)
        }
    }, [properties])

    useEffect(() => {
        if(value) setDefaultValue(value)
    }, [mode])

    useEffect(() => {
        setFooter(template)
    }, [template])

    return (
        <div className="d-flex flex-column w-100 h-100">
            <div className="d-flex w-100 py-2">
                <AdminTabMenu
                    tabList={["html", "css", "script"]}
                    callback={(tab) => {
                        console.log(
                            "FOOTER_TAB_MENU[tab]",
                            FOOTER_TAB_MENU[tab]
                        )
                        setMode(FOOTER_TAB_MENU[tab] as string)
                    }}
                />
            </div>
            <div
                className="d-flex w-100 p-2 s-section-secondary rounded-3 space-x-2"
                style={{ flex: 1 }}>
                {mode === "html" && (
                    <AdminCodeEditor
                        mode="html"
                        width={editorWidth}
                        defaultValue={
                            defaultValue?.footerHtml ??
                            "<!-- You may update your html code here -->"
                        }
                        onCodeChange={(v) => setFooterValue("footerHtml", v)}
                    />
                )}
                {mode === "css" && (
                    <AdminCodeEditor
                        mode="css"
                        width={editorWidth}
                        defaultValue={
                            defaultValue?.footerCss ??
                            "/* You may update your css here */"
                        }
                        onCodeChange={(v) => setFooterValue("footerCss", v)}
                    />
                )}
                {mode === "script" && (
                    <AdminCodeEditor
                        mode="javascript"
                        width={editorWidth}
                        defaultValue={
                            defaultValue?.footerScript ??
                            "// You may update your css here"
                        }
                        onCodeChange={(v) => setFooterValue("footerScript", v)}
                    />
                )}
                <iframe
                    srcDoc={footer}
                    title="NextJs CMS Footer"
                    style={{ flex: 1, background: "white" }}
                />
            </div>
            <div className="d-flex w-100 s-section-primary align-item-center">
                <div className="d-flex p-2 space-x-3 w-100">
                    <AdminTabMenu
                        tabList={EDITOR_WIDTH_PERCENTAGE}
                        callback={(tab) => {
                            setEditorWidth(
                                EDITOR_WIDTH_PERCENTAGE[tab] as string
                            )
                        }}
                        defaultTab={1}
                    />
                    <div style={{ flex: 1 }} />
                    <AdminButton
                        label="Save"
                        style={{ width: 300 }}
                        onClick={() => {
                            saveFooter(value as footerPropertiesType)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
