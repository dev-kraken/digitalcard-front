"use client"
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import QRCodeStyling, {
    DrawType,
    TypeNumber,
    Mode,
    ErrorCorrectionLevel,
    DotType,
    CornerSquareType,
    CornerDotType,
    FileExtension,
    Options
} from "qr-code-styling";
import {HexColorPicker} from "react-colorful";
interface cardIdParams {
    paramsCardId: string;
}
export const QrCodeGenerator = ({paramsCardId}: cardIdParams) => {
    const [options, setOptions] = useState<Options>({
        width: 300,
        height: 300,
        type: 'svg' as DrawType,
        data: 'http://localhost:3000/uuid',
        image: '/favicon.ico',
        margin: 10,
        qrOptions: {
            typeNumber: 0 as TypeNumber,
            mode: 'Byte' as Mode,
            errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
        },
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 20,
            crossOrigin: 'anonymous',
        },
        dotsOptions: {
            color: '#222222',
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 0,
            //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
            // },
            type: 'rounded' as DotType
        },
        backgroundOptions: {
            color: '#FFF',
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 0,
            //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
            // },
        },
        cornersSquareOptions: {
            color: '#222222',
            type: 'extra-rounded' as CornerSquareType,
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 180,
            //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
            // },
        },
        cornersDotOptions: {
            color: '#222222',
            type: 'dot' as CornerDotType,
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 180,
            //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
            // },
        }
    });
    const [fileExt, setFileExt] = useState<FileExtension>("svg");
    const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
    const ref = useRef<HTMLDivElement>(null);
    const [color, setColor] = useState("#aabbcc");
    useEffect(() => {
        if (ref.current) {
            qrCode.append(ref.current);
        }
    }, [qrCode, ref]);

    useEffect(() => {
        if (!qrCode) return;
        qrCode.update(options);
    }, [qrCode, options]);

    const onDataChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOptions(options => ({
            ...options,
            data: event.target.value
        }));
    };

    useEffect(() => {
        setOptions(options => ({
            ...options,
            dotsOptions : {
                color : color
            }
        }));
    }, [color]);

    const onFileExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFileExt(event.target.value as FileExtension);
    };

    const onDownloadClick = () => {
        if (!qrCode) return;
        qrCode.download({
            extension: fileExt
        });
    };

    return (
        <div className="App">
            <div ref={ref} />
            <div>
                <input value={options.data} onChange={onDataChange} />
                <HexColorPicker color={color} onChange={setColor} />;
                <select onChange={onFileExtensionChange} value={fileExt}>
                    <option value="svg">SVG</option>
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WEBP</option>
                </select>
                <button onClick={onDownloadClick}>Download</button>
            </div>
        </div>
    );
}
