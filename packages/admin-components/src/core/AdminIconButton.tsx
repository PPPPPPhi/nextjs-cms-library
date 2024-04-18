import { useCallback } from "react"
import {
    ACTION_TYPE,
    useActionAuthorizationHook
} from "@nextjs-cms-library/role-management/index"

interface AdminIconButtonInterface {
    icon: React.ReactNode
    onActionClick: () => void
    authCode?: keyof ACTION_TYPE
}

export const AdminIconButton: React.FC<AdminIconButtonInterface> = ({
    icon,
    onActionClick,
    authCode
}) => {
    const Icon = useCallback(() => {
        if (icon) return icon
        else return <></>
    }, [icon])

    const { isAuthorized } = useActionAuthorizationHook(authCode)

    return (
        <div
            className="cursor-pointer text-level-subtitle s-text-color-alpha"
            onClick={(e) => {
                if (!isAuthorized) return
                e.preventDefault()
                onActionClick()
            }}
            style={{
                ...(!isAuthorized && { color: "#CCC", cursor: "default" })
            }}>
            <Icon />
        </div>
    )
}
