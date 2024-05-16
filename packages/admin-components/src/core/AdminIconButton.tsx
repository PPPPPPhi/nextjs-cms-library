import { useCallback } from "react"
import {
    ACTION_TYPE,
    VIEW_TYPE,
    useActionAuthorizationHook
} from "@nextjs-cms-library/role-management/index"
import styles from "../AdminControl.module.scss"

interface AdminIconButtonInterface {
    icon: React.ReactNode
    onActionClick: () => void
    authCode?: keyof ACTION_TYPE | keyof VIEW_TYPE
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
            className={`cursor-pointer ${styles.adminIconButton} d-flex align-items-center justify-content-center`}
            onClick={(e) => {
                if (!isAuthorized) return
                e.preventDefault()
                onActionClick()
            }}
            style={{
                ...(!isAuthorized && { color: "#CCC", cursor: "default" })
            }}>
            {/*@ts-ignore*/}
            <Icon style={{ width: 20, height: 20 }} />
        </div>
    )
}
