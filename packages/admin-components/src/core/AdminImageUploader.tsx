import { useState } from "react"
import styles from "../AdminControl.module.scss"

interface AdminImageUploaderInterface {
    image: string
    disabled?: boolean
    style?: React.CSSProperties
}

export const AdminImageUploader: React.FC<AdminImageUploaderInterface> = ({
    image,
    disabled,
    style
}) => {
    const [img, setImg] = useState<File[]>()
    const [imgPreviews, setImgPreviews] = useState<any>([])

    const handleMultipleImage = (event: any) => {
        const files = [...event.target.files]
        setImg(files)

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
        <div className="d-flex align-items-center">
            {imgPreviews?.map((preview: any, index: number) => (
                <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    style={{ width: 100, height: "auto" }}
                />
            ))}
            <div
                className={`${styles.adminButton} d-flex align-items-center justify-content-center shadow mx-2`}
                style={{
                    width: "max-content",
                    height: "max-content",
                    ...style,
                    cursor: disabled ? "default" : "pointer",
                    background: disabled
                        ? "#CCCCCC"
                        : "var(--static-color-primary)"
                }}>
                <label className="s-text-color-nu text-level-remark cursor-pointer">
                    Upload Image
                    <input
                        style={{ display: "none" }}
                        type="file"
                        onChange={handleMultipleImage}
                    />
                </label>
            </div>
        </div>
    )
}
