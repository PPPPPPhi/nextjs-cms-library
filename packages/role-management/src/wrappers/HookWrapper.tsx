import {
    usePageAuthorizationHook,
    useRoleHandlerHook,
    useRolePermissionHandlerHook
} from "../hooks"

export const HookWrapper: React.FC<any> = ({ children }) => {
    useRoleHandlerHook()
    usePageAuthorizationHook()
    useRolePermissionHandlerHook()

    return <>{children}</>
}
