import { useAdminAuthorizationContext } from "../contexts"
import {
    usePageAuthorizationHook,
    useRoleHandlerHook,
    useRolePermissionHandlerHook,
    useNextRouterHook
} from "../hooks"

export const HookWrapper: React.FC<any> = ({ children }) => {
    useNextRouterHook()
    useRoleHandlerHook()
    usePageAuthorizationHook()
    useRolePermissionHandlerHook()

    return <>{children}</>
}
