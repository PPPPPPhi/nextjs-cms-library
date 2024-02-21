import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "./type/componentFormat"

import { ElementNameMap } from "./NameMap"

import { TextJson } from ".."
import { ImageJson } from ".."
import { BannerJson } from ".."
import { ListJson } from ".."

export const selectionListMap: Map<string, SelectionJson> = new Map([
    [ElementNameMap.Text, TextJson.selectionPanelJson],
    [ElementNameMap.Image, ImageJson.selectionPanelJson],
    [ElementNameMap.Banner, BannerJson.selectionPanelJson],
    [ElementNameMap.List, ListJson.selectionPanelJson]
])

export const dragDropListMap: Map<string, DragDropJson> = new Map([
    [ElementNameMap.Text, TextJson.dragDropJson],
    [ElementNameMap.Image, ImageJson.dragDropJson],
    [ElementNameMap.Banner, BannerJson.dragDropJson],
    [ElementNameMap.List, ListJson.dragDropJson]
])

export const propertiesListMap: Map<string, PropertyJson> = new Map([
    [ElementNameMap.Text, TextJson.propertyJson],
    [ElementNameMap.Image, ImageJson.propertyJson],
    [ElementNameMap.Banner, BannerJson.propertyJson],
    [ElementNameMap.List, ListJson.propertyJson]
])
