import { SvgProps } from "../../core/utils/type/index"

export const PromotionGridSvg: React.FC<SvgProps> = ({
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
            height={height}
            width={width}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8"></path>
            <path d="M3 10h18"></path>
            <path d="M10 3v18"></path>
            <path d="M16 22l5 -5"></path>
            <path d="M21 21.5v-4.5h-4.5"></path>
        </svg>
    )
}
