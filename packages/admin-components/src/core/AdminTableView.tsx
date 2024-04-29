import { useMemo } from "react"
import styles from "../AdminControl.module.scss"

interface AdminTableViewInterface {
    data: any
    labels: { [s: string]: string }
    headers: string[]
    addition?: React.ReactNode
}

export const AdminTableView: React.FC<AdminTableViewInterface> = ({
    data,
    labels,
    headers,
    addition
}) => {
    return (
        <div className={`w-100 p-2 ${styles.adminTableView}`}>
            <table>
                <tr>
                    {(headers ?? []).map((l) => (
                        <th
                            className="s-section-primary"
                            colSpan={headers.length === 1 ? 2 : headers.length}>
                            {l}
                        </th>
                    ))}
                </tr>
                {(Object.keys(labels) ?? []).map((l) => (
                    <tr>
                        <td>{labels[l]}</td>
                        <td>{data?.[l] ?? ""}</td>
                    </tr>
                ))}
                {addition && (
                    <tr>
                        <td colSpan={2}>{addition}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}
