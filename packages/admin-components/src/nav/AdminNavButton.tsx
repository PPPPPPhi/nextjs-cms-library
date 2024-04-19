import { useCallback } from "react"
import {
    ACTION_TYPE,
    VIEW_TYPE,
    useActionAuthorizationHook
} from "@nextjs-cms-library/role-management/index"

interface AdminCircularButtonInterface {
    icon: React.ReactNode
    label: string
    disabled: boolean
    onNavClick: () => void
    authCode?: keyof ACTION_TYPE | keyof VIEW_TYPE
}

export const AdminNavButton: React.FC<AdminCircularButtonInterface> = ({
    icon,
    label,
    disabled,
    onNavClick = () => {},
    authCode
}) => {
    const Icon = useCallback(() => {
        if (icon) return icon
        else return <></>
    }, [icon])

    const { isAuthorized } = useActionAuthorizationHook(authCode)

    if (disabled || !isAuthorized) return <></>

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
