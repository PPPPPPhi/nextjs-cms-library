import { usePageAuthorizationHook, useRoleHandlerHook } from "../hooks"

export const HookWrapper: React.FC<any> = ({ children }) => {
    useRoleHandlerHook()
    usePageAuthorizationHook()

    return <>{children}</>
}
