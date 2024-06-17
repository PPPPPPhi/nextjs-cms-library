"use client"

import React from "react"
// import {
//     MDBCarousel,
//     MDBCarouselInner,
//     MDBCarouselItem,
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBIcon
// } from "mdb-react-ui-kit"
import { WidgetProps } from "../../core/utils/type/index"
import usePropertiesHook from "../hook/usePropertiesHook"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { FaStar } from "react-icons/fa6"
import { PreviewSelectImage } from "../utils"
import { TestimonialCardType } from "../../elementor"

type TestimonialProps = WidgetProps & { isPreview: boolean }

export const Testimonial: React.FC<TestimonialProps> = ({
    properties,
    isPreview
}) => {
    const { values } = usePropertiesHook(properties)
    const { testimonial_slider_title = [] } = values

    if (!testimonial_slider_title || testimonial_slider_title.length === 0)
        return <span className="text-font-bold">Testimonial</span>
    return (
        <Carousel
            showArrows
            autoPlay
            infiniteLoop
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            stopOnHover>
            {testimonial_slider_title?.map((l: TestimonialCardType) => (
                <div className="d-flex align-items-center">
                    <div className="w-100 p-3 d-flex flex-column align-items-center justify-content-center space-y-3">
                        <div>
                            <span className="text-font-ultra-bold text-level-title">
                                {l.title}
                            </span>
                        </div>
                        {l.image && (
                            <div
                                style={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: 50
                                }}>
                                <PreviewSelectImage
                                    value={l?.image?.value}
                                    style={{
                                        borderRadius: 100,
                                        objectFit: "cover"
                                    }}
                                    handler={() => {}}
                                    alt={l?.image?.alt}
                                    destination={
                                        isPreview ? l?.image?.destination : ""
                                    }
                                />
                            </div>
                        )}
                        <div className="d-flex">
                            {new Array(5).fill(undefined).map((k, idx) => {
                                return (
                                    <FaStar
                                        style={{
                                            width: 24,
                                            height: 24,
                                            color:
                                                parseInt(l.star ?? 0) > idx
                                                    ? "#D8B667"
                                                    : "#CFCFCF"
                                        }}
                                    />
                                )
                            })}
                        </div>
                        <span
                            className="text-level-caption text-font-light"
                            style={{ fontStyle: "italic" }}>
                            {l.content}
                        </span>
                        <div
                            style={{
                                width: 300,
                                height: 1,
                                background: "var(--static-color-primary)"
                            }}
                        />
                        <span
                            className="text-level-caption text-font-light"
                            style={{ fontStyle: "italic" }}>
                            {l.description}
                        </span>
                    </div>
                </div>
            ))}
        </Carousel>
    )
}
