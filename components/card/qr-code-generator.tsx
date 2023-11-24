"use client"
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

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
            type: 'classy' as DotType
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
            type: '' as CornerDotType,
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
    const [colorCornerSquare, setColorCornerSquare] = useState("#aabbcc");
    const [colorDotSquare, setColorDotSquare] = useState("#aabbcc");
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

    const dotStyle = (value : string) => {
        setOptions(options => ({
            ...options,
            dotsOptions : {
                type: value as DotType
            }
        }));
    }

    useEffect(() => {
        setOptions(options => ({
            ...options,
            cornersSquareOptions : {
                color : colorCornerSquare
            }
        }));
    }, [colorCornerSquare]);

    const cornerSquareStyle = (value : string) => {
        setOptions(options => ({
            ...options,
            cornersSquareOptions : {
                type: value as CornerSquareType
            }
        }));
    }

    useEffect(() => {
        setOptions(options => ({
            ...options,
            cornersDotOptions : {
                color : colorDotSquare
            }
        }));
    }, [colorDotSquare]);

    const cornerDotStyle = (value : string) => {
        value === 'None' ? value = '' : value
        setOptions(options => ({
            ...options,
            cornersDotOptions : {
                type: value as CornerDotType
            }
        }));
    }

    const onFileExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFileExt(event.target.value as FileExtension);
    };

    const onDownloadClick = async () => {
        if (!qrCode) return;
        qrCode.download({
            extension: fileExt
        });
    };

    return (
        <div>
            <div ref={ref} />
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="account">Main Options</TabsTrigger>
                    <TabsTrigger value="password">Dots Options</TabsTrigger>
                    <TabsTrigger value="password1">Corners Square Options</TabsTrigger>
                    <TabsTrigger value="password2">Corners Dot Options</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Main Options</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button onClick={onDownloadClick}>AA</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dot Options</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-lg font-bold">Dots Style</span>
                                    <Select onValueChange={dotStyle}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Dots Style" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="square">Square</SelectItem>
                                                <SelectItem value="dots">Dots</SelectItem>
                                                <SelectItem value="rounded">Rounded</SelectItem>
                                                <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                                                <SelectItem value="classy">Classy</SelectItem>
                                                <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-lg font-bold">Color</span>
                                    <HexColorPicker color={color} onChange={setColor} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="password1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Corners Square Options</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-lg font-bold">Corners Square Style</span>
                                    <Select onValueChange={cornerSquareStyle}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Dots Style" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="square">Square</SelectItem>
                                                <SelectItem value="dot">Dot</SelectItem>
                                                <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-lg font-bold">Corners Square Color</span>
                                    <HexColorPicker color={color} onChange={setColorCornerSquare} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="password2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Corners Dot Options</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-lg font-bold">Corners Dot Style</span>
                                    <Select onValueChange={cornerDotStyle}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Dots Style" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="None">Default</SelectItem>
                                                <SelectItem value="square">Square</SelectItem>
                                                <SelectItem value="dot">Dot</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-lg font-bold">Corners Dot Color</span>
                                    <HexColorPicker color={color} onChange={setColorDotSquare} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
