import {
    useState,
    useRef,
    forwardRef,
    useEffect,
    useImperativeHandle
} from "react"
import { AdminSiteSettingDisplay } from "./AdminSiteSettingDisplay"
import {
    AdminCreateNewFieldSettingForm,
    AdminCreateLanguageForm,
    createNewFieldSettingFormType
} from "../form"
import * as _ from "lodash"

type propertyValueType =
    | {
          [s: string]: string
      }
    | string
    | string[]

export type propertyType = {
    [k: string]: {
        name: string
        value: propertyValueType
    }
}

interface AdminSiteSettingContainerInterface {
    settings: propertyType
    ref: any
    setModal: (modalContent: any) => void
}

export const AdminSiteSettingContainer: React.FC<AdminSiteSettingContainerInterface> =
    forwardRef(({ settings, setModal }, ref) => {
        const [settingEs, setSettingEs] = useState<propertyType>(settings)

        const langFormRef: any = useRef()
        const newFieldRef: any = useRef()

        useImperativeHandle(ref, () => ({
            createNewField: () => {
                createNewField()
            },
            getCurrentSettings: () => settingEs
        }))

        const updateHandler = (key: string, value: string, lang?: string) => {
            let newSettings = _.cloneDeep(settingEs)
            if (!lang && newSettings[key]) {
                ;(newSettings[key] as { value: string }).value = value
            } else if (lang) {
                ;(
                    newSettings[key] as {
                        value: {
                            [lang: string]: string
                        }
                    }
                ).value[lang] = value
            }

            setSettingEs(newSettings)
        }

        const updateLanguageHandler = () => {
            let newSettings = _.cloneDeep(settingEs)
            const langSetting = newSettings["cms_language"]

            const newLanguage = langFormRef.current
            if (newLanguage) {
                ;(langSetting?.value as string[]).push(newLanguage as string);

                Object.keys(newSettings).forEach((k, idx) => {
                    if (idx === 0 || typeof newSettings[k]?.value === "string")
                        return
                    else {
                        newSettings[k] = {
                            ...(newSettings[k] as {
                                name: string
                                value: propertyValueType
                            }),
                            value: {
                                ...(
                                    newSettings[k] as {
                                        value: {
                                            [s: string]: string
                                        }
                                    }
                                ).value,
                                [newLanguage]: ""
                            }
                        }
                    }
                })

                setSettingEs(newSettings)
            }
        }

        const createNewLanguage = () => {
            setModal({
                title: "Create New Language",
                content: (
                    <AdminCreateLanguageForm
                        onFormValueChange={(v) => {
                            langFormRef.current = v
                        }}
                    />
                ),
                confirmCTAText: "Confirm",
                confirmHandler: () => {
                    updateLanguageHandler()
                },
                cancelCTAText: "Cancel"
            })
        }

        const createNewFieldHandler = () => {
            let newSettings = _.cloneDeep(settingEs)
            const langSetting = settingEs["cms_language"]
            if (newFieldRef.current) {
                const newSiteOptions =
                    newFieldRef.current as createNewFieldSettingFormType

                let newValueWithLang: { [s: string]: string } | string = ""

                if (newSiteOptions.isLangMode) {
                    ;(langSetting?.value as string[]).forEach((k) => {
                        newValueWithLang = {
                            ...(newValueWithLang as { [s: string]: string }),
                            [k]: ""
                        }
                    })
                } else newValueWithLang = ""

                newSettings = {
                    ...newSettings,
                    [newSiteOptions.key]: {
                        name: newSiteOptions.name,
                        value: newValueWithLang
                    }
                }

                setSettingEs(newSettings)
            }
        }

        const createNewField = () => {
            setModal({
                title: "Create New Setting Field",
                content: (
                    <AdminCreateNewFieldSettingForm
                        onFormValueChange={(v) => {
                            newFieldRef.current = v
                        }}
                    />
                ),
                confirmCTAText: "Confirm",
                confirmHandler: () => {
                    createNewFieldHandler()
                },
                cancelCTAText: "Cancel"
            })
        }

        return (
            <div className="d-flex flex-column p-3 rounded-2 shadow overflow-y-auto">
                <div
                    className="d-flex w-100 p-2"
                    style={{ borderBottom: "1px solid black" }}>
                    <div className="col-12 col-md-4 px-2 text-font-bold">
                        Name
                    </div>
                    <div className="col-12 col-md-8 px-2 text-font-bold">
                        Value
                    </div>
                </div>
                {Object.keys(settingEs ?? {}).map((k, id) => (
                    <>
                        <AdminSiteSettingDisplay
                            settingKey={k}
                            label={settingEs[k]?.name as string}
                            value={settingEs[k]?.value as propertyValueType}
                            isEven={id % 2 === 0}
                            updateHandler={updateHandler}
                            createNewLanguage={createNewLanguage}
                        />
                    </>
                ))}
            </div>
        )
    })
