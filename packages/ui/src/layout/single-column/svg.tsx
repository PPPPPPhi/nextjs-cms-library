import { SvgProps } from "../../core/utils/type/index"

export const SingleColumnSvg: React.FC<SvgProps> = ({
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
            <path d="M0 0v17h17v-17h-17zM16 16h-15v-15h15v15z"></path>
        </svg>
    )
}
