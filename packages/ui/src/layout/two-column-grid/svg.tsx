import { SvgProps } from "../../core/utils/type/index"

export const TwoColumnSvg: React.FC<SvgProps> = ({
    classname,
    width = 16,
    height = 16
}) => {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            version="1.1"
            viewBox="0 0 17 17"
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg">
            <g></g>
            <path d="M0 17h8v-17h-8v17zM1 1h6v15h-6v-15zM9 0v17h8v-17h-8zM16 16h-6v-15h6v15z"></path>
        </svg>
    )
}
