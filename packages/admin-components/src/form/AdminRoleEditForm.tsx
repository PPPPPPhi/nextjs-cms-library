import { useEffect, useState, useMemo } from "react"
import { AdminCheckboxInput, AdminTextInput } from "../input"
import { functionType, siteType } from "@nextjs-cms-library/db-services/index"
import * as _ from "lodash"
import { FUNCTION_CATEGORIES } from "../../../role-management/src/constants/Functions"

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
        const funcList = _.cloneDeep(func)
        const funcItemIdx = funcList.findIndex((l) => l === id)
        if (funcItemIdx > -1) funcList.splice(funcItemIdx, 1)
        else funcList.push(id)
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

    return (
        <div className="d-flex flex-column space-y-6 s-section-primary p-2">
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
            <div className="d-flex flex-wrap">
                {(sites || []).map((k, idx) => (
                    <AdminCheckboxInput
                        key={`admin_check_box_${idx}`}
                        inputLabel={idx === 0 ? "Affective site(s)" : undefined}
                        label={k.name}
                        defaultValue={
                            inputs.sites.includes("*")
                                ? true
                                : (inputs.sites || []).includes(k.name)
                        }
                        onChange={() => {
                            handleSiteChange(k.name)
                        }}
                    />
                ))}
            </div>

            <div>
                <span className="s-text-color-alpha text-font-medium mb-1">
                    Functions
                </span>
                <div className="d-flex flex-wrap">
                    {(Object.keys(functions ?? {}) ?? []).map((l) => {
                        return (
                            <div className="d-flex flex-column col-12 col-md-6 col-lg-4">
                                {(functions?.[l] ?? []).map((k, idx) => (
                                    <div className="px-1">
                                        <AdminCheckboxInput
                                            key={`admin_check_box_input_${idx}`}
                                            inputLabel={
                                                idx === 0
                                                    ? //@ts-ignore
                                                      FUNCTION_CATEGORIES[l] ??
                                                      "Custom"
                                                    : null
                                            }
                                            label={
                                                <span>
                                                    <span>{k.name}</span>
                                                    <span
                                                        className="text-font-light text-level-remark"
                                                        style={{
                                                            color: "black"
                                                        }}>{`- ${k.description}`}</span>
                                                </span>
                                            }
                                            defaultValue={
                                                !!inputs.functions_lookUp.find(
                                                    (j) =>
                                                        j.functionId ===
                                                        k.functionId
                                                )
                                            }
                                            onChange={(v) => {
                                                console.log("kkkkk", k)
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
