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
        <div
            className="d-flex align-items-center justify-content-center "
            style={{ height: 200 }}>
            <div
                className=" px-3 rounded-4 d-flex align-items-center"
                style={{ ...customStyle }}>
                <img src={value} />
            </div>
        </div>
    )
}
