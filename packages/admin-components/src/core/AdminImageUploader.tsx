import { useState, useEffect } from "react"
import styles from "../AdminControl.module.scss"

interface AdminImageUploaderInterface {
    image?: string
    disabled?: boolean
    style?: React.CSSProperties
    onFormValueChange: (v: File[]) => void
}

export const AdminImageUploader: React.FC<AdminImageUploaderInterface> = ({
    image,
    disabled,
    style,
    onFormValueChange
}) => {
    const [imgPreviews, setImgPreviews] = useState<any>([])

    const handleMultipleImage = (event: any) => {
        const files = [...event.target.files]

        onFormValueChange(files)

        const previews: any[] = []
        files.forEach((file) => {
            const reader = new FileReader()
            reader.onload = () => {
                previews.push(reader.result)
                if (previews.length === files.length) {
                    setImgPreviews(previews)
                }
            }
            reader.readAsDataURL(file)
        })
    }

    return (
        <div className="d-flex flex-column space-y-2">
            <div
                className={`${styles.adminButton} d-flex align-items-center justify-content-center mx-2 w-50`}
                style={{
                    ...style,
                    cursor: disabled ? "default" : "pointer",
                    background: disabled
                        ? "#CCCCCC"
                        : "var(--static-color-primary)",
                    padding: 0
                }}>
                <label
                    className="s-text-color-nu text-level-remark cursor-pointer w-100 h-100 text-center"
                    style={{ lineHeight: "46px" }}>
                    Upload Image
                    <input
                        style={{ display: "none" }}
                        type="file"
                        multiple
                        onChange={handleMultipleImage}
                    />
                </label>
            </div>

            <div className="d-flex flex-col w-100">
                {imgPreviews?.map((preview: any, index: number) => (
                    <div className="pb-2">
                        <img
                            key={index}
                            src={preview}
                            alt={`Preview ${index}`}
                            style={{ width: 300, height: "auto" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
