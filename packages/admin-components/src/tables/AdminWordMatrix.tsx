import * as _ from "lodash"
import {
    useState,
    useEffect,
    useReducer,
    forwardRef,
    useImperativeHandle
} from "react"
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

import {
    AdminTableHeaderCell,
    AdminTableRowCell,
    AdminTableBadge,
    AdminTableDescRowCell,
    AdminTableDateCell,
    AdminTableActionButton,
    AdminTableEditButton,
    AdminTableCollapse
} from "./components"

type columnNameType = String
type columnType = {
    column: string
    en: string
    tc: string
}

// This is the raw data that will be passed to the table
const rawData: any = {
    en: {
        firstName: "First Name",
        lastName: "Last Name",
        price: "Price",
        footer: {
            privacyPolicy: "Privacy Policy",
            termToUse: "Terms To Use",
            sitemap: "Sitemap",
            contactUs: "Contact Us",
            licenseAndPermit: "License and Permit",
            aboutUs: "About Us",
            allCake: "All Cake",
            storeAddress: "Store Address",
            shoppingGuidelines: "Shopping Guidelines",
            cakeVouchers: "Cake Vouchers",
            breadPackaged: "Bread & Packaged",
            dessert: "Dessert"
        }
    },
    tc: {
        firstName: "名字",
        lastName: "姓氏",
        price: "價格",
        footer: {
            privacyPolicy: "私隱政策",
            termToUse: "使用條款",
            sitemap: "網站地圖",
            contactUs: "聯絡我們",
            licenseAndPermit: "牌照及許可證",
            aboutUs: "關於我們",
            allCake: "所有蛋糕",
            storeAddress: "商店地址",
            shoppingGuidelines: "購物指南",
            cakeVouchers: "蛋糕券",
            breadPackaged: "麵包和包裝",
            dessert: "甜點"
        }
    },
    sc: {
        firstName: "名字",
        lastName: "姓氏",
        price: "价格",
        footer: {
            privacyPolicy: "私隱政策",
            termToUse: "使用条款",
            sitemap: "网站地图",
            contactUs: "联络我们",
            licenseAndPermit: "牌照及许可证",
            aboutUs: "关于我们",
            allCake: "所有蛋糕",
            storeAddress: "商店地址",
            shoppingGuidelines: "购物指南",
            cakeVouchers: "蛋糕券",
            breadPackaged: "面包和包装",
            dessert: "甜点"
        }
    }
}

// This function flattens the object
//@ts-ignore
const flattenObj = (ob) => {
    // The object which contains the
    // final result
    let result = {}

    // loop through the object "ob"
    for (const i in ob) {
        // We check the type of the i using
        // typeof() function and recursively
        // call the function again
        if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
            const temp = flattenObj(ob[i])
            for (const j in temp) {
                // Store temp in result
                //@ts-ignore
                result[i + "." + j] = temp[j]
            }
        }

        // Else store ob[i] in result directly
        else {
            //@ts-ignore
            result[i] = ob[i]
        }
    }
    return result
}

// This funvtion convert the flattenedObj to desired Column form
function convertJsonToData(flattenedObj: any): any[] {
    //@ts-ignore

    const data = []

    // Get all the keys from the JSON object
    const keys = Object.keys(rawData)

    // Iterate over each key
    keys.forEach((key) => {
        // Get the inner object
        const innerObject = flattenedObj[key]

        // Get all the keys from the inner object
        const innerKeys = Object.keys(innerObject)

        // Iterate over each inner key
        innerKeys.forEach((innerKey) => {
            // Find the existing row in the data array
            //@ts-ignore

            let row = data.find((row) => row.column === innerKey)

            // If the row doesn't exist, create it
            if (!row) {
                row = { column: innerKey }
                data.push(row)
            }

            // Add the value to the row
            row[key] = innerObject[innerKey]
        })
    })

    //@ts-ignore

    return data
}

interface AdminWordMatrixIterface {
    ref: any
    langColumn: string[]
}

const AdminWordMatrix: React.FC<AdminWordMatrixIterface> = forwardRef(
    ({ langColumn }, ref) => {
        const rerender = useReducer(() => ({}), {})[1]
        const [flattenedObj, setFlattenedObj] = useState({})
        const [data, setData] = useState<columnType[]>([])
        const [updatedData, setUpdatedData] = useState<{}>({})
        const columnHelper = createColumnHelper<columnType>()
        const [columns, setColumns] = useState<ColumnDef<columnType, string>[]>(
            []
        )

        useImperativeHandle(ref, () => ({
            getWordListData() {
                return updatedData
            }
        }))

        //This component is an non-editable component for column
        //@ts-ignore

        const ColumnCell = ({ getValue, row, column, table }) => {
            const initialValue = getValue()
            // use raw value seems better
            // function getLastString(input: string): string {
            //     const parts = input.split(".")
            //     //@ts-ignore

            //     return parts[parts.length - 1]
            // }

            return <AdminTableHeaderCell label={initialValue} />
        }

        //This component is an editable component
        //@ts-ignore

        const TableCell = ({ getValue, row, column, table }) => {
            const initialValue = getValue()
            const [value, setValue] = useState(initialValue)

            useEffect(() => {
                setValue(initialValue)
            }, [initialValue])

            const onBlur = () => {
                table.options.meta?.updateData(row.index, column.id, value)
            }

            return (
                <input
                    className="w-100 px-1"
                    style={{ borderRadius: 5 }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                />
            )
        }

        //This useEffect flatten and set the flattenedObj into Data
        useEffect(() => {
            let tempFlattenedObj = {}
            for (const [key, value] of Object.entries(rawData)) {
                //@ts-ignore

                tempFlattenedObj[key] = flattenObj(value)
            }
            setFlattenedObj(tempFlattenedObj)
            setData(convertJsonToData(tempFlattenedObj))
        }, [rawData])

        //This useEffect defineds the columnDef for the table
        useEffect(() => {
            const tempColumns: ColumnDef<columnType, string>[] = []
            ;["column", ...langColumn].forEach((name: columnNameType) => {
                tempColumns.push(
                    //@ts-ignore

                    columnHelper.accessor(name, {
                        cell: name === "column" ? ColumnCell : TableCell,
                        header: ({ table }) => (
                            //@ts-ignore
                            <AdminTableHeaderCell label={name} />
                        )
                    })
                )
            })
            setColumns(tempColumns)
        }, [])

        const table = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            meta: {
                updateData: (
                    rowIndex: number,
                    columnId: string,
                    value: string
                ) => {
                    //@ts-ignore

                    setData((old) =>
                        old.map((row, index) => {
                            if (index === rowIndex) {
                                return {
                                    ...old[rowIndex],
                                    [columnId]: value
                                }
                            }
                            return row
                        })
                    )
                }
            }
        })

        // Construct an updatedData whenever Data changed
        useEffect(() => {
            let updatedData: any = {}
            langColumn.forEach((lang) => {
                data.forEach((row) => {
                    const fieldName = row.column
                    _.set(
                        updatedData,
                        [lang, ...fieldName.split(".")],
                        //@ts-ignore

                        row[lang]
                    )
                    //updatedData[lang][fieldName] = row[lang];
                })
            })
            setUpdatedData(updatedData)
        }, [data])

        return (
            <div className="p-2 w-100">
                <table className="shadow w-100">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table?.getRowModel()?.rows?.map((row, index) => (
                            <tr
                                key={row.id}
                                style={{
                                    backgroundColor:
                                        index % 2 == 0 ? "#f2f2f2" : "#fafafa"
                                }}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="h-4" />
            </div>
        )
    }
)

AdminWordMatrix.displayName = "AdminWordMatrix"
export default AdminWordMatrix
