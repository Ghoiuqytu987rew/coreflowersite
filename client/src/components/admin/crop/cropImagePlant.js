import React, { useState, useRef } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import {useDispatch, useSelector} from "react-redux";
import {plantsActions} from "../../../redux";

import 'react-image-crop/dist/ReactCrop.css'
import {useNavigate} from "react-router";

const CropImPlant = () => {
    const [cropedImage, setCropedImage] = useState(null)
    const [fullImg, setFullImg] = useState(null)
    const [finalImg, setFinalImg] = useState(null)
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    const hiddenAnchorRef = useRef(null)
    const [crop, setCrop] = useState(null)
    const [completedCrop, setCompletedCrop] = useState(null)
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState(16 / 9)
    const dispatch = useDispatch()
    const {dataPlant} = useSelector(state => state.plant)
    const navegate = useNavigate()

    function centerAspectCrop(width, height, aspect) {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                '1 / 1',
                width,
                height
            ),
            width,
            height
        )
    }

    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined)
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
            setFullImg(e.target.files[0])
        }
    }

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    const sendToResurs = async () => {
        if(finalImg&&cropedImage&&dataPlant){
            await dispatch(plantsActions.post(dataPlant))
            const f = await new FormData()
            await f.append('file', fullImg)
            await dispatch(plantsActions.uploadFullSizePicture(f))
            const c = await new FormData()
            await c.append('file', finalImg)
            await dispatch(plantsActions.uploadCropPicture(c))

            navegate("admin")
        }

    }

    const dataURLtoFile = (dataurl, filename) =>{
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
        setFinalImg(croppedImage)
        setCropedImage(croppedImage)
    }

    function onDownloadCropClick() {
        const reader = new FileReader()
            previewCanvasRef.current.toBlob(blob => {
                reader.readAsDataURL(blob)
                reader.onloadend = () => {
                    dataURLtoFile(reader.result, 'cropped.jpg')
                }
            })
            sendToResurs()
    }


    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )

    function handleToggleAspectClick() {
        if (aspect) {
            setAspect(undefined)
        } else if (imgRef.current) {
            const { width, height } = imgRef.current
            setAspect(16 / 9)
            setCrop(centerAspectCrop(width, height, 16 / 9))
        }
    }

    return (
        <div className="App">
            <div className="Crop-Controls">
                <input type="file" accept="image/*" onChange={onSelectFile} />
                <div>
                    <label htmlFor="scale-input">Масштаб: </label>
                    <input
                        id="scale-input"
                        type="number"
                        step="0.1"
                        value={scale}
                        disabled={!imgSrc}
                        onChange={(e) => setScale(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="rotate-input">Обертати: </label>
                    <input
                        id="rotate-input"
                        type="number"
                        value={rotate}
                        disabled={!imgSrc}
                        onChange={(e) =>
                            setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
                        }
                    />
                </div>
                <div>
                    <button onClick={handleToggleAspectClick}>
                        метод вирізання: {aspect ? 'off' : 'on'}
                    </button>
                </div>
            </div>
            {!!imgSrc && (
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}
            {!!completedCrop && (
                <>
                    <div>
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                border: '1px solid black',
                                objectFit: 'contain',
                                width: completedCrop.width,
                                height: completedCrop.height,
                            }}
                        />
                    </div>
                    <div>
                        {/**/}
                        <button onClick={onDownloadCropClick}> {cropedImage? <h2> Додати товар!!! </h2>: <h2>Вирізати зображення</h2> }</button>
                        <a
                            ref={hiddenAnchorRef}
                            download
                            style={{
                                position: 'absolute',
                                top: '-200vh',
                                visibility: 'hidden',
                            }}
                        >
                            {}
                            Hidden download
                        </a>
                    </div>
                </>
            )}
        </div>
    )
}

export {CropImPlant}