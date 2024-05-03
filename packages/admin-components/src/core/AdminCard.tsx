import { NextImageApdator } from "@nextjs-cms-library/ui/index"
import { AdminButton } from "./AdminButton"
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

type AdminCardType = {
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
    const assistanceIdx = useMemo(
        () => Math.floor(Math.random() * 4),
        []
    ) as keyof typeof ASSISTANCE

    return (
        <div
            className={`${isFull ? "w-100" : "col-12 col-md-4 col-lg-2 col-xl-2 p-2"}`}>
            {/* <div
                className="d-flex shadow rounded-2 h-100"
                style={{ background: "white", minHeight: 100, flex: 1 }}>
                <div
                    style={{ width: 100, height: 100 }}
                    className="d-flex position-relative align-self-end">
                    <NextImageApdator
                        src={`${process.env.NEXT_ASSEST_PATH}${ASSISTANCE[assistanceIdx]}`}
                        isStatic
                        alt="teacher"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <div
                    style={{ flex: 1 }}
                    className="d-flex flex-column p-3 align-items-end justify-content-between">
                    <AdminButton
                        label={actionLabel}
                        // style={{ width: 120 }}
                        onClick={() => {
                            action()
                        }}
                        authCode={authCode}
                    />
                    <div>
                        <span className="s-text-color-alpha text-level-remark text-right">
                            {desc}
                        </span>
                    </div>
                </div>
            </div> */}
            <div
                className="d-flex flex-column w-100 shadow rounded-2 h-100 p-3 space-y-2"
                style={{ background: "white" }}>
                <div style={{ flex: 1 }}>
                    <span className="s-text-color-alpha text-level-remark text-right">
                        {desc}
                    </span>
                </div>
                <AdminButton
                    label={actionLabel}
                    style={{ width: "100%" }}
                    onClick={() => {
                        console.log("dependency press")
                        action()
                    }}
                    inverseStyle={
                        dependency !== undefined && dependency === true
                    }
                    authCode={authCode}
                />
            </div>
        </div>
    )
}

export const AdminCard: React.FC<AdminCardInterface> = ({ cardsRef }) => {
    return (
        <div
            className="d-flex flex-wrap w-100 justify-content-end"
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

                console.log("dependency", dependency)

                const isToggled = useMemo(() => dependency, [dependency])
                const label = useMemo(() => {
                    return isToggled ? invActionLabel : actionLabel
                }, [isToggled])
                const content = useMemo(() => {
                    return isToggled ? invDesc : desc
                }, [isToggled])
                const btnAction = useMemo(() => {
                    return isToggled ? invAction : action
                }, [isToggled])

                console.log("dependency btnAction", btnAction)

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
