import { useCallback } from "react"
import styles from "../../AdminControl.module.scss"
import {
    ACTION_TYPE,
    VIEW_TYPE,
    useActionAuthorizationHook
} from "@nextjs-cms-library/role-management/index"

interface AdminTableActionWarnButtonInterface {
    action: () => void
    label?: string
    icon?: React.ReactNode
    customWidth?: number
    inverseStyle?: boolean
    authCode?: keyof ACTION_TYPE | keyof VIEW_TYPE
    style: React.CSSProperties
}

export const AdminTableActionWarnButton: React.FC<
    AdminTableActionWarnButtonInterface
> = ({ label, icon, action, customWidth, inverseStyle, authCode, style }) => {
    const Icon = useCallback(() => {
        if (icon) return icon
        else return <></>
    }, [icon])

    const { isAuthorized } = useActionAuthorizationHook(authCode)

    return (
        <>
            {(label || icon) && (
                <div
                    className={`d-flex align-items-center px-2 justify-content-center`}
                    style={{
                        minHeight: 30,
                        width: customWidth ?? "auto",
                        ...style
                    }}>
                    <div
                        className={`px-3 cursor-pointer d-flex align-items-center ${
                            inverseStyle
                                ? styles.adminTableWarnButtonInverse
                                : styles.adminTableWarnButton
                        }`}
                        style={{
                            ...(!isAuthorized && {
                                background: "#CCC",
                                cursor: "default"
                            }),
                            padding: "2px 0 2px 0"
                        }}
                        onClick={isAuthorized ? action : () => {}}>
                        <Icon />
                        <span className="text-level-caption text-font-medium">
                            {label}
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}
