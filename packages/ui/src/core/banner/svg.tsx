import { SvgProps } from "../../core/utils/type/index"

export const BannerSvg: React.FC<SvgProps> = ({
    classname,
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <svg
            stroke="currentColor"
            fill="#000000"
            height={height}
            width={width}
            stroke-width="0"
            version="1.1"
            viewBox="0 0 17 17"
            xmlns="http://www.w3.org/2000/svg">
            <g></g>
            <path d="M2 14h13v-11h-13v11zM3 4h11v9h-11v-9z"></path>
            <path d="M16 4.531h1v7.938h-1v-7.938z"></path>
            <path d="M0 4.531h1v7.938h-1v-7.938z"></path>
        </svg>
    )
}
