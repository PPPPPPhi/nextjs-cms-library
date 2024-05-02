import { useEffect, useState } from "react"
import PropertySVGJson from "./PropertySVG.json"
import { AdminSVGIcon } from "@nextjs-cms-library/admin-components/index"


interface PropertySVGFormInterface {
    onFormValueChange: (icon: string) => void
    defaultValue?: string
}

export const PropertySVGForm: React.FC<PropertySVGFormInterface> = ({
    defaultValue,
    onFormValueChange
}) => {
    const [i, setI] = useState(defaultValue)

    return (
        <div className="d-flex flex-wrap" style={{ border: "1px solid black" }}>
            {PropertySVGJson.map((l) => (
                <div
                    className="col-1 col-sm-6 col-md-4 col-lg-2 p-2 d-flex flex-column align-items-center cursor-pointer"
                    onClick={() => {
                        setI(l.value)
                        onFormValueChange(l.value)
                    }}
                    style={{
                        border: "1px solid black",
                        background:
                            i === l.value ? "var(--static-bg-primary)" : ""
                    }}>
                    <AdminSVGIcon svgName={l.value} />
                    <span className="text-level-remark">{l.label}</span>
                </div>
            ))}
        </div>
    )
}
