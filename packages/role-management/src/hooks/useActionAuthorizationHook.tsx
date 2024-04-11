"use client"

import { useState } from "react"

const useActionAuthorization = () => {
    const [actionList, setActionList] = useState()

    const checkAuthorization = () => {
        return true
    }

    return {
        checkAuthorization
    }
}

export default useActionAuthorization
