import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "../core/utils/type/formatType"

import { ElementNameMap } from "./NameMap"

import { TextJson } from "../core/text/index"
import { ImageJson } from "../core/image/index"
import { BannerJson } from "../core/banner/index"
import { ListJson } from "../core/list/index"

export const selectionListMap: Map<string, SelectionJson> = new Map([
    [ElementNameMap.Text, TextJson.selectionTextJson],
    [ElementNameMap.Image, ImageJson.selectionImageJson],
    [ElementNameMap.Banner, BannerJson.selectionBannerJson],
    [ElementNameMap.List, ListJson.selectionListJson]
])

export const dragDropListMap: Map<string, DragDropJson> = new Map([
    [ElementNameMap.Text, TextJson.dragDropTextJson],
    [ElementNameMap.Image, ImageJson.dragDropImageJson],
    [ElementNameMap.Banner, BannerJson.dragDropBannerJson],
    [ElementNameMap.List, ListJson.dragDropListJson]
])

export const propertiesListMap: Map<string, PropertyJson> = new Map([
    [ElementNameMap.Text, TextJson.propertyTextJson],
    [ElementNameMap.Image, ImageJson.propertyImageJson],
    [ElementNameMap.Banner, BannerJson.propertyBannerJson],
    [ElementNameMap.List, ListJson.propertyListJson]
])
