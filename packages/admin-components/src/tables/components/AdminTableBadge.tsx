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
            style={{ width: customWidth ?? "auto" }}>
            {badgeValue && (
                <div
                    className="s-section-secondary px-3 rounded-4 d-flex align-items-center"
                    style={{ minHeight: 27, ...customStyle }}>
                    <span className="text-level-content text-font-medium s-text-color-nu">
                        {badgeValue}
                    </span>
                </div>
            )}
        </div>
    )
}
