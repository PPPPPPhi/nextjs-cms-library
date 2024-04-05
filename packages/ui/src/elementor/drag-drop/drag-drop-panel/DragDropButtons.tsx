import { SvgProps } from "../../../core/utils/index"

export const DuplicateSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill="currentColor"
                className="bi bi-copy"
                viewBox="0 0 16 16">
                <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
            </svg>
        </div>
    )
}

export const DeleteSvg: React.FC<SvgProps> = ({ width = 16, height = 16 }) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
        </div>
    )
}

export const AddSvg: React.FC<SvgProps> = ({ width = 16, height = 16 }) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill="currentColor"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
        </div>
    )
}

export const SaveSvg: React.FC<SvgProps> = ({ width = 16, height = 16 }) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill="currentColor"
                className="bi bi-floppy2-fill"
                viewBox="0 0 16 16">
                <path d="M12 2h-2v3h2z" />
                <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1" />
            </svg>
        </div>
    )
}
