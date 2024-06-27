import { useDisplayPanelContext } from ".."

export const EmptyLayoutGrid: React.FC<any> = (props) => {
    const { isPreview, readOnly } = useDisplayPanelContext()
    const { isPreview: isStiePage } = props

    console.log("empty readOnly", readOnly, isPreview, isStiePage)

    return (
        <div
            className={`s-empty-drag-drop-box text-level-sub-body`}
            style={{ color: "grey", flex: 1 }}>
            {!isPreview && !readOnly && !isStiePage && (
                <span>Drag Some Elements</span>
            )}
        </div>
    )
}
