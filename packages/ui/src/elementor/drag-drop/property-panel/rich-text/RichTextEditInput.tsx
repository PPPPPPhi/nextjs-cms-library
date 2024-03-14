import { useRef } from "react"
import {
    // RichTextEditor,
    RichTextEditorComponent
} from "@syncfusion/ej2-react-richtexteditor"
import RichTextEditor, { EditorValue } from "react-rte"
import { addClass, removeClass, Browser } from "@syncfusion/ej2-base"
import { useDisplayPanelContext } from "../../DisplayPanelContext"
import { Control, Controller, UseFormSetValue } from "react-hook-form"
import { PropertiesComponentProps } from "@/utils/type/componentFormat"
import { PropertyJson } from "@/core/utils/type"

type RichTextEditInputProps = {
    id: string
    name: string
    label: string
    value: string
    control: Control<PropertyJson, any, PropertyJson>
    element: string
    isChildren?: boolean
    setValue?: UseFormSetValue<PropertiesComponentProps>
}

export const RichTextEditInput: React.FC<RichTextEditInputProps> = ({
    id,
    name,
    label,
    value,
    control,
    element,
    isChildren,
    setValue
}) => {
    const { focusEditId, setModal, setLoading } = useDisplayPanelContext()

    const rteObj = document.getElementById(`${id}-richtext`)

    const updateValue = (e: any) => {
        console.log(`[richtext] update `, e)
    }

    // function handleFullScreen(e: any) {
    //     const sbCntEle = document.querySelector(".sb-content.e-view")
    //     const sbHdrEle = document.querySelector(".sb-header.e-view")

    //     if (!sbCntEle || !sbHdrEle) return
    //     let leftBar
    //     let transformElement
    //     if (Browser.isDevice) {
    //         leftBar = document.querySelector("#right-sidebar")
    //         transformElement = document.querySelector(
    //             ".sample-browser.e-view.e-content-animation"
    //         )
    //     } else {
    //         leftBar = document.querySelector("#left-sidebar")
    //         transformElement = document.querySelector("#right-pane")
    //     }
    //     if (e.targetItem === "Maximize") {
    //         if (Browser.isDevice && Browser.isIos) {
    //             addClass([sbCntEle, sbHdrEle], ["hide-header"])
    //         }

    //         if (!leftBar || !transformElement) return
    //         addClass([leftBar], ["e-close"])
    //         removeClass([leftBar], ["e-open"])
    //         if (!Browser.isDevice) {
    //             // @ts-ignore
    //             transformElement.style.marginLeft = "0px"
    //         }
    //         // @ts-ignore
    //         transformElement.style.transform = "inherit"
    //     } else if (e.targetItem === "Minimize") {
    //         if (Browser.isDevice && Browser.isIos) {
    //             removeClass([sbCntEle, sbHdrEle], ["hide-header"])
    //         }

    //         if (!leftBar || !transformElement) return
    //         removeClass([leftBar], ["e-close"])
    //         if (!Browser.isDevice) {
    //             addClass([leftBar], ["e-open"])
    //             // @ts-ignore
    //             transformElement.style.marginLeft = leftBar.offsetWidth + "px"
    //         }
    //         // @ts-ignore
    //         transformElement.style.transform = "translateX(0px)"
    //     }
    // }

    // function actionCompleteHandler(e: any) {
    //     if (!rteObj) return
    //     if (
    //         e.targetItem &&
    //         (e.targetItem === "SourceCode" || e.targetItem === "Preview")
    //     ) {
    //         // @ts-ignore
    //         rteObj.sourceCodeModule.getPanel().style.display = "none"
    //         // mirrorConversion(e)
    //     } else {
    //         setTimeout(() => {
    //             // @ts-ignore
    //             rteObj.toolbarModule.refreshToolbarOverflow()
    //         }, 1000)
    //     }
    // }

    const onChangeValue = (richValue: EditorValue) => {
        console.log(
            `[richtext] onchange`,
            richValue,
            richValue.toString("markdown"),
            richValue.getEditorState().getCurrentContent()
        )
        // @ts-ignore
        if (setValue) {
            // setValue(name, richValue.toString("html"))
            // @ts-ignore

            setValue(richValue.toString("html"))
        }
        // this.setState(
        //     { richValue, htmlValue: richValue.toString("html") },
        //     () => {
        //         this.props.onChange(this.state.htmlValue)
        //     }
        // )
    }

    return (
        <div>
            {control && (
                <Controller
                    control={control}
                    // @ts-ignore
                    name={name}
                    render={({ field: { onChange, value } }) => {
                        return (
                            // <RichTextEditorComponent
                            //     id={`${id}-richtext`}
                            //     actionBegin={handleFullScreen.bind(this)}
                            //     actionComplete={actionCompleteHandler.bind(
                            //         this
                            //     )}>
                            //     <div
                            //         dangerouslySetInnerHTML={{
                            //             __html: value ?? ""
                            //         }}></div>
                            // </RichTextEditorComponent>
                            <RichTextEditor
                                value={RichTextEditor.createValueFromString(
                                    value?.toString("html"),
                                    "html"
                                )}
                                onChange={onChangeValue}
                            />
                        )
                    }}
                />
            )}
        </div>
    )
}
