import { SvgProps } from "../utils/type/index"

export const RichTextSvg: React.FC<SvgProps> = ({
    classname,
    width = 16,
    height = 16
}) => {
    return (
        <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <rect x="0" fill="none" width="20" height="20"></rect>
                <g>
                    <path d="M3 5h14V3H3v2zm9 8V7H3v6h9zm2-4h3V7h-3v2zm0 4h3v-2h-3v2zM3 17h14v-2H3v2z"></path>
                </g>
            </g>
        </svg>
    )
}
