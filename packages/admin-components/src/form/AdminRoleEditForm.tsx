import { useEffect, useState, useMemo } from "react"
import { AdminCheckboxInput, AdminTextInput } from "../input"
import { functionType, siteType } from "@nextjs-cms-library/db-services/index"
import * as _ from "lodash"
import { FUNCTION_CATEGORIES } from "../../../role-management/src/constants/Functions"

interface AdminRoleEditFormInterface {
    onFormValueChange: (v: roleType) => void
    getFunctionOptions: () => [functionType[], siteType[]]
    role: roleType
}

type functionCheckList = {
    checked: boolean
} & functionType
type functionTypes = {
    functionId: string
    name: string
    description: string
}

type roleType = {
    _id: string
    roleName: string
    sites: string[]
    description: string
    functions_lookUp: functionTypes[] | functionType[]
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
    const [roleEditList, setRoleEditList] = useState<functionCheckList[]>()

    const { roleName, description } = role

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

    const handleFunctionChange = (id: string, v: boolean) => {
        const editList = [...(roleEditList as functionCheckList[])]
        const editItemIndex = editList.findIndex((l) => l._id === id)
        editList[editItemIndex].checked = v
        setRoleEditList(editList)
        setInput((v) => ({
            ...(v as roleType),
            functions: editList.filter((i) => i.checked) ?? []
        }))
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
        if (functions) {
            const selectedList = (role.functions || []).map((k) => k.functionId)
            // const combinedList = functions.map((j) => {
            //     const isSelected = selectedList.includes(j._id)
            //     return {
            //         ...j,
            //         checked: isSelected
            //     }
            // }, [])
            // setRoleEditList(combinedList)
        }
    }, [functions])

    useEffect(() => {
        if (inputs) onFormValueChange(inputs as roleType)
    }, [inputs])

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
                                {functions[l].map((k, idx) => (
                                    <div className="px-1">
                                        <AdminCheckboxInput
                                            key={`admin_check_box_input_${idx}`}
                                            inputLabel={
                                                idx === 0
                                                    ? FUNCTION_CATEGORIES[l] ??
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
                                                handleFunctionChange(k._id, v)
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
