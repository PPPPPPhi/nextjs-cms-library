import { NextImageApdator } from "@nextjs-cms-library/ui/index"
import { AdminButton } from "./AdminButton"
import { useMemo } from "react"
import { ACTION_TYPE } from "@nextjs-cms-library/role-management/index"
interface AdminCardInterface {
    cardsRef: CardType[]
}

const ASSISTANCE = {
    0: "/static_human.jpg",
    1: "/static_human2.webp",
    2: "/static_human3.webp",
    3: "/static_human4.webp"
}

type CardType = {
    action: () => void
    actionLabel: string
    desc: string
    isFull?: boolean
    authCode?: keyof ACTION_TYPE
}

const Card: React.FC<CardType> = ({
    action,
    actionLabel,
    desc,
    isFull,
    authCode
}) => {
    const assistanceIdx = useMemo(
        () => Math.floor(Math.random() * 4),
        []
    ) as keyof typeof ASSISTANCE

    return (
        <div
            className={`${isFull ? "w-100" : "col-12 col-md-6 col-lg-4 col-xl-3 p-2"}`}>
            <div
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
                        style={{ width: 120 }}
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
            </div>
        </div>
    )
}

export const AdminCard: React.FC<AdminCardInterface> = ({ cardsRef }) => {
    return (
        <div className="d-flex flex-wrap w-100 justify-content-end">
            {cardsRef.map((k) => {
                const { actionLabel, desc, action, isFull, authCode } = k
                return (
                    <Card
                        actionLabel={actionLabel}
                        desc={desc}
                        action={action}
                        isFull={isFull}
                        authCode={authCode}
                    />
                )
            })}
        </div>
    )
}
