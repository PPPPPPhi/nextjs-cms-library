import React, { useState } from "react"

interface AdminHoverBoxInterface {}

export const AdminHoverBox: React.FC<AdminHoverBoxInterface> = ({}) => {
    const [style, setStyle] = useState({ display: "none" })

    return (
        <div className="App">
            <h2>Hidden Button in the box. Move mouse in the box</h2>
            <div
                style={{
                    border: "1px solid gray",
                    width: 300,
                    height: 300,
                    padding: 10,
                    margin: 100
                }}
                onMouseEnter={(e) => {
                    setStyle({ display: "block" })
                }}
                onMouseLeave={(e) => {
                    setStyle({ display: "none" })
                }}>
                <button style={style}>Click</button>
            </div>
        </div>
    )
}
