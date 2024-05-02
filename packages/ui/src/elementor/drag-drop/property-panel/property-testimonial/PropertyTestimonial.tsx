"use client"

import { useState, useEffect } from "react"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import { PropertiesComponentProps } from "../../../../utils/index"
import { UseFormSetValue } from "react-hook-form"
import { PropertyImageSelector } from "../property-image-selector"
import { PropertyText } from "../property-text"
import { PropertySelector } from "../property-selector"

interface PropertyTestimonialInterface {
    defaultValue?: TestimonialCardType[]
    onChange?: UseFormSetValue<PropertiesComponentProps>
}

export type TestimonialCardType = {
    title: string
    content: string
    image: string
    star: string
    description: string
}

export const PropertyTestimonial: React.FC<PropertyTestimonialInterface> = ({
    defaultValue,
    onChange
}) => {
    const [cardList, setCardList] = useState<TestimonialCardType[]>([])
    const [isSettle, setIsSettle] = useState<boolean>(false)

    const updateImgList = () => {
        const cards = [...cardList]
        cards.push({
            title: "",
            content: "",
            image: "",
            star: "",
            description: ""
        })
        setCardList(cards)
    }

    const removeCard = (idx: number) => {
        const cards = [...cardList]
        cards.splice(idx, 1)
        setCardList(cards)
    }

    const modifyCard = (field: string, v: string, idx: number) => {
        const newCardList = [...cardList]
        newCardList[idx] = {
            ...newCardList[idx],
            [field]: v
        }
        setCardList(newCardList)
    }

    useEffect(() => {
        onChange(cardList)
    }, [cardList])

    useEffect(() => {
        if (!isSettle && defaultValue) {
            setCardList(defaultValue ?? [])
            setIsSettle(true)
        }
    }, [defaultValue])

    return (
        <div className="space-y-3">
            {cardList.map((l, idx) => {
                return (
                    <div className="space-y-3">
                        <span className="text-font-bold">{`Testimonial Card ${idx + 1}`}</span>
                        <AdminButton
                            label="Remove Testimonial Card"
                            style={{ width: "100%" }}
                            onClick={() => {
                                removeCard(idx)
                            }}
                        />
                        <div>
                            <span>Title</span>
                            <PropertyText
                                defaultValue={l.title}
                                onChange={(v) => {
                                    modifyCard("title", v, idx)
                                }}
                            />
                        </div>
                        <div>
                            <span>Content</span>
                            <PropertyText
                                defaultValue={l.content}
                                onChange={(v) => {
                                    modifyCard("content", v, idx)
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <span>Image</span>
                            <PropertyImageSelector
                                value={l.image}
                                onChange={(v) => {
                                    modifyCard("image", v, idx)
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <span>Star</span>
                            <PropertySelector
                                defaultValue={l.star}
                                options={[
                                    { label: "1", value: 1 },
                                    { label: "2", value: 2 },
                                    { label: "3", value: 3 },
                                    { label: "4", value: 4 },
                                    { label: "5", value: 5 }
                                ]}
                                onChange={(v) => {
                                    modifyCard("star", v, idx)
                                }}
                            />
                        </div>
                        <div>
                            <span>Description</span>
                            <PropertyText
                                defaultValue={l.description}
                                onChange={(v) => {
                                    modifyCard("description", v, idx)
                                }}
                            />
                        </div>
                    </div>
                )
            })}
            <AdminButton
                label="Add Testimonial Card"
                style={{ width: "100%" }}
                onClick={() => {
                    updateImgList()
                }}
            />
        </div>
    )
}
