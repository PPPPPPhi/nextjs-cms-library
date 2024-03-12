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

    return (
        <div
            className={`${
                inverseStyle ? styles.adminButtonInverse : styles.adminButton
            } d-flex align-items-center justify-content-center shadow`}
            style={{
                ...style,
                cursor: disabled ? "default" : "pointer",
                background: disabled ? "#CCCCCC" : "var(--static-color-primary)"
            }}
            onClick={onClick}>
            {Icon && <Icon className="text-level-button s-text-color-nu" />}
            <span className="text-level-remark s-text-color-nu">{label}</span>
        </div>
    )
}
