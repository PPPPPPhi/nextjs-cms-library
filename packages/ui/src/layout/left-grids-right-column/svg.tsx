import { SvgProps } from "../../core/utils/type/index"

export const LeftGridsRightColumnSvg: React.FC<SvgProps> = ({
    classname,
    width = 16,
    height = 16
}) => {
    return (
        <svg
            fill="#000000"
            height={height}
            width={width}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 492.308 492.308"
            transform="matrix(-1, 0, 0, 1, 0, 0)">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#CCCCCC"
                stroke-width="15.753855999999999"></g>
            <g id="SVGRepo_iconCarrier">
                <g>
                    <g>
                        <path d="M260.923,0v231.385h231.385V0H260.923z M472.615,211.692h-192v-192h192V211.692z"></path>
                    </g>
                </g>
                <g>
                    <g>
                        <path d="M0,0v492.308h231.385V0H0z M211.692,472.615h-192V19.692h192V472.615z"></path>
                    </g>
                </g>
                <g>
                    <g>
                        <path d="M260.923,260.923v231.385h231.385V260.923H260.923z M472.615,472.615h-192v-192h192V472.615z"></path>
                    </g>
                </g>
            </g>
        </svg>
    )
}
