import { MultiSelect } from "react-multi-select-component"
import { useState, useEffect } from "react"

interface AdminMultiSelectInterface {
    onChange: (r: string[]) => void
    options: { label: string; value: any }[]
    value: string[]
    style?: React.CSSProperties
    placeHolder?: string
    dialog?: string
}

type MultiSelectType = {
    label: string
    value: string
}

export const AdminMultiSelect: React.FC<AdminMultiSelectInterface> = ({
    onChange,
    options,
    value,
    style,
    placeHolder,
    dialog
}) => {
    const [selectedList, setSelectedList] = useState<MultiSelectType[]>([])

    useEffect(() => {
        const list: MultiSelectType[] = []

        const v = typeof value === "string" ? [value] : value

        v?.map((value: string) => {
            const found: MultiSelectType | undefined = options?.find(
                (option) => option.value == value
            )
            if (found) list.push(found)
            return
        })
        setSelectedList(list)
    }, [value])

    const customValueRenderer = (selected: any, _options: any) => {
        return (
            <div
                className="d-flex flex-wrap space-x-1 overflow-auto align-items-center"
                style={{ height: 38 }}>
                {selected.length
                    ? selected?.map(({ label, value }: any) => (
                          <div className="my-1 s-section-secondary px-3 rounded-4 d-flex align-items-center py-1">
                              <span className="text-level-caption text-font-medium s-text-color-nu">
                                  {label}
                              </span>
                          </div>
                      ))
                    : placeHolder ?? <span>Please Select your option(s)</span>}
            </div>
        )
    }

    return (
        <div className="w-100 d-flex align-items-center">
            <div style={{ flex: 1, height: 40, ...style }}>
                <MultiSelect
                    className={`s-filter-dropdown`}
                    options={options}
                    labelledBy={"Select"}
                    isCreatable={true}
                    valueRenderer={customValueRenderer}
                    onChange={(evt: any) => {
                        onChange(evt)
                        return
                    }}
                    // @ts-ignore
                    value={selectedList ?? []}
                />
            </div>
            {dialog && (
                <div className="p-2" style={{ flex: 1 }}>
                    <div
                        className="p-2 shadow s-section-quaternary rouded-2"
                        style={{ borderLeft: "2px solid #CFCFCF" }}>
                        <span>{dialog}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
