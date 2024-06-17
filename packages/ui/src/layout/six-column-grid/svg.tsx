import { SvgProps } from "../../core/utils/type/index"

export const SixColumnSvg: React.FC<SvgProps> = ({
    classname,
    width = 16,
    height = 16
}) => {
    return (
        <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
            <path d="M14 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M16 8a2 2 0 1 0 -4 0v4"></path>
            <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2"></path>
        </svg>
    )
}
