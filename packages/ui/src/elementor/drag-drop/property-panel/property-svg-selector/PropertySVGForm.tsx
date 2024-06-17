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
        <div className="d-flex flex-wrap">
            {PropertySVGJson.map((l) => (
                <div className="col-1 col-sm-6 col-md-4 col-lg-2 p-2 d-flex flex-column align-items-center ">
                    <div
                        className="cursor-pointer d-flex flex-column justify-content-center align-items-center space-y-2 w-100 s-section-quaternary"
                        onClick={() => {
                            setI(l.value)
                            onFormValueChange(l.value)
                        }}
                        style={{
                            height: 100,
                            borderRadius: 12,
                            border: "1px solid var(--static-bg-boundary)",
                            borderColor:
                                i === l.value
                                    ? "var(--static-bg-secondary)"
                                    : "var(--static-bg-boundary)"
                        }}>
                        <AdminSVGIcon
                            svgName={l.value}
                            style={{ width: 50, height: 50 }}
                        />
                        <span className="text-level-caption s-text-color-alpha text-font-medium">
                            {l.label}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
