import {
    ACTION_TYPE,
    useActionAuthorizationHook,
    VIEW_TYPE
} from "@nextjs-cms-library/role-management/index"
import styles from "../AdminControl.module.scss"
import { CSSProperties } from "react"

interface AdminActionButtonInterface {
    label: string
    Icon?: any
    onClick: () => void
    inverseStyle?: boolean
    disabled?: boolean
    style?: CSSProperties
    authCode?: keyof ACTION_TYPE | keyof VIEW_TYPE
}

export const AdminActionButton: React.FC<AdminActionButtonInterface> = (
    buttonProps
) => {
    const { label, onClick, Icon, disabled, style, inverseStyle, authCode } =
        buttonProps

    const { isAuthorized } = useActionAuthorizationHook(
        authCode ?? "AVAILABLE_CODE"
    )
    const isDisabled = disabled || !isAuthorized

    return (
        <div
            className={`${
                inverseStyle
                    ? styles.adminActionButtonInverse
                    : styles.adminActionButton
            } d-flex align-items-center justify-content-center px-2`}
            style={{
                width: "max-content",
                ...style,
                cursor: isDisabled ? "default" : "pointer",
                ...(isDisabled && {
                    background: "#CCCCCC",
                    color: "#808080",
                    borderColor: "#CCCCCC"
                })
            }}
            onClick={() => {
                if (isDisabled) return
                onClick()
            }}>
            {Icon && (
                <Icon
                    className="text-level-caption"
                    style={{ marginRight: 5, width: 20, height: 20 }}
                />
            )}
            <span className="text-level-caption">{label}</span>
        </div>
    )
}
