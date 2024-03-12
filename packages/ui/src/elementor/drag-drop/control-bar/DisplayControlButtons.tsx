import { SvgProps } from "@nextjs-cms-library/ui/index"

export const ToolsSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-gear-fill"
                viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
        </div>
    )
}

export const PreviousStepSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-arrow-left-circle-fill"
                viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
        </div>
    )
}

export const NextStepSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-arrow-right-circle-fill"
                viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
        </div>
    )
}

export const ExpandSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-arrows-expand-vertical"
                viewBox="0 0 16 16">
                <path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8" />
            </svg>
        </div>
    )
}

export const CollpaseSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-arrows-collapse-vertical"
                viewBox="0 0 16 16">
                <path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M0 8a.5.5 0 0 1 .5-.5h3.793L3.146 6.354a.5.5 0 1 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8.5H.5A.5.5 0 0 1 0 8m11.707.5 1.147 1.146a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2a.5.5 0 0 1 .708.708L11.707 7.5H15.5a.5.5 0 0 1 0 1z" />
            </svg>
        </div>
    )
}

export const MobileSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-phone"
                viewBox="0 0 16 16">
                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg>
        </div>
    )
}

export const WebSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-laptop"
                viewBox="0 0 16 16">
                <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
            </svg>
        </div>
    )
}

export const HomeSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-house"
                viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
        </div>
    )
}

export const RedoSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-arrow-clockwise"
                viewBox="0 0 16 16">
                <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
        </div>
    )
}

export const UndoSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-arrow-counterclockwise"
                viewBox="0 0 16 16">
                <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
            </svg>
        </div>
    )
}

export const PreviewSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-eye-fill"
                viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
            </svg>
        </div>
    )
}

export const PenSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
            </svg>
        </div>
    )
}
