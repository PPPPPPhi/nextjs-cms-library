import { useCallback } from "react"

interface AdminCircularButtonInterface {
    icon: React.ReactNode
    label: string
    disabled: boolean
    onNavClick: () => void
}

export const AdminNavButton: React.FC<AdminCircularButtonInterface> = ({
    icon,
    label,
    disabled,
    onNavClick = () => {}
}) => {
    const Icon = useCallback(() => {
        if (icon) return icon
        else return <></>
    }, [icon])

    if (disabled) return <></>

    return (
        <div className="d-flex align-items-center rounded-5">
            <div
                className="cursor-pointer text-level-subtitle s-text-color-alpha"
                onClick={onNavClick}>
                <Icon />
            </div>
            <span className="px-2 text-level-remark">
                --- Add navigation under {label}
            </span>
        </div>
    )
}
