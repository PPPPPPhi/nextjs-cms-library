import { AdminActionButton } from "./AdminActionButton"
import { useMemo } from "react"
import {
    ACTION_TYPE,
    VIEW_TYPE
} from "@nextjs-cms-library/role-management/index"
interface AdminCardInterface {
    cardsRef: AdminCardType[]
}

const ASSISTANCE = {
    0: "/static_human.jpg",
    1: "/static_human2.webp",
    2: "/static_human3.webp",
    3: "/static_human4.webp"
}

export type AdminCardType = {
    action: () => void
    actionLabel: string
    desc: string
    isFull?: boolean
    authCode?: keyof ACTION_TYPE | keyof VIEW_TYPE
    invActionLabel?: string
    invDesc?: string
    invAction?: () => void
    dependency?: boolean
}

const Card: React.FC<AdminCardType> = ({
    action,
    actionLabel,
    desc,
    isFull,
    authCode,
    dependency
}) => {
    return (
        // <div className="d-flex flex-wrap space-x-2 p-2">
        //     <div
        //         className="d-flex flex-column w-100 shadow rounded-2 h-100 p-3 space-y-2"
        //         style={{ background: "white" }}>
        //         <div style={{ flex: 1 }}>
        //             <span className="s-text-color-alpha text-level-remark text-right">
        //                 {desc}
        //             </span>
        //         </div>
        //         <AdminActionButton
        //             label={actionLabel}
        //             onClick={() => {
        //                 action()
        //             }}
        //             inverseStyle={
        //                 dependency !== undefined && dependency === true
        //             }
        //             authCode={authCode}
        //         />
        //     </div>
        // </div>
        <div className="my-1">
            <AdminActionButton
                label={actionLabel}
                onClick={() => {
                    action()
                }}
                inverseStyle={dependency !== undefined && dependency === true}
                authCode={authCode}
            />
        </div>
    )
}

export const AdminCard: React.FC<AdminCardInterface> = ({ cardsRef }) => {
    return (
        <div
            className="d-flex flex-wrap w-100 py-2 space-x-2"
            id="admin_card_container">
            {cardsRef.map((k) => {
                const {
                    actionLabel,
                    desc,
                    action,
                    isFull,
                    authCode,
                    dependency,
                    invAction,
                    invActionLabel,
                    invDesc
                } = k

                const isToggled = useMemo(() => dependency, [dependency])
                const label = useMemo(() => {
                    return isToggled ? invActionLabel : actionLabel
                }, [isToggled])
                const content = useMemo(() => {
                    return isToggled ? invDesc : desc
                }, [isToggled])
                const btnAction = useMemo(() => {
                    return isToggled ? invAction : action
                }, [isToggled, cardsRef])

                return (
                    <Card
                        actionLabel={label as string}
                        desc={content as string}
                        action={btnAction as () => void}
                        isFull={isFull}
                        authCode={authCode}
                        dependency={dependency}
                    />
                )
            })}
        </div>
    )
}
