import { IconType } from "react-icons/lib"
import { AdminButton } from "../core"

interface AdminLabelButtonInterface {
    label: string
    actions: {
        label: string
        icon?: IconType
        style: React.CSSProperties
        onAction?: () => void
    }[]
}

export const AdminLabelButton: React.FC<AdminLabelButtonInterface> = ({
    label,
    actions
}) => {
    return (
        <div className="d-flex w-100" style={{ height: 38 }}>
            <span>{label}</span>
            <div className="d-flex flex-wrap space-x-2">
                {(actions ?? [])?.map((l) => {
                    const { label, icon, style, onAction } = l ?? {}

                    return (
                        <AdminButton
                            label={label}
                            Icon={icon}
                            style={{ ...style }}
                            onClick={() => {
                                onAction && onAction()
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}
