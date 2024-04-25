import { Tooltip } from "react-tooltip"
import { HiQuestionMarkCircle } from "react-icons/hi2"

interface AdminTooltipInterface {
    hints: string
    id: string
}

export const AdminTooltip: React.FC<AdminTooltipInterface> = ({
    id,
    hints
}) => {
    return (
        <div style={{ width: 24, height: 24 }}>
            <Tooltip
                anchorSelect={`.${id}`}
                place="top"
                style={{ maxWidth: 300, height: "auto" }}>
                {hints}
            </Tooltip>
            <a className={id}>
                <HiQuestionMarkCircle
                    style={{
                        width: 24,
                        height: 24,
                        color: "var(--static-color-primary)"
                    }}
                />
            </a>
        </div>
    )
}
