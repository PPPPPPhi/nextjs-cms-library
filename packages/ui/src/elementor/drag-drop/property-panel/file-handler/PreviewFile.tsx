import {
    DragDropButton,
    ImageResourceAdaptor,
    ImageResourceOperator,
    NextImageApdator
} from "../../../../utils/index"
import { DisplayControllerButtons } from "../../control-bar/DisplayControlBar"
import { CancelSvg } from "../../control-bar/DisplayControlButtons"
import { DragDropComponentButtons } from "../../drag-drop-panel/DragDropComponent"

type AdminImageGalleryModalProps = {
    onImageSelected: (path: string) => void
}

export const AdminImageGalleryModal: React.FC<AdminImageGalleryModalProps> = ({
    onImageSelected
}) => {
    const imageApdator = new ImageResourceAdaptor()
    const imageOperator = ImageResourceOperator.getInstance(imageApdator)

    return (
        <div
            className={`shadow fixed s-file-selector-modal s-section-primary`}
            style={{}}>
            <div>Select Image</div>
            <div>Image List ....</div>

            <div
                style={{
                    width: "80%",
                    height: 30,
                    borderRadius: 25
                }}
                onClick={() => {
                    console.log(`[modal] confirm`, onImageSelected)
                    onImageSelected("/cake1.png")
                }}
                className={`flex justify-center cursor-pointer s-adminGradientBg shadow mb-1 s-text-color-nu font-medium rounded-full text-sm p-2.5 text-center items-center me-2`}>
                Confirm
            </div>
        </div>
    )
}

type PreviewSelectImageProps = {
    value: string
    site: string
    handler: () => void
}

export const PreviewSelectImage: React.FC<PreviewSelectImageProps> = ({
    site,
    value,
    handler
}) => {
    return (
        <div
            className={`mt-3 rounded`}
            style={{ border: "dashed thin darkgrey" }}>
            <div className="mt-2 s-edit-control-btn flex flex-row justify-cend ">
                <DragDropComponentButtons
                    buttonType={DragDropButton.delete}
                    // svg={<CancelSvg width={22} height={22} />}
                    handleEvent={handler}
                />
            </div>

            <div
                className="col-12 col-md-4 position-relative"
                style={{
                    width: "auto",
                    height: 300
                }}>
                <NextImageApdator
                    src={`${process.env.NEXT_IMAGE_UPLOAD_PATH}/${site}${value}`}
                    alt="profile"
                    isStatic
                    fill
                    style={{
                        objectFit: "contain",
                        objectPosition: "center"
                    }}
                />
            </div>
        </div>
    )
}
