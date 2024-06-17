import { SvgProps } from "../utils/type/index"

export const SVGNavCardSVG: React.FC<SvgProps> = ({
    classname,
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height={height}
            width={width}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M21 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1"></path>
            <path d="M7 8h-3a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-3"></path>
            <path d="M10 8l1.5 8h1l1.5 -8"></path>
        </svg>
    )
}
