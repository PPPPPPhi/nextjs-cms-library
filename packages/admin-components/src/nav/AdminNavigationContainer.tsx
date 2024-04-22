import { AdminNavigationDisplay } from "./AdminNavigationDisplay"
import AdminNavigationContextProvider from "./context/AdminNavigationContext"
const { DndProvider } = require("react-dnd")
const { HTML5Backend } = require("react-dnd-html5-backend")

export type naviagtionType = {
    name: string
    url: string
    target: "_blank" | "_self"
    children?: naviagtionType[]
    level?: number
}

interface AdminNavigationContainerInterface {
    navJson: naviagtionType[]
    saveNav: (n: naviagtionType[]) => void
    setModal: (details: any) => void
    cloneNav: (targetLang: string) => void
    lang: string
}

export const AdminNavigationContainer: React.FC<
    AdminNavigationContainerInterface
> = (props) => {
    return (
        <AdminNavigationContextProvider>
            <DndProvider backend={HTML5Backend}>
                <AdminNavigationDisplay {...props} />
            </DndProvider>
        </AdminNavigationContextProvider>
    )
}
