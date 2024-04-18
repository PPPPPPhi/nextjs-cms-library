import { useCallback } from "react"
import styles from "../../AdminControl.module.scss"
import {
    ACTION_TYPE,
    useActionAuthorizationHook
} from "@nextjs-cms-library/role-management/index"

interface RowCellInterface {
    action: () => void
    label?: string
    icon?: React.ReactNode
    customWidth?: number
    inverseStyle?: boolean
    authCode?: keyof ACTION_TYPE
}

export const AdminTableActionButton: React.FC<RowCellInterface> = ({
    label,
    icon,
    action,
    customWidth,
    inverseStyle,
    authCode
}) => {
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
                        minHeight: 35,
                        width: customWidth ?? 180
                    }}>
                    <div
                        className={`rounded-2 px-3 cursor-pointer shadow ${
                            inverseStyle
                                ? styles.adminTableButtonInverse
                                : styles.adminTableButton
                        } s-text-color-nu`}
                        style={{
                            ...(!isAuthorized && {
                                background: "#CCC",
                                cursor: "default"
                            })
                        }}
                        onClick={isAuthorized ? action : () => {}}>
                        <Icon />
                        <span className="text-level-caption text-font-bold s-text-color-nu">
                            {label}
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}
