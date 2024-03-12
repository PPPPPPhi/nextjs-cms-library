import Image, { ImageProps } from "next/image"

interface NextImageApdatorInterface {
    isStatic?: boolean
}

type loaderType = {
    src: string
}

export const ImageApdator: React.FC<NextImageApdatorInterface & ImageProps> = (
    props
) => {
    const { isStatic, ...rest } = props

    const getImagePathById = () => {
        const site = "demo2"
        const value = "/cake1.png"

        return `${process.env.NEXT_IMAGE_UPLOAD_PATH}/${site}${value}`
    }

    const imageLoader = ({ src }: loaderType) => {
        if (!isStatic)
            return `${process.env.IMAGE_RESOURCES}/${getImagePathById()}`
        else return src
    }

    return <Image loader={imageLoader} {...rest} />
}
