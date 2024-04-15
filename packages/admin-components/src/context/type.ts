import { CSSProperties } from "react"

export type adminModalType = {
    title: string
    content: React.ReactNode
    confirmCTAText?: string
    cancelCTAText?: string
    confirmHandler?: () => void
    closeHandler?: () => void
    isNoCloseBtn?: boolean
}

export type adminToastType = {
    title: string
    content: string
    onClose?: () => void
    containerStyle?: CSSProperties
    headerStyle?: CSSProperties
    contentStyle?: CSSProperties
}

export type pageInfoType = {
    name: string
    description: string
    slug: string
    language: string
}
