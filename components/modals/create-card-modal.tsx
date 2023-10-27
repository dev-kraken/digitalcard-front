"use client";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Cross, Loader2, X} from "lucide-react";
import {useModal} from "@/hooks/use-modal-store";
import {useCreateCard} from "@/hooks/query";

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const formSchema = z.object({
    name: z.string().min(1, {
        message: "Card name is required.",
    }),
    circle_image: z.any()
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 10MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
});

function getImageData(event: ChangeEvent<HTMLInputElement>) {
    const dataTransfer = new DataTransfer();

    Array.from(event.target.files!).forEach((image) =>
        dataTransfer.items.add(image)
    );
    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return {files, displayUrl};
}

export const CreateCardModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [preview, setPreview] = useState("");
    const {isOpen, onClose, type} = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "createCard";
    const {mutate: addMutate} = useCreateCard();
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            circle_image: "",
        },
    });
    const isLoading = form.formState.isSubmitting;

    function fileToBase64(file: Blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                // @ts-ignore
                const base64String = event.target.result;
                resolve(base64String);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const base64String = await fileToBase64(values.circle_image?.[0]);
            const cardAdd = {
                cardName: values.name,
                imageOrginalName: values.circle_image?.[0].name,
                imageBase64: base64String,
            }
            addMutate(
                {cardAdd},
                {
                    onSuccess: () => {
                        form.reset();
                        onClose();
                        setPreview("")
                    },
                }
            );
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
    };
    const handelClose = () => {
        form.reset();
        onClose();
        setPreview("")
    }

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handelClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-semibold">
                        Customize your Digital Card
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your card a personality with a name and an image. You can
                        always change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            {preview ? (
                                <div className="relative w-fit mx-auto">
                                <Avatar className="w-24 h-24 mx-auto">
                                    <AvatarImage src={preview} className="z-1"/>
                                    <AvatarFallback>PR</AvatarFallback>
                                </Avatar>
                                    <X onClick={() => {setPreview("")}} className="w-5 h-5 text-white rounded-full p-1 top-0 right-0 bg-rose-500 z-10 absolute cursor-pointer"/>
                                </div>
                            ) : (<div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="circle_image"
                                    render={({field: {onChange, value, ...rest}}) => (
                                        <>
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center justify-center w-full">
                                                        <label htmlFor="dropzone-file"
                                                               className="flex flex-col items-center justify-center w-[300px] h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                            <div
                                                                className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <svg
                                                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 20 16">
                                                                    <path stroke="currentColor" strokeLinecap="round"
                                                                          strokeLinejoin="round" strokeWidth="2"
                                                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                                </svg>
                                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                    <span
                                                                        className="font-semibold">Click to upload</span> or
                                                                    drag and drop</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or SVG</p>
                                                            </div>
                                                            <Input
                                                                id="dropzone-file"
                                                                type="file"
                                                                {...rest}
                                                                onChange={(event) => {
                                                                    const {files, displayUrl} = getImageData(event)
                                                                    setPreview(displayUrl);
                                                                    onChange(files);
                                                                }}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    </div>

                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>)}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Card Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter card name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="default" disabled={isLoading}>
                                {isLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>)}
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};