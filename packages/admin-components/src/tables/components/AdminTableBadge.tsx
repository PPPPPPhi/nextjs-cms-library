import { CSSProperties } from "react"

interface AdminTableBadgeInterface {
    value: string
    customStyle?: CSSProperties
    customWidth?: number
}

export const AdminTableBadge: React.FC<AdminTableBadgeInterface> = ({
    value,
    customStyle,
    customWidth
}) => {
    return (
        <div
            className="d-flex align-items-center justify-content-center "
            style={{ width: customWidth ?? 180 }}>
            <div
                className="s-section-primary px-3 rounded-4 d-flex align-items-center"
                style={{ ...customStyle }}>
                <span className="text-level-caption text-font-medium">
                    {value}
                </span>
            </div>
        </div>
    )
}
