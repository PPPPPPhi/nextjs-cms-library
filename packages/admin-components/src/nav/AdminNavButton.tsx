import { useCallback } from "react"
import {
    ACTION_TYPE,
    VIEW_TYPE,
    useActionAuthorizationHook
} from "@nextjs-cms-library/role-management/index"
import { IconType } from "react-icons/lib"

interface AdminCircularButtonInterface {
    icon: IconType
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
    //@ts-ignore
    const Icon: IconType = useCallback(() => {
        if (icon) return icon
        else return <></>
    }, [icon])

    const { isAuthorized } = useActionAuthorizationHook(authCode)

    if (disabled || !isAuthorized) return <></>

    return (
        <div
            className="d-flex align-items-center s-section-quaternary p-2 cursor-pointer"
            style={{
                borderRadius: 12,
                height: 50,
                minWidth: 220,
                border: "1px solid var(--staitc-bg-boundary-alpha)"
            }}
            onClick={onNavClick}>
            <div
                className="cursor-pointer text-level-subtitle p-2 text-level-icon"
                style={{ color: "var(--static-color-secondary)" }}>
                <Icon />
            </div>
            <div className="d-flex flex-column pl-2">
                <span className="text-level-remark text-font-normal s-text-color-alpha">
                    Add navigation under
                </span>
                <span className="text-level-remark text-font-normal s-text-color-beta">
                    {label}
                </span>
            </div>
        </div>
    )
}
