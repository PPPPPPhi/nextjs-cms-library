import Image, { ImageProps } from "next/image"

interface NextImageApdatorInterface {
    isStatic?: boolean
}

type loaderType = {
    src: string
}

export const NextImageApdator: React.FC<
    NextImageApdatorInterface & ImageProps
> = (props) => {
    const { isStatic } = props

    const imageLoader = ({ src }: loaderType) => {
        if (!isStatic) return `${process.env.IMAGE_RESOURCES}/${src}`
        else return src
    }

    return (
        <Image
            alt="Image Provided by NextJs CMS"
            loader={imageLoader}
            {...props}
        />
    )
}
