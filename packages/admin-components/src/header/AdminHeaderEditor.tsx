import { AdminButton } from "../core"
import { AdminTextInput } from "../input"
import { NextImageApdator } from "@nextjs-cms-library/ui/index"
import { AdminImageGalleryModal } from "../image"
import { useState } from "react"
import { AdminCard } from "../core"

interface AdminHeaderInterface {
    header: {
        headerLargeLogo: string
        headerSmallLogo: string
    }
    saveHeader: (s: string, l: string) => void
    setModal: (modal: any) => void
    setLoading: (l: boolean) => void
}

export type headerPropertiesType = {
    headerLargeLogo: string
    headerSmallLogo: string
}

const DEFAULT_IMAGE_PLACEHOLDER = `${process.env.NEXT_ASSEST_PATH}/image_placeholder.webp`

interface LogoPreviewerInterface {
    ratioW: number
    ratioH: number
    ratioLabel: string
    darkMode: boolean
    imagePath?: string | null
}
const LogoPreviewer: React.FC<LogoPreviewerInterface> = ({
    imagePath,
    ratioLabel,
    darkMode,
    ratioW,
    ratioH
}) => {
    const width = document.getElementById("preview_column")?.clientWidth

    return (
        <div id="preview_column" className="col-12 col-md-4 mx-0 p-1">
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
    setMode: (m: string) => void
    setImagePath: (p: string) => void
    imagePath?: string
}
const HeaderImageSection: React.FC<HeaderImageSectionInterface> = ({
    iconLabel,
    setMode,
    imagePath,
    setImagePath
}) => {
    const [path, setPath] = useState<string>()

    return (
        <div className="d-flex">
            <div className="col-12 col-md-8 d-flex flex-column space-y-4 px-3">
                <span className="text-level-body text-font-bold">
                    {iconLabel}
                </span>
                <div className="d-flex align-items-center space-x-3">
                    <AdminTextInput
                        label="Web Resource"
                        onChange={(v) => {
                            setPath(v)
                        }}
                    />
                    <AdminButton
                        label="Apply"
                        onClick={() => {
                            setImagePath(path as string)
                        }}
                        style={{ height: 30 }}
                    />
                </div>
                <AdminButton
                    label="Choose from Image Gallery"
                    onClick={() => setMode("comp")}
                />
            </div>
            <div className="col-12 col-md-4 position-relative">
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
    const { headerLargeLogo, headerSmallLogo } = header ?? {}
    const [compLogo, setCompLogo] = useState(
        !!headerLargeLogo ? headerLargeLogo : null
    )
    const [mobileLogo, setMobileLogo] = useState(
        !!headerSmallLogo ? headerSmallLogo : null
    )

    const [mode, setMode] = useState<string>()
    const [darkMode, setDarkMode] = useState<boolean>(false)

    return (
        <div className="d-flex w-100 p-2 flex-column space-y-3 rounded-2">
            <div className="d-flex w-100">
                <AdminCard
                    cardsRef={[
                        {
                            actionLabel: darkMode ? "Light Mode" : "Dark Mode",
                            desc: "Turn on light/dark mode to view different color of logo",
                            action: () => {
                                setDarkMode(!darkMode)
                            }
                        },
                        {
                            actionLabel: "Save",
                            desc: "Save header info",
                            action: () => {
                                saveHeader(
                                    mobileLogo as string,
                                    compLogo as string
                                )
                            }
                        }
                    ]}
                />
            </div>
            <div className="d-flex flex-column shadow p-3 rounded-2 s-section-primary">
                <HeaderImageSection
                    iconLabel="Desktop and Tablet Version"
                    setImagePath={(p) => setCompLogo(p)}
                    imagePath={compLogo as string}
                    setMode={() => setMode("comp")}
                />
                <div
                    className="d-flex space-x-2 px-3 col-8 mt-3 rounded-3"
                    style={{
                        background: darkMode ? "rgba(0,0,0,0.8)" : "white"
                    }}>
                    <LogoPreviewer
                        ratioLabel="16 to 9 ratio"
                        ratioH={9}
                        ratioW={16}
                        darkMode={darkMode}
                        imagePath={compLogo}
                    />
                    <LogoPreviewer
                        ratioLabel="4 to 3 ratio"
                        ratioH={3}
                        ratioW={4}
                        darkMode={darkMode}
                        imagePath={compLogo}
                    />
                    <LogoPreviewer
                        ratioLabel="1 to 1 ratio"
                        ratioH={1}
                        ratioW={1}
                        darkMode={darkMode}
                        imagePath={compLogo}
                    />
                </div>
            </div>
            <div className="d-flex flex-column shadow p-3 rounded-2 s-section-primary">
                <HeaderImageSection
                    iconLabel="Mobile Version"
                    setImagePath={(p) => setMobileLogo(p)}
                    imagePath={mobileLogo as string}
                    setMode={() => setMode("mobile")}
                />
                <div
                    className="d-flex space-x-2 px-3 col-8 mt-3 rounded-3"
                    style={{
                        background: darkMode ? "rgba(0,0,0,0.8)" : "white"
                    }}>
                    <LogoPreviewer
                        ratioLabel="16 to 9 ratio"
                        ratioH={9}
                        ratioW={16}
                        darkMode={darkMode}
                        imagePath={mobileLogo}
                    />
                    <LogoPreviewer
                        ratioLabel="4 to 3 ratio"
                        ratioH={3}
                        ratioW={4}
                        darkMode={darkMode}
                        imagePath={mobileLogo}
                    />
                    <LogoPreviewer
                        ratioLabel="1 to 1 ratio"
                        ratioH={1}
                        ratioW={1}
                        darkMode={darkMode}
                        imagePath={mobileLogo}
                    />
                </div>
            </div>

            {mode && (
                <AdminImageGalleryModal
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
