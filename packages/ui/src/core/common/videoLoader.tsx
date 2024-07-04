import ReactPlayer from "react-player"
import { useParams } from "next/navigation"

interface NextImageApdatorInterface {
    isStatic?: boolean
}

type VideoApdatorType = {
    url: string
}

type loaderType = {
    src: string
}

export const VideoAdaptor: React.FC<
    NextImageApdatorInterface & VideoApdatorType
> = (props) => {
    const { isStatic, url, ...rest } = props
    const { site } = useParams()

    const getImagePathById = () => {
        const siteSlug = site ?? "gallery"
        const value = url

        return `${process.env.NEXT_IMAGE_UPLOAD_PATH}/${siteSlug}${value}`
    }

    const videoLoader = ({ src }: loaderType) => {
        if (!isStatic) {
            const res = `${getImagePathById()}`

            return res
        } else return src
    }

    return (
        <div>
            {url && (
                <ReactPlayer
                    className="react-player"
                    width="100%"
                    height="100%"
                    url={videoLoader({ src: url })}
                    controls={true}
                    playing={true}
                    loop={true}
                    volume={0.5}
                    muted={false}
                />
            )}
        </div>
    )
}
