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
            className={`${
                inverseStyle ? styles.adminButtonInverse : styles.adminButton
            } d-flex align-items-center justify-content-center shadow`}
            style={{
                width: "max-content",
                ...style,
                cursor: isDisabled ? "default" : "pointer",
                background: isDisabled
                    ? "#CCCCCC"
                    : "var(--static-color-primary)"
            }}
            onClick={() => {
                if (isDisabled) return
                onClick()
            }}>
            {Icon && (
                <Icon className="text-level-button s-text-color-nu mx-2" />
            )}
            <span className="s-text-color-nu">{label}</span>
        </div>
    )
}
