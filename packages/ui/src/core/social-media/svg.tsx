import { SvgProps } from "../utils/type/index"

export const SocialMediaSvg: React.FC<SvgProps> = ({
    classname,
    width = 16,
    height = 16
}) => {
    return (
        <svg
            stroke="currentColor"
            fill="#000000"
            stroke-width="0"
            viewBox="0 0 512 512"
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M384 336a63.78 63.78 0 0 0-46.12 19.7l-148-83.27a63.85 63.85 0 0 0 0-32.86l148-83.27a63.8 63.8 0 1 0-15.73-27.87l-148 83.27a64 64 0 1 0 0 88.6l148 83.27A64 64 0 1 0 384 336z"></path>
        </svg>
    )
}
