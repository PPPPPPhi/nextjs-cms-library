import { SvgProps } from "../../core/utils/type/index"

export const BentoGridSvg: React.FC<SvgProps> = ({
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
            viewBox="0 0 512 512">
            <g>
                <g>
                    <path
                        d="M328.347,0H50.087C22.469,0,0,22.469,0,50.087v278.26c0,27.618,22.469,50.087,50.087,50.087h278.26
                    c27.618,0,50.087-22.469,50.087-50.087V50.087C378.434,22.469,355.965,0,328.347,0z M144.695,144.695h50.087
                    c9.206,0,16.696,7.49,16.696,16.696v50.087h-66.782V144.695z M33.391,50.087c0-9.206,7.49-16.696,16.696-16.696h61.217v178.087
                    H33.391V50.087z M178.087,345.043h-128c-9.206,0-16.696-7.49-16.696-16.696v-83.478h144.695V345.043z M345.043,328.347
                    c0,9.206-7.49,16.696-16.696,16.696H211.478V244.869h133.565V328.347z M345.043,211.478H244.869v-50.087
                    c0-27.618-22.469-50.087-50.087-50.087h-50.087V33.391h183.652c9.206,0,16.696,7.49,16.696,16.696V211.478z"
                    />
                </g>
            </g>
            <g>
                <g>
                    <path
                        d="M428.521,0c-9.22,0-16.696,7.475-16.696,16.696v478.608c0,9.22,7.475,16.696,16.696,16.696
                    c9.22,0,16.696-7.475,16.696-16.696V16.696C445.216,7.475,437.741,0,428.521,0z"
                    />
                </g>
            </g>
            <g>
                <g>
                    <path
                        d="M511.959,494.141L478.568,15.534c-0.642-9.198-8.626-16.12-17.818-15.494c-9.198,0.642-16.135,8.619-15.494,17.818
                    l33.391,478.608c0.614,8.803,7.947,15.535,16.639,15.535c0.391,0,0.784-0.013,1.179-0.041
                    C505.664,511.317,512.6,503.339,511.959,494.141z"
                    />
                </g>
            </g>
        </svg>
    )
}
