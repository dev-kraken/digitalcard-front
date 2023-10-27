"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {ChangeEvent, useEffect, useState} from "react";
import {Loader2, X} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const formSchema = z.object({
    name: z.string().min(1, {
        message: "Profile name is required.",
    }),
    license: z.string().min(1, {
        message: "License Number is required.",
    }),
    slogan: z.string().min(1, {
        message: "Slogan is required.",
    }),
    profileUrl: z.string().min(0, {
        message: "Card image is required.",
    }),
    circle_image: z.any()
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 10MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    action:z.string(),
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
interface cardIdParams{
    paramsCardId: string;
}

export const ProfileSection = ({ card }: any, {paramsCardId}:cardIdParams) => {
    const [preview, setPreview] = useState("");
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            profileUrl: "",
            license: "",
            slogan: "",
            action: card ? "update" : "create",
            circle_image: "",
        },
    });

    useEffect(() => {
        if (card) {
            form.setValue("name", card.name);
            form.setValue("license", card.license);
            form.setValue("slogan", card.slogan);
            form.setValue("profileUrl", card.profileUrl);
        }
    }, [card, form]);
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/card/${paramsCardId}/createprofile`, values);

            // form.reset();
        } catch (error) {
            console.log(error);
        }
    };

    const handelClose = () => {
        form.reset();
    };


    return (
        <div className="w-[50%] mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                            render={({field: {onChange, value, ...field}}) => (
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
                                                        {...field}
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
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-zinc-500 dark:text-white">
                                    Profile Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-zinc-500 dark:text-white focus-visible:ring-offset-0"
                                        placeholder="Sample: John Doe"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="license"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-zinc-500 dark:text-white">
                                    License Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-zinc-500 dark:text-white focus-visible:ring-offset-0"
                                        placeholder="Sample: 123456789"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slogan"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-zinc-500 dark:text-white">
                                    Your Slang
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-zinc-500 dark:text-white focus-visible:ring-offset-0"
                                        placeholder="Sample: Real Estate Agent"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-500" />
                            </FormItem>
                        )}
                    />
                    <Button variant="default" disabled={isLoading}>
                        {isLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
                        {!card ? "Create Profile" : "Update Profile"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};