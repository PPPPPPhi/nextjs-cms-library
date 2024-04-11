import { useActionAuthorizationHook } from "@nextjs-cms-library/role-management/index"
import styles from "../AdminControl.module.scss"
import { CSSProperties } from "react"

interface AdminButtonInterface {
    label: string
    Icon?: any
    onClick: () => void
    inverseStyle?: boolean
    disabled?: boolean
    style?: CSSProperties
}

export const AdminButton: React.FC<AdminButtonInterface> = (buttonProps) => {
    const { label, onClick, Icon, disabled, style, inverseStyle } = buttonProps

    const { checkAuthorization } = useActionAuthorizationHook()

    const isAuthorized = disabled ? false : checkAuthorization()
    const isDisabled = disabled || !isAuthorized

    return (
        <div
            className={`${
                inverseStyle ? styles.adminButtonInverse : styles.adminButton
            } d-flex align-items-center justify-content-center shadow`}
            style={{
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
            {Icon && <Icon className="text-level-button s-text-color-nu" />}
            <span className="text-level-remark s-text-color-nu">{label}</span>
        </div>
    )
}
