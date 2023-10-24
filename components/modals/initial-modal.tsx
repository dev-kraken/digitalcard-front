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
import {Loader2} from "lucide-react";
import axiosAuthClient from "@/lib/axios/axios-client";

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

export const InitialModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [preview, setPreview] = useState("");
    const router = useRouter();
    // const axiosAuth = useAxiosAuth();
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
            const response = await axiosAuthClient.card.addCard(cardAdd)
            form.reset();
            router.refresh()
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
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
                            <Avatar className="w-24 h-24 mx-auto">
                                <AvatarImage src={preview}/>
                                <AvatarFallback>PR</AvatarFallback>
                            </Avatar>
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="circle_image"
                                    render={({field: {onChange, value, ...rest}}) => (
                                        <>
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        {...rest}
                                                        onChange={(event) => {
                                                            const {files, displayUrl} = getImageData(event)
                                                            setPreview(displayUrl);
                                                            onChange(files);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
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