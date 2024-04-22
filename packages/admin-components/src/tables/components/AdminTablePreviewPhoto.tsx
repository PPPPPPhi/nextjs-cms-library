import { CSSProperties, useMemo } from "react"
import { NextImageApdator } from "../../../../ui/src/utils"

interface AdminTablePreviewPhotoInterface {
    value: string
    customStyle?: CSSProperties
    customWidth?: number
}

export const AdminTablePreviewPhoto: React.FC<
    AdminTablePreviewPhotoInterface
> = ({ value, customStyle, customWidth }) => {
    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ width: customWidth ?? "auto" }}>
            <div
                className=" px-3 rounded-4 d-flex align-items-center position-relative"
                style={{
                    width: 100,
                    objectFit: "contain",
                    height: 100,
                    ...customStyle
                }}>
                <NextImageApdator
                    src={value}
                    alt="product photo"
                    fill
                    isStatic
                    style={{ objectFit: "contain", objectPosition: "center" }}
                />
            </div>
        </div>
    )
}
