import React from "react"
import "./mobile.css"

type DisplayMobileGridProps = {
    children: React.ReactNode
}

export const DisplayMobileGrid: React.FC<DisplayMobileGridProps> = ({
    children
}) => {
    return (
        <div className="mobileView">
            <section>
                <div className="outside-border">
                    <div className="silencer"></div>
                    <div className="volume-up"></div>
                    <div className="volume-down"></div>
                    <div className="button-on"></div>
                    <div className="inside-border f-flex flex-column overflow-hidden">
                        <div
                            className="w-100 d-flex justify-content-center"
                            style={{ height: 40 }}>
                            <div className="camera">
                                <div className="camera-dot">
                                    <div className="camera-dot-2"></div>
                                    <div className="camera-dot-3"></div>
                                </div>
                                <div className="camera-speaker"></div>
                            </div>
                        </div>

                        <div
                            className="overflow-y-auto pt-3"
                            style={{ flex: 1 }}>
                            {children}
                        </div>
                        <div
                            className="w-100 d-flex justify-content-center"
                            style={{ height: 40 }}>
                            <div className="bottom-line"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
