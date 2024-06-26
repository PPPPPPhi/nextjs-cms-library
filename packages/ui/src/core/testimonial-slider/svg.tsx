import { SvgProps } from "../utils/type/index"

export const TestimonialSVG: React.FC<SvgProps> = ({
    classname,
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            version="1.1"
            viewBox="0 0 17 17"
            height={height}
            width={width}
            xmlns="http://www.w3.org/2000/svg">
            <g></g>
            <path d="M0 1v14h17v-14h-17zM16 14h-15v-12h15v12zM4.646 10.354l-2.353-2.354 2.354-2.354 0.707 0.707-1.647 1.647 1.646 1.646-0.707 0.708zM11.646 9.646l1.647-1.646-1.646-1.646 0.707-0.707 2.353 2.353-2.354 2.354-0.707-0.708z"></path>
        </svg>
    )
}
