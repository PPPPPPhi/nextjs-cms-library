"use client"
import { useMemo, useEffect } from "react"

const usePropertiesHook = (properties: any): { [s: string]: any } => {
    const values: { [s: string]: any } = useMemo(() => {
        if (properties && properties.length > 0) {
            let vObj = {}
            const v = properties.forEach((k: any) => {
                vObj = { ...vObj, [k.element_id]: k.value }
            })
            return vObj
        } else return {}
    }, [properties])

    return { values }
}

export default usePropertiesHook
