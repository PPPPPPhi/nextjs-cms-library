import { set } from "mongoose"
import { useMemo, useState } from "react"

const useFooterGenerator = (html: string, css: string, script: string) => {
    const [template, setTemplate] = useState("")

    useMemo(() => {
        const t = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                <style>
                    ${css ?? ""}
                </style>
                <script>
                    ${script ?? ""}
                </script>
               
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
                </head>
                <body>
                    ${html ?? ""}
                </body>
            </html>    
        `
        setTemplate(t)
    }, [html, css, script])

    return template
}

export default useFooterGenerator
