import React, { useCallback, useState, useEffect } from "react"

interface AdminCircularButtonInterface {
    icon: React.ReactNode
    onToggle: (t: boolean) => void
}

export const AdminCircularButton: React.FC<AdminCircularButtonInterface> = ({
    icon,
    onToggle
}) => {
    const [isToggled, setIsToggled] = useState(false)

    const Icon = useCallback(() => {
        if (icon) return icon
        else return <></>
    }, [icon])

    return (
        <div
            className="d-flex align-items-center justify-content-center rounded-5 s-section-secondary cursor-pointer shadow"
            style={{ width: 24, height: 24 }}
            onClick={() => {
                setIsToggled(!isToggled)
                onToggle(!isToggled)
            }}>
            <div
                className="d-flex align-items-center justify-content-center rounded-5 s-section-primary"
                style={{ width: 22, height: 22 }}>
                <div
                    className={`d-flex align-items-center justify-content-center rounded-5 ${
                        isToggled ? "s-section-secondary" : "s-section-primary"
                    }
                    ${isToggled ? "s-text-color-nu" : "s-text-color-alpha"}
                    `}
                    style={{ width: 18, height: 18 }}>
                    <Icon />
                </div>
            </div>
        </div>
    )
}
