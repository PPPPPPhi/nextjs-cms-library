import { SvgProps } from "../../core/utils/type/index"

export const ThreeColumnSvg: React.FC<SvgProps> = ({
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
            <path d="M0 17h5v-17h-5v17zM1 1h3v15h-3v-15zM6 17h5v-17h-5v17zM7 1h3v15h-3v-15zM12 0v17h5v-17h-5zM16 16h-3v-15h3v15z"></path>
        </svg>
    )
}
