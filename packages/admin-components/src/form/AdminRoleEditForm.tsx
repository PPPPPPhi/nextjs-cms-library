import { useEffect, useState, useMemo } from "react"
import { AdminCheckboxInput, AdminTextInput } from "../input"
import { functionType, siteType } from "@nextjs-cms-library/db-services/index"
import * as _ from "lodash"
import { FUNCTION_CATEGORIES } from "../../../role-management/src/constants/Functions"
import { FaCheck } from "react-icons/fa6"
interface AdminRoleEditFormInterface {
    onFormValueChange: (v: roleType & { functionId: number[] }) => void
    getFunctionOptions: () => Promise<[functionType[], siteType[]]>
    role: roleType
}

type functionCheckList = {
    checked: boolean
} & functionType
type functionTypes = {
    functionId: number
    name: string
    description: string
}

type roleType = {
    _id: string
    roleName: string
    sites: string[]
    description: string
    functions_lookUp: functionTypes[]
}

interface AdminRoleCheckboxInterface {
    isChecked: boolean
    onChange: () => void
    name: string
    description?: string
}

const AdminRoleCheckbox: React.FC<AdminRoleCheckboxInterface> = ({
    isChecked,
    onChange,
    name,
    description
}) => {
    return (
        <div className="d-flex w-100 p-2">
            <div
                className="d-flex w-100 align-items-center cursor-pointer"
                style={{
                    borderRadius: 12,
                    minHeight: 50,
                    border: isChecked
                        ? "2px solid var(--static-bg-secondary)"
                        : "1px solid var(--static-bg-boundary)"
                }}
                onClick={() => onChange()}>
                <div
                    className="mx-2 d-flex align-items-center justify-content-center"
                    style={{ width: 24, height: 24 }}>
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: 18,
                            height: 18,
                            border: isChecked
                                ? "2px solid var(--static-bg-secondary)"
                                : "1px solid var(--staitc-bg-boundary-alpha)",
                            background: isChecked
                                ? "var(--static-bg-secondary)"
                                : "var(--static-bg-quaternary)"
                        }}>
                        {isChecked && (
                            <FaCheck
                                style={{
                                    color: "var(--static-color-text-nu)",
                                    width: 14,
                                    height: 14
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <span className="text-level-content text-font-medium s-text-color-beta">
                        {name}
                    </span>
                    <span className="text-level-remark text-font-medium s-text-color-alpha">
                        {description}
                    </span>
                </div>
            </div>
        </div>
    )
}

export const AdminRoleEditForm: React.FC<AdminRoleEditFormInterface> = ({
    onFormValueChange,
    getFunctionOptions,
    role
}) => {
    const [inputs, setInput] = useState<roleType>(role)
    const [functions, setFunctions] = useState<{
        [k: string]: functionType[]
    }>()
    const [sites, setSites] = useState<siteType[]>([])
    const { roleName, description } = role

    const [func, setFunc] = useState<number[]>(
        role?.functions_lookUp.map((l) => l.functionId) ?? []
    )

    const initializeFunctions = async () => {
        const [functionResp, siteResp] = await getFunctionOptions()
        const grpFunction = _.groupBy(functionResp, (item) =>
            item.functionId.toString().substring(0, 4)
        )
        setFunctions(grpFunction)
        setSites(siteResp)
    }

    useEffect(() => {
        initializeFunctions()
    }, [])

    const handleChange = (field: string, value: string | string[]) => {
        setInput((v) => ({ ...(v as roleType), [field]: value }))
    }

    const handleFunctionChange = (id: number) => {
        console.log("idddd", id)
        const funcList = _.cloneDeep(func)
        const funcItemIdx = funcList.findIndex((l) => l === id)
        if (funcItemIdx > -1) funcList.splice(funcItemIdx, 1)
        else funcList.push(id)

        console.log("funcList", funcList)

        setFunc(funcList)
    }

    const handleSiteChange = (name: string) => {
        let editList = []

        if (inputs.sites.includes("*")) editList = sites.map((l) => l.name)
        else editList = [...(inputs.sites as string[])]

        const editListIdx = editList.findIndex((l) => l === name)
        if (editListIdx > -1) editList.splice(editListIdx, 1)
        else editList.push(name)
        setInput((v) => ({
            ...(v as roleType),
            sites: editList.length === sites.length ? ["*"] : editList
        }))
    }

    useEffect(() => {
        if (inputs)
            onFormValueChange({
                ...(inputs as roleType),
                functionId: [...func]
            })
    }, [inputs, func])

    console.log("inputs.functions_lookUp", inputs.functions_lookUp)

    return (
        <div className="d-flex flex-column space-y-6  p-2">
            <div className="d-flex space-x-3 p-2">
                <AdminTextInput
                    label="Name"
                    defaultValue={roleName}
                    onChange={(v) => handleChange("roleName", v)}
                />
                <AdminTextInput
                    label="Description"
                    defaultValue={description}
                    onChange={(v) => handleChange("description", v)}
                />
            </div>
            <div className="d-flex flex-wrap">
                {(sites || []).map((k, idx) => (
                    <div className="col-4">
                        <AdminRoleCheckbox
                            key={`admin_check_box_${idx}`}
                            name={k.name}
                            isChecked={
                                inputs.sites.includes("*")
                                    ? true
                                    : (inputs.sites || []).includes(k.name)
                            }
                            onChange={() => {
                                handleSiteChange(k.name)
                            }}
                        />
                    </div>
                ))}
            </div>

            <div>
                <span className="s-text-color-beta text-level-content text-font-bold mb-1">
                    Functions
                </span>
                <div className="d-flex flex-wrap">
                    {(Object.keys(functions ?? {}) ?? []).map((l) => {
                        return (
                            <div className="d-flex flex-column col-12 col-md-6 col-lg-4">
                                {(functions?.[l] ?? []).map((k, idx) => (
                                    <div className="px-1">
                                        {idx === 0 && (
                                            <span className="s-text-color-zeta text-level-content text-font-bold">
                                                {/*@ts-ignore*/}
                                                {FUNCTION_CATEGORIES[l] ??
                                                    "Custom"}
                                            </span>
                                        )}
                                        <AdminRoleCheckbox
                                            key={`admin_check_box_input_${idx}`}
                                            name={k.name}
                                            description={k.description}
                                            isChecked={
                                                !!func.find(
                                                    (j) => j === k.functionId
                                                )
                                            }
                                            onChange={() => {
                                                handleFunctionChange(
                                                    k.functionId
                                                )
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
