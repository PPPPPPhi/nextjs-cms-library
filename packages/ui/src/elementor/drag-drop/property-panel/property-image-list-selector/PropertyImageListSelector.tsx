"use client"

import { useState, useEffect } from "react"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import { PropertiesComponentProps } from "../../../../utils/index"
import { UseFormSetValue } from "react-hook-form"
import { PropertyImageSelector } from "../property-image-selector"

interface PropertyImageListSelectorInterface {
    defaultValue?: string[]
    onChange?: UseFormSetValue<PropertiesComponentProps>
}

export const PropertyImageListSelector: React.FC<
    PropertyImageListSelectorInterface
> = ({ defaultValue, onChange }) => {
    const [imgList, setImgList] = useState<string[]>([])
    const [isSettle, setIsSettle] = useState<boolean>(false)

    const updateImgList = () => {
        const imgs = [...imgList]
        imgs.push("")
        setImgList(imgs)
    }

    const modifyImage = (v: string, idx: number) => {
        const newImgList = [...imgList]
        newImgList[idx] = v
        setImgList(newImgList)
    }

    const removeImage = (idx: number) => {
        const newImgList = [...imgList]
        newImgList.splice(idx, 1)
        setImgList(newImgList)
    }

    useEffect(() => {
        //@ts-ignore
        onChange(imgList)
    }, [imgList])

    useEffect(() => {
        if (!isSettle && defaultValue) {
            setImgList(defaultValue ?? [])
            setIsSettle(true)
        }
    }, [defaultValue])

    return (
        <div className="space-y-3">
            {imgList.map((l, idx) => (
                <div>
                    <div className="space-y-2">
                        <AdminButton
                            label="Remove Image"
                            style={{ width: "100%" }}
                            onClick={() => {
                                removeImage(idx)
                            }}
                        />
                        <PropertyImageSelector
                            value={l}
                            onChange={(v) => {
                                modifyImage(v, idx)
                            }}
                        />
                    </div>
                </div>
            ))}
            <AdminButton
                label="Add Image"
                style={{ width: "100%" }}
                onClick={() => {
                    updateImgList()
                }}
            />
        </div>
    )
}
