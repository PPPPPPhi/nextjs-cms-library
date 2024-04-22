import { CSSProperties, useMemo } from "react"

interface AdminTablePreviewPhotoInterface {
    value: string
    customStyle?: CSSProperties
    customWidth?: number
}

export const AdminTablePreviewPhoto: React.FC<
    AdminTablePreviewPhotoInterface
> = ({ value, customStyle, customWidth }) => {
    return (
        <div className="d-flex align-items-center justify-content-center ">
            <div
                className="rounded-4 d-flex align-items-center"
                style={{ ...customStyle }}>
                <img
                    src={value}
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                />
            </div>
        </div>
    )
}
