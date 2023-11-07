"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {useModal} from "@/hooks/use-modal-store";
import {Button} from "@/components/ui/button";
import {Loader2, X} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import axiosAuth from "@/lib/axios/axios-auth";
import {AllState} from "@/types";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Textarea} from "@/components/ui/textarea";
import {useGetState, useSetListing} from "@/hooks/query";
import {useParams} from "next/navigation";

const formSchema = z.object({
    street: z.string().min(1, {
        message: "Street is required.",
    }),
    city: z.string().min(1, {
        message: "City is required.",
    }),
    stateId: z.string().min(1, {
        message: "State is required",
    }),
    zipcode: z.string().min(1, {
        message: "Zip Code is required",
    }),
    propertyType: z.string().min(1, {
        message: "Zip Code is required",
    }),
    price: z.string().min(1, {
        message: "Zip Code is required",
    }),
    bedrooms: z.string().min(1, {
        message: "Zip Code is required",
    }),
    bathrooms: z.string().min(1, {
        message: "Zip Code is required",
    }),
    squareFootage: z.string().min(1, {
        message: "Zip Code is required",
    }),
    lotSize: z.string().min(1, {
        message: "Zip Code is required",
    }),
    yearBuilt: z.string().min(1, {
        message: "Zip Code is required",
    }),
    countryId: z.string().min(1, {
        message: "Zip Code is required",
    }),
    description: z.string().min(0),
});
export const AddHomeListing = () => {
    const params = useParams()
    const {isOpen, onClose, type, data} = useModal();
    const isModalOpen = isOpen && type === "addHomeListing";
    const [isMounted, setIsMounted] = useState(false);
    const {mutate: addMutate} = useSetListing();
    const {data:allState, isLoading} = useGetState();
    useEffect(() => {
        setIsMounted(true);
    }, []);


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            countryId: "",
            city: "",
            street: "",
            description: "",
            stateId: "",
            zipcode: "",
            propertyType: "",
            price: "",
            yearBuilt: "",
            squareFootage: "",
            bedrooms: "",
            bathrooms: "",
            lotSize: "",
        },
    });
    const isLoadings = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const dataValues = {...values, cardGuid:params.cardID}
        console.log(dataValues)
        addMutate(
            {dataValues},
            {
                onSuccess: () => {
                    form.reset();
                    onClose();
                },
            }
        );
    }
    const handelClose = () => {
        form.reset();
        onClose();
    }

    if (!isMounted) {
        return null;
    }

    if (isLoading){
        return <div>Is Loading</div>
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-4xl">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Add New Listing
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4 px-6">
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="propertyType"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Property Type
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Property Type"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">Home</SelectItem>
                                                        <SelectItem value="2">TownHome</SelectItem>
                                                        <SelectItem value="3">Multi-Family</SelectItem>
                                                        <SelectItem value="4">Condos/Co-ops</SelectItem>
                                                        <SelectItem value="5">Lots/Land</SelectItem>
                                                        <SelectItem value="6">Apartments</SelectItem>
                                                        <SelectItem value="7">Manufactured</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Price
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isLoading}
                                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                        placeholder="Enter Price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="yearBuilt"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Year Built
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isLoading}
                                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                        placeholder="Enter Year Built"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="squareFootage"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Square Footage
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isLoading}
                                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                        placeholder="Enter Square Footage"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="bedrooms"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Bedrooms
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isLoading}
                                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                        placeholder="Enter Bedrooms"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="bathrooms"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Bathrooms
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isLoading}
                                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                        placeholder="Enter  Bathrooms"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="lotSize"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Lot Size
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isLoading}
                                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                        placeholder="Enter Lot Size"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-3">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="countryId"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Country
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Country"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">United States</SelectItem>
                                                        <SelectItem value="2">Canada</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="street"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Street
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isLoading}
                                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                        placeholder="Enter Street"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    City
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isLoading}
                                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                        placeholder="Enter City"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="stateId"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    State
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="State"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <ScrollArea className="h-72 w-48">
                                                            {allState && allState.map((state) => (
                                                                <SelectItem key={state.name}
                                                                            value={state.id}>
                                                                    {state.name}
                                                                </SelectItem>
                                                            ))}
                                                        </ScrollArea>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="zipcode"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Zip Code
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isLoading}
                                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                        placeholder="Enter ZipCode"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us a little bit about yourself"
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
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