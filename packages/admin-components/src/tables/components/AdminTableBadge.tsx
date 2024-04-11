import { CSSProperties, useMemo } from "react"

interface AdminTableBadgeInterface {
    value: string
    customStyle?: CSSProperties
    customWidth?: number
    badgeTitle?: any
}

export const AdminTableBadge: React.FC<AdminTableBadgeInterface> = ({
    value,
    customStyle,
    customWidth,
    badgeTitle
}) => {
    const badgeValue = useMemo(() => {
        if (badgeTitle) return badgeTitle[value] ?? value
        else return value
    }, [badgeTitle, value])

    return (
        <div
            className="d-flex align-items-center justify-content-center "
            style={{ width: customWidth ?? 180 }}>
            <div
                className="s-section-primary px-3 rounded-4 d-flex align-items-center"
                style={{ ...customStyle }}>
                <span className="text-level-caption text-font-medium">
                    {badgeValue}
                </span>
            </div>
        </div>
    )
}
