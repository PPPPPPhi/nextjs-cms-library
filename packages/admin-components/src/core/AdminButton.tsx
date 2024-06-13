import {
    ACTION_TYPE,
    useActionAuthorizationHook,
    VIEW_TYPE
} from "@nextjs-cms-library/role-management/index"
import styles from "../AdminControl.module.scss"
import { CSSProperties } from "react"
interface AdminButtonInterface {
    label: string
    Icon?: any
    onClick: () => void
    inverseStyle?: boolean
    disabled?: boolean
    style?: CSSProperties
    authCode?: keyof ACTION_TYPE | keyof VIEW_TYPE
}

export const AdminButton: React.FC<AdminButtonInterface> = (buttonProps) => {
    const { label, onClick, Icon, disabled, style, inverseStyle, authCode } =
        buttonProps

    const { isAuthorized } = useActionAuthorizationHook(
        authCode ?? "AVAILABLE_CODE"
    )

    const isDisabled = disabled || !isAuthorized

    return (
        <div
            className={`ctaButton ${
                inverseStyle ? styles.adminButtonInverse : styles.adminButton
            } d-flex align-items-center ${Icon ? "justify-content-between" : "justify-content-center"} text-level-content`}
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
            <span className="">{label}</span>
            {Icon && (
                <Icon
                    className="text-level-button"
                    style={{ width: 20, height: 20 }}
                />
            )}
        </div>
    )
}
