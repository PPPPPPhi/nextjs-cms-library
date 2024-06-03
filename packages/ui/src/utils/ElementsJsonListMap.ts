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
import { RichTextJson } from "../core/rich-text"
import { TrophyJson } from "../core/trophy"
import { CardJson } from "../core/card"
import { ContactJson } from "../core/contact"
import { EventJson } from "../core/event"
import { HTMLJson } from "../core/html"
import { HotProductJson } from "../core/hot-product"
import { InfoGraphicJson } from "../core/info-graphic"
import { PhotoGalleryJson } from "../core/photo-gallery"
import { SocialMediaJson } from "../core/social-media"
import { SponsorJson } from "../core/sponsor"
import { WebinarJson } from "../core/webinar"
import { SVGNavCardJSON } from "../core/svg-nav-card"
import { SloganJson } from "../core/slogan"
import { TestimonialJSON } from "../core/testimonial-slider"
import { ProductListJson } from "../core/product-list"

export const selectionListMap: Map<string, SelectionJson> = new Map([
    [ElementNameMap.Text, TextJson.selectionTextJson],
    [ElementNameMap.Image, ImageJson.selectionImageJson],
    [ElementNameMap.Banner, BannerJson.selectionBannerJson],
    // [ElementNameMap.List, ListJson.selectionListJson],
    [ElementNameMap.RichText, RichTextJson.selectionRichTextJson],
    // [ElementNameMap.Trophy, TrophyJson.selectionTrophyJson],
    [ElementNameMap.Card, CardJson.selectionCardJson],
    // [ElementNameMap.Contact, ContactJson.selectionContactJson],
    // [ElementNameMap.Event, EventJson.selectionEventJson],
    // [ElementNameMap.HotProduct, HotProductJson.selectionHotProductJson],
    // [ElementNameMap.HTML, HTMLJson.selectionHTMLJson],
    // [ElementNameMap.InfoGraphic, InfoGraphicJson.selectionInfoGraphicJson],
    // [ElementNameMap.PhotoGallery, PhotoGalleryJson.selectionPhotoGalleryJson],
    [ElementNameMap.SocialMedia, SocialMediaJson.selectionSocialMediaJson],
    [ElementNameMap.Sponsor, SponsorJson.selectionSponsorJson],
    // [ElementNameMap.Webinar, WebinarJson.selectionWebinarJson]
    [ElementNameMap.SVGNavCard, SVGNavCardJSON.selectionSVGNavCardJson],
    [ElementNameMap.Slogan, SloganJson.selectionSloganJson],
    [ElementNameMap.Testimonial, TestimonialJSON.selectionTestimonialJson],
    [ElementNameMap.ProductList, ProductListJson.selectionProductListJson]
])

export const dragDropListMap: Map<string, DragDropJson> = new Map([
    [ElementNameMap.Text, TextJson.dragDropTextJson],
    [ElementNameMap.Image, ImageJson.dragDropImageJson],
    [ElementNameMap.Banner, BannerJson.dragDropBannerJson],
    [ElementNameMap.List, ListJson.dragDropListJson],
    [ElementNameMap.RichText, RichTextJson.dragDropRichTextJson],
    [ElementNameMap.Trophy, TrophyJson.dragDropTrophyJson],
    [ElementNameMap.Card, CardJson.dragDropCardJson],
    [ElementNameMap.Contact, ContactJson.dragDropContactJson],
    [ElementNameMap.Event, EventJson.dragDropEventJson],
    [ElementNameMap.HotProduct, HotProductJson.dragDropHotProductJson],
    [ElementNameMap.HTML, HTMLJson.dragDropHTMLJson],
    [ElementNameMap.InfoGraphic, InfoGraphicJson.dragDropInfoGraphicJson],
    [ElementNameMap.PhotoGallery, PhotoGalleryJson.dragDropPhotoGalleryJson],
    [ElementNameMap.SocialMedia, SocialMediaJson.dragDropSocialMediaJson],
    [ElementNameMap.Sponsor, SponsorJson.dragDropSponsorJson],
    [ElementNameMap.Webinar, WebinarJson.dragDropWebinarJson],
    [ElementNameMap.SVGNavCard, SVGNavCardJSON.dragDropSVGNavCardJson],
    [ElementNameMap.Slogan, SloganJson.dragDropSloganJson],
    [ElementNameMap.Testimonial, TestimonialJSON.dragDropTestimonialJson],
    [ElementNameMap.ProductList, ProductListJson.dragDropProductListJson]
])

export const propertiesListMap: Map<string, PropertyJson> = new Map([
    [ElementNameMap.Text, TextJson.propertyTextJson],
    [ElementNameMap.Image, ImageJson.propertyImageJson],
    [ElementNameMap.Banner, BannerJson.propertyBannerJson],
    [ElementNameMap.List, ListJson.propertyListJson],
    [ElementNameMap.RichText, RichTextJson.propertyRichTextJson],
    [ElementNameMap.Trophy, TrophyJson.propertyTrophyJson],
    [ElementNameMap.Card, CardJson.propertyCardJson],
    [ElementNameMap.Contact, ContactJson.propertyContactJson],
    [ElementNameMap.Event, EventJson.propertyEventJson],
    [ElementNameMap.HotProduct, HotProductJson.propertyHotProductJson],
    [ElementNameMap.HTML, HTMLJson.propertyHTMLJson],
    [ElementNameMap.InfoGraphic, InfoGraphicJson.propertyInfoGraphicJson],
    [ElementNameMap.PhotoGallery, PhotoGalleryJson.propertyPhotoGalleryJson],
    [ElementNameMap.SocialMedia, SocialMediaJson.propertySocialMediaJson],
    [ElementNameMap.Sponsor, SponsorJson.propertySponsorJson],
    [ElementNameMap.Webinar, WebinarJson.propertyWebinarJson],
    [ElementNameMap.SVGNavCard, SVGNavCardJSON.propertSVGNavCardJson],
    [ElementNameMap.Slogan, SloganJson.propertSloganJson],
    [ElementNameMap.Testimonial, TestimonialJSON.propertTestimonialJson],
    [ElementNameMap.ProductList, ProductListJson.propertyProductListJson]
])
