import {
    ACTION_TYPE,
    useActionAuthorizationHook
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
    authCode?: keyof ACTION_TYPE
}

export const AdminButton: React.FC<AdminButtonInterface> = (buttonProps) => {
    const { label, onClick, Icon, disabled, style, inverseStyle, authCode } =
        buttonProps

    const { isAuthorized } = useActionAuthorizationHook(authCode)
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
