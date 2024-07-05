import {
    ACTION_TYPE,
    useActionAuthorizationHook,
    VIEW_TYPE
} from "@nextjs-cms-library/role-management/index"
import styles from "../AdminControl.module.scss"
import { CSSProperties } from "react"
import { useIsMobile } from "@nextjs-cms-library/ui/index"

interface AdminTopNavButtonInterface {
    label: string
    Icon?: any
    onClick: () => void
    inverseStyle?: boolean
    disabled?: boolean
    style?: CSSProperties
    authCode?: keyof ACTION_TYPE | keyof VIEW_TYPE
}

export const AdminTopNavButton: React.FC<AdminTopNavButtonInterface> = (
    buttonProps
) => {
    const { label, onClick, Icon, disabled, style, inverseStyle, authCode } =
        buttonProps

    const { isAuthorized } = useActionAuthorizationHook(
        authCode ?? "AVAILABLE_CODE"
    )
    const isDisabled = disabled || !isAuthorized
    const isMobile = useIsMobile()
    console.log("isMobile", isMobile)

    return (
        <div
            className={`${
                inverseStyle
                    ? styles.adminButtonInverse
                    : styles.adminTopNavButton
            } d-flex align-items-center justify-content-center`}
            style={{
                width: "max-content",
                ...style,
                cursor: isDisabled ? "default" : "pointer",
                ...(isDisabled && { background: "#CCCCCC" })
            }}
            onClick={() => {
                if (isDisabled) return
                onClick()
            }}>
            {Icon && (
                <Icon
                    className={`text-level-caption  s-text-color-nu ${styles.adminTopNavLabelButton}`}
                />
            )}
            {!isMobile && (
                <span className="text-level-caption s-text-color-nu">
                    {label}
                </span>
            )}
        </div>
    )
}
