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
            className={`s-select-card-outer shadow s-dragging`}
            style={{ paddingTop: 5, paddingBottom: 5, background: "white" }}>
            <div className={`s-select-card-inner`}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
                    {icon({ width: 32, height: 32 })}
                </div>
                <div className="text-level-caption text-center">{title}</div>
            </div>
        </div>
    )
}
