import { MultiSelect } from "react-multi-select-component"

interface AdminMultiSelectInterface {
    onChange: (r: string[]) => void
    options: { label: string; value: any }[]
    value: string[]
    style?: React.CSSProperties
    placeHolder?: string
}

export const AdminMultiSelect: React.FC<AdminMultiSelectInterface> = ({
    onChange,
    options,
    value,
    style,
    placeHolder
}) => {
    const customValueRenderer = (
        selected: { label: string; value: any }[],
        _options: any
    ) => {
        return (
            <div
                className="d-flex flex-wrap space-x-1 overflow-auto"
                style={{ height: 38 }}>
                {selected.length
                    ? selected.map(({ label }) => (
                          <div className="my-1 s-section-secondary px-3 rounded-4 d-flex align-items-center py-1">
                              <span className="text-level-caption text-font-medium s-text-color-nu">
                                  {label}
                              </span>
                          </div>
                      ))
                    : placeHolder ?? "Please Select your option(s)"}
            </div>
        )
    }

    return (
        <div className="w-100" style={{ ...style }}>
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
                value={(value as string[]) ?? []}
            />
        </div>
    )
}
