import React from "react"
import { CSSProperties, useMemo } from "react"

interface AdminTableLabelListInterface {
    value: any[]
    customStyle?: CSSProperties
    customWidth?: number
    badgeTitle?: any
}

export const AdminTableLabelList: React.FC<AdminTableLabelListInterface> = ({
    value,
    customStyle,
    customWidth
}) => {
    return (
        <div
            className="d-flex flex-wrap align-items-center justify-content-center overflow-y-auto"
            style={{ width: customWidth ?? "auto", height: 35 }}>
            {value?.map((l) => (
                <div
                    className="s-section-primary px-3 rounded-4 d-flex align-items-center my-1 mx-1"
                    style={{ ...customStyle }}>
                    <span className="text-level-caption text-font-medium">
                        {typeof l === "object" ? l.name || l.roleName : l}
                    </span>
                </div>
            ))}
        </div>
    )
}
