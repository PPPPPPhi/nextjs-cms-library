import { AdminActionButton, AdminButton } from "../core"
import { AdminTextInput } from "../input"
import { NextImageApdator } from "@nextjs-cms-library/ui/index"
import { AdminImageGalleryModal } from "../image"
import { useState, useEffect } from "react"
import { AdminCard } from "../core"
import { useRouter } from "next/navigation"
import { AdminTabMenu } from "../menu"

const HEADER_RESOURCE_LIST = ["Web Resource", "Choose From Image Gallery"]
interface AdminHeaderInterface {
    header: {
        headerLargeLogo: string
        headerSmallLogo: string
        headerSmallRatio: string
        headerLargeRatio: string
    }
    saveHeader: (p: headerPropertiesType) => void
    setModal: (modal: any) => void
    setLoading: (l: boolean) => void
}

export type headerPropertiesType = {
    headerLargeLogo: string
    headerSmallLogo: string
    headerLargeRatio: string
    headerSmallRatio: string
}

const DEFAULT_IMAGE_PLACEHOLDER = `${process.env.NEXT_ASSEST_PATH}/image_placeholder.webp`

interface LogoPreviewerInterface {
    ratioW: number
    ratioH: number
    ratioLabel: string
    darkMode: boolean
    setHeaderOption: (option: string) => void
    option: string
    radioGrp: string
    imagePath?: string | null
}
const LogoPreviewer: React.FC<LogoPreviewerInterface> = ({
    imagePath,
    ratioLabel,
    darkMode,
    ratioW,
    ratioH,
    setHeaderOption,
    radioGrp,
    option
}) => {
    const width = document.getElementById("preview_column")?.clientWidth

    return (
        <div id="preview_column" className="col-12 col-md-4 mx-0 p-1">
            <input
                className="mx-2"
                type="radio"
                id="html"
                checked={option === `${ratioW}:${ratioH}`}
                name={radioGrp}
                value={`${ratioW}:${ratioH}`}
                onChange={(evt) => {
                    setHeaderOption(evt.target.value)
                }}
            />
            <span
                className="text-level-remark text-font-medium"
                style={{ color: darkMode ? "white" : "black" }}>
                {ratioLabel}
            </span>
            <div
                id="preview_column"
                className="position-relative"
                style={{
                    minHeight: ((width ?? 0) * ratioH) / ratioW,
                    maxHeight: ((width ?? 0) * ratioH) / ratioW
                }}>
                <NextImageApdator
                    src={
                        imagePath
                            ? `${process.env.NEXT_IMAGE_UPLOAD_PATH}${imagePath}`
                            : DEFAULT_IMAGE_PLACEHOLDER
                    }
                    alt="profile"
                    isStatic
                    fill
                    style={{
                        objectFit: "fill",
                        objectPosition: "center"
                    }}
                />
            </div>
        </div>
    )
}

interface HeaderImageSectionInterface {
    iconLabel: string
    setMode: () => void
    setImagePath: (p: string) => void
    imagePath?: string
}
const HeaderImageSection: React.FC<HeaderImageSectionInterface> = ({
    iconLabel,
    setMode,
    imagePath,
    setImagePath
}) => {
    const [path, setPath] = useState<string>("")
    const [tab, setTab] = useState<string>("Web Resource")

    const isAbsolutePath = /https:\/\/|http:\/\//.test(imagePath || path)

    console.log(
        "aaaa",
        isAbsolutePath
            ? imagePath
            : imagePath
              ? `${process.env.NEXT_IMAGE_UPLOAD_PATH}${imagePath}`
              : "aaa"
    )

    return (
        <div className="d-flex p-3">
            <div
                className="col-12 col-md-8 d-flex flex-column space-y-3 px-3"
                style={{ minHeight: 145 }}>
                <span className="text-level-content text-font-bold">
                    {iconLabel}
                </span>
                <AdminTabMenu
                    tabList={HEADER_RESOURCE_LIST}
                    callback={(tab) => {
                        setTab(HEADER_RESOURCE_LIST[tab] as string)
                    }}
                />
                <div className="d-flex align-items-center space-x-3">
                    {tab === "Web Resource" && (
                        <AdminTextInput
                            label="Web Resource"
                            onChange={(v) => {
                                setPath(v)
                            }}
                            endAdorment={{
                                label: "Apply",
                                onClick: () => {
                                    setImagePath(path as string)
                                }
                            }}
                        />
                    )}
                    {tab === "Choose From Image Gallery" && (
                        <AdminActionButton
                            label="Choose From Image Gallery"
                            onClick={() => setMode()}
                        />
                    )}
                </div>
            </div>
            <div className="col-12 col-md-4 position-relative">
                <NextImageApdator
                    src={
                        isAbsolutePath
                            ? (imagePath as string)
                            : (imagePath as string)
                              ? `${process.env.NEXT_IMAGE_UPLOAD_PATH}${imagePath}`
                              : DEFAULT_IMAGE_PLACEHOLDER
                    }
                    alt="profile"
                    isStatic
                    fill
                    style={{
                        objectFit: "contain",
                        objectPosition: "center"
                    }}
                />
            </div>
        </div>
    )
}

export const AdminHeaderEditor: React.FC<AdminHeaderInterface> = ({
    header,
    saveHeader,
    setModal,
    setLoading
}) => {
    const [compLogo, setCompLogo] = useState<string>("")
    const [mobileLogo, setMobileLogo] = useState<string>("")

    const [mode, setMode] = useState<string>()
    const [darkMode, setDarkMode] = useState<boolean>(false)

    const [headerRatio, setHeaderRatio] = useState<string>("")
    const [mobileRatio, setMobileRatio] = useState<string>("")
    const router = useRouter()

    useEffect(() => {
        if (header) {
            setCompLogo(header?.headerLargeLogo)
            setMobileLogo(header?.headerSmallLogo)
            setHeaderRatio(header?.headerLargeRatio)
            setMobileRatio(header?.headerSmallRatio)
        }
    }, [header])

    return (
        <div className="d-flex w-100 p-2 flex-column space-y-3 rounded-2">
            <div className="d-flex w-100">
                <AdminCard
                    cardsRef={[
                        {
                            actionLabel: "View History",
                            desc: "View history of header",
                            action: () => {
                                router.push("./header/history")
                            },
                            authCode: "VIEW_FOOTER_SETTING_HISTORY"
                        },
                        {
                            actionLabel: "Dark Mode",
                            desc: "Turn on light/dark mode to view different color of logo",
                            action: () => {
                                setDarkMode(true)
                            },
                            invActionLabel: "Light Mode",
                            invDesc:
                                "Turn on light moed to view different color of logo",
                            invAction: () => {
                                setDarkMode(false)
                            },
                            dependency: darkMode
                        },
                        {
                            actionLabel: "Save",
                            desc: "Save header info",
                            action: () => {
                                saveHeader({
                                    headerLargeLogo: compLogo as string,
                                    headerSmallLogo: mobileLogo as string,
                                    headerLargeRatio: headerRatio,
                                    headerSmallRatio: mobileRatio
                                })
                            },
                            authCode: "EDIT_HEADER_SETTING"
                        }
                    ]}
                />
            </div>
            <div
                className="s-section-quaternary shadow-sm"
                style={{ borderRadius: 12, border: "1px solid #F1F1F1" }}>
                <div
                    className="d-flex flex-column p-3"
                    style={{
                        borderBottom: "1px solid var(--static-bg-boundary)"
                    }}>
                    <HeaderImageSection
                        iconLabel="Desktop and Tablet Version"
                        setImagePath={(p) => setCompLogo(p)}
                        imagePath={compLogo as string}
                        setMode={() => setMode("comp")}
                    />
                    {/* <div
                    className="d-flex space-x-2 px-3 col-8 mt-3 rounded-3"
                    style={{
                        background: darkMode ? "rgba(0,0,0,0.8)" : "white"
                    }}>
                    <LogoPreviewer
                        setHeaderOption={(v: string) => {
                            setHeaderRatio(v)
                        }}
                        option={headerRatio}
                        radioGrp="header_radio"
                        ratioLabel="16 to 9 ratio"
                        ratioH={9}
                        ratioW={16}
                        darkMode={darkMode}
                        imagePath={compLogo}
                    />
                    <LogoPreviewer
                        setHeaderOption={(v: string) => {
                            setHeaderRatio(v)
                        }}
                        radioGrp="header_radio"
                        option={headerRatio}
                        ratioLabel="4 to 3 ratio"
                        ratioH={3}
                        ratioW={4}
                        darkMode={darkMode}
                        imagePath={compLogo}
                    />
                    <LogoPreviewer
                        setHeaderOption={(v: string) => {
                            setHeaderRatio(v)
                        }}
                        option={headerRatio}
                        radioGrp="header_radio"
                        ratioLabel="1 to 1 ratio"
                        ratioH={1}
                        ratioW={1}
                        darkMode={darkMode}
                        imagePath={compLogo}
                    />
                </div> */}
                </div>
                <div className="d-flex flex-column p-3">
                    <HeaderImageSection
                        iconLabel="Mobile Version"
                        setImagePath={(p) => setMobileLogo(p)}
                        imagePath={mobileLogo as string}
                        setMode={() => setMode("mobile")}
                    />
                    {/* <div
                    className="d-flex space-x-2 px-3 col-8 mt-3 rounded-3"
                    style={{
                        background: darkMode ? "rgba(0,0,0,0.8)" : "white"
                    }}>
                    <LogoPreviewer
                        setHeaderOption={(v: string) => {
                            setMobileRatio(v)
                        }}
                        option={mobileRatio}
                        radioGrp="mobile_radio"
                        ratioLabel="16 to 9 ratio"
                        ratioH={9}
                        ratioW={16}
                        darkMode={darkMode}
                        imagePath={mobileLogo}
                    />
                    <LogoPreviewer
                        setHeaderOption={(v: string) => {
                            setMobileRatio(v)
                        }}
                        option={mobileRatio}
                        radioGrp="mobile_radio"
                        ratioLabel="4 to 3 ratio"
                        ratioH={3}
                        ratioW={4}
                        darkMode={darkMode}
                        imagePath={mobileLogo}
                    />
                    <LogoPreviewer
                        setHeaderOption={(v: string) => {
                            setMobileRatio(v)
                        }}
                        option={mobileRatio}
                        radioGrp="mobile_radio"
                        ratioLabel="1 to 1 ratio"
                        ratioH={1}
                        ratioW={1}
                        darkMode={darkMode}
                        imagePath={mobileLogo}
                    />
                </div> */}
                </div>
            </div>

            {mode && (
                <AdminImageGalleryModal
                    passByRelative
                    onImageSelected={(path: string) => {
                        if (mode === "comp") setCompLogo(path)
                        else setMobileLogo(path)
                        setMode("")
                    }}
                    setModal={setModal}
                    setLoading={setLoading}
                />
            )}
        </div>
    )
}
