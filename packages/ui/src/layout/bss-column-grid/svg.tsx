import { SvgProps } from "../../core/utils/type/index"

export const BSSColumnSvg: React.FC<SvgProps> = ({
    classname,
    width = 16,
    height = 16
}) => {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height={height}
            width={width}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M2 1.00073L1 2.00073V14.0007L2 15.0007H14L15 14.0007V2.00073L14 1.00073H2ZM2 14.0007V2.00073H9V14.0007H2ZM10 14.0007V2.00073H14V14.0007H10Z"></path>
        </svg>
    )
}
