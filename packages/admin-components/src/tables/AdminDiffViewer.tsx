import { Viewer, Differ } from "json-diff-kit"
import type { DiffResult } from "json-diff-kit"
import { useEffect, useState } from "react"
import "json-diff-kit/dist/viewer.css"

interface AdminDiffViewerInterface {
    sourceJson: any
    targetJson: any
}

export const AdminDiffViewer: React.FC<AdminDiffViewerInterface> = ({
    sourceJson,
    targetJson
}) => {
    const [diff, setDiff] = useState<[DiffResult[], DiffResult[]]>()

    const differ = new Differ({
        detectCircular: true, // default `true`
        maxDepth: Infinity, // default `Infinity`
        showModifications: true, // default `true`
        arrayDiffMethod: "lcs" // default `"normal"`, but `"lcs"` may be more useful
    })

    const constructDiff = () => {
        try {
            if (
                typeof sourceJson === "object" &&
                typeof targetJson === "object"
            ) {
                const d = differ.diff(targetJson, sourceJson)
                setDiff(d as [DiffResult[], DiffResult[]])
            } else {
                const sj = JSON.parse(targetJson)
                const tj = JSON.parse(sourceJson)

                const d = differ.diff(sj, tj)
                setDiff(d as [DiffResult[], DiffResult[]])
            }
        } catch (e) {
            console.log("Format not correct")
        }
    }

    useEffect(() => {
        if (sourceJson && targetJson) {
            console.log("sourceJsonsourceJsonsourceJson", sourceJson)
            console.log("sourceJsonsourceJsonsourceJsonD", targetJson)
            constructDiff()
        } else setDiff(undefined)
    }, [sourceJson, targetJson])

    return (
        <div
            className="d-flex s-section-quaternary overflow-y-auto shadow-sm"
            style={{
                height: 500,
                borderRadius: 12,
                border: "1px solid #F1F1F1"
            }}>
            {diff && (
                <div className="w-100 d-flex flex-column h-100">
                    <div
                        className="d-flex py-2"
                        style={{ borderBottom: "1px solid black" }}>
                        <div style={{ flex: 1 }} className="text-center">
                            <span className="text-font-bold text-level-caption">
                                Source (With)
                            </span>
                        </div>
                        <div style={{ flex: 1 }} className="text-center">
                            <span className="text-font-bold text-level-caption">
                                Target (Compare)
                            </span>
                        </div>
                    </div>
                    <div className="w-100 overflow-auto">
                        <Viewer
                            diff={diff} // required
                            indent={4} // default `2`
                            lineNumbers={true} // default `false`
                            highlightInlineDiff={true} // default `false`
                            inlineDiffOptions={{
                                mode: "word", // default `"char"`, but `"word"` may be more useful
                                wordSeparator: " " // default `""`, but `" "` is more useful for sentences
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
