import { useDisplayPanelContext } from ".."

export const EmptyLayoutGrid: React.FC<any> = (props) => {
    const { isPreview, readOnly } = useDisplayPanelContext()

    console.log("empty readOnly", readOnly, isPreview)

    return (
        <div
            className={`s-empty-drag-drop-box text-level-sub-body`}
            style={{ color: "grey", flex: 1 }}>
            {!isPreview && !readOnly && <span>Drag Some Elements</span>}
        </div>
    )
}
