"use client"

import React from "react"
import { WidgetProps } from "../../core/utils/type/index"
import { PreviewSelectImage } from "../utils"
import { useParams, useRouter } from "next/navigation"
import usePropertiesHook from "../hook/usePropertiesHook"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import { useState, useEffect } from "react"

type ProductListProps = WidgetProps & { isMobileView: boolean }

export type productCategoryType = {
    tabName: string
    category: string
    pageSize: string
    themeColor: string
}

interface NavButtonInterface {
    direction: "left" | "right"
}

const NavButton: React.FC<NavButtonInterface> = ({ direction }) => {
    const isLeft = direction === "left"

    return (
        <div
            className="d-flex align-items-center justify-content-between position-absolute top-50"
            style={{ right: isLeft ? "none" : 0 }}>
            <div
                className="position-absolute d-flex align-items-center justify-content-center"
                style={{
                    width: 42,
                    height: 42,
                    background: "#FFF",
                    borderRadius: 21,
                    zIndex: 1,
                    top: "-21px",
                    left: isLeft ? "-16px" : "none",
                    right: !isLeft ? "-8px" : "none"
                }}>
                <div
                    style={{
                        width: 40,
                        height: 40,
                        background: "#FE530A",
                        borderRadius: 20
                    }}>
                    A
                </div>
            </div>
        </div>
    )
}

interface SectionHeaderInterface {}

export const SectionHeader: React.FC<SectionHeaderInterface> = () => {
    return (
        <div
            style={{
                flex: 1,
                height: 48,
                background: "#FE530A",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}>
            Shredder Offer
        </div>
    )
}

export const ProductList: React.FC<ProductListProps> = ({
    properties,
    isMobileView
}) => {
    const { site } = useParams()
    const { values } = usePropertiesHook(properties)
    const router = useRouter()

    const { product_list_title } = values ?? {}

    const [categoryList, setCategoryList] = useState<productCategoryType[]>([
        {
            tabName: "Hot Product",
            category: "hot",
            pageSize: "5",
            themeColor: "Orange"
        }
    ])
    console.log("poooperty", values)

    return (
        <div className="d-flex flex-column">
            A
            <span className="text-level-body text-font-bold">
                {product_list_title}
            </span>
            <div className="d-flex flex-column  p-2">
                <div className="d-flex w-100">
                    <SectionHeader />
                    <SectionHeader />
                </div>
                <div className="w-100 d-flex position-relative" style={{}}>
                    <NavButton direction="left" />
                    <NavButton direction="right" />
                    <div
                        className="w-100 position-relative"
                        style={{
                            border: "8px solid #FE530A",
                            padding: "32px 42px",
                            borderBottomRightRadius: 30,
                            borderBottomLeftRadius: 30
                        }}>
                        <div className="d-flex">
                            <div
                                className="d-flex"
                                style={{
                                    width: isMobileView ? "100%" : "20%",
                                    background: "yellow",
                                    height: 300
                                }}>
                                A
                            </div>
                            <div
                                className="d-flex"
                                style={{
                                    width: isMobileView ? "100%" : "20%",
                                    background: "yellow",
                                    height: 300
                                }}>
                                A
                            </div>
                            <div
                                className="d-flex"
                                style={{
                                    width: isMobileView ? "100%" : "20%",
                                    background: "yellow",
                                    height: 300
                                }}>
                                A
                            </div>
                            <div
                                className="d-flex"
                                style={{
                                    width: isMobileView ? "100%" : "20%",
                                    background: "yellow",
                                    height: 300
                                }}>
                                A
                            </div>
                            <div
                                className="d-flex"
                                style={{
                                    width: isMobileView ? "100%" : "20%",
                                    background: "yellow",
                                    height: 300
                                }}>
                                A
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
