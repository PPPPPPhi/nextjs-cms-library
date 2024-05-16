import { useState, useEffect } from "react"
import { AdminTextInput } from "../input"
import { AdminButton } from "../core"
import { useParams } from "next/navigation"
import { useActionAuthorizationHook } from "@nextjs-cms-library/role-management/index"

interface AdminSiteSettingDisplayInterface {
    label: string
    value:
        | string
        | {
              [lang: string]: string
          }
        | string[]
    isEven: boolean
    settingKey: string
    updateHandler: (key: string, value: string, lang?: string) => void
    createNewLanguage: () => void
}

interface LanguageBadgeInterface {
    lang: string
}
const LanguageBadge: React.FC<LanguageBadgeInterface> = ({ lang }) => {
    return (
        <div
            className="d-flex align-items-center justify-content-center mx-2 px-3 s-section-secondary s-text-color-nu"
            style={{
                minWidth: 45,
                height: 27,
                borderRadius: 30,
                padding: "8px 12px"
            }}>
            <span>{lang}</span>
        </div>
    )
}

export const AdminSiteSettingDisplay: React.FC<
    AdminSiteSettingDisplayInterface
> = ({
    label,
    value,
    isEven,
    settingKey,
    updateHandler,
    createNewLanguage
}) => {
    const [isLangOption, setIsLangOption] = useState(false)
    const [isCMSLang, setIsCMSLang] = useState(false)

    const { isAuthorized } = useActionAuthorizationHook("EDIT_SITE_SETTING")

    const { version } = useParams()
    // @ts-ignore
    const isFromHistory = version === 0 || !!version
    useEffect(() => {
        if (settingKey === "cms_language") setIsCMSLang(true)
        else if (value) setIsLangOption(typeof value === "object")
    }, [settingKey, value])

    return (
        <div
            className={`d-flex w-100 py-2 px-4 ${
                isEven && "s-section-quinary"
            }`}>
            <div className="h-100 d-flex col-12 col-md-4">
                <span className="s-text-color-alpha">{label}</span>
            </div>
            <div className="h-100 d-flex flex-column col-12 col-md-8">
                {isCMSLang && (
                    <div className="d-flex flex-wrap align-items-center">
                        {(value as string[]).map((k, idx) => (
                            <LanguageBadge key={`lang_badge_${idx}`} lang={k} />
                        ))}
                        <div style={{ flex: 1 }} />

                        {!isFromHistory ? (
                            <AdminButton
                                onClick={() => {
                                    createNewLanguage()
                                }}
                                label="Create New Language"
                                authCode="CREATE_SITE_SETTING"
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                )}
                {isLangOption &&
                    !isCMSLang &&
                    Object.keys(value).map((l, idx) => (
                        <div
                            className="d-flex align-items-start py-2"
                            key={`setting_child_${idx}`}>
                            <LanguageBadge lang={l} />
                            <AdminTextInput
                                label={`${label} - ${l}`}
                                disabled={!isAuthorized}
                                onChange={(v) => {
                                    updateHandler(settingKey, v, l)
                                }}
                                defaultValue={
                                    (
                                        value as {
                                            [lang: string]: string
                                        }
                                    )[l]
                                }
                                readOnly={isFromHistory}
                            />
                        </div>
                    ))}
                {!isLangOption && !isCMSLang && (
                    <AdminTextInput
                        label={`${label}`}
                        disabled={!isAuthorized}
                        onChange={(v) => {
                            updateHandler(settingKey, v as string)
                        }}
                        defaultValue={value as string}
                        readOnly={isFromHistory}
                    />
                )}
            </div>
        </div>
    )
}
