import { CSSProperties, useMemo } from "react"

interface AdminTableBadgeListInterface {
    value: any[]
    badgeRef: string
    customStyle?: CSSProperties
    customWidth?: number
    badgeTitle?: any
}

export const AdminTableBadgeList: React.FC<AdminTableBadgeListInterface> = ({
    value,
    customStyle,
    customWidth
}) => {
    return (
        <div
            className="d-flex flex-wrap align-items-center justify-content-center overflow-y-auto"
            style={{ width: customWidth ?? 180, height: 35 }}>
            {value?.map((l) => (
                <div
                    className="s-section-primary px-3 rounded-4 d-flex align-items-center my-1 mx-1"
                    style={{ ...customStyle }}>
                    <span className="text-level-caption text-font-medium">
                        {l.name}
                    </span>
                </div>
            ))}
        </div>
    )
}
