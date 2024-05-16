import React from "react"
const { useDrag } = require("react-dnd")
import { SelectionJson } from "@nextjs-cms-library/ui/index"

type SelectComponentProps = SelectionJson & {}

export const SelectComponent: React.FC<SelectComponentProps> = ({
    element,
    icon,
    title
}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: element,
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div
            ref={drag}
            className={`s-select-card-outer s-dragging s-section-quaternary`}
            style={{ padding: 5, border: "1px solid #F1F1F1" }}>
            <div className={`s-select-card-inner`}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        padding: 5
                    }}>
                    {icon({ width: 30, height: 30 })}
                </div>
                <span
                    className="text-level-caption text-center"
                    style={{ lineHeight: "14px" }}>
                    {title}
                </span>
            </div>
        </div>
    )
}
