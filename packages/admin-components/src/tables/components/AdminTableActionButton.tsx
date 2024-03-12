import { useCallback } from "react"
import styles from "../../AdminControl.module.scss"

interface RowCellInterface {
    action: () => void
    label?: string
    icon?: React.ReactNode
    customWidth?: number
    inverseStyle?: boolean
}

export const AdminTableActionButton: React.FC<RowCellInterface> = ({
    label,
    icon,
    action,
    customWidth,
    inverseStyle
}) => {
    const Icon = useCallback(() => {
        if (icon) return icon
        else return <></>
    }, [icon])

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
                        onClick={action}>
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
