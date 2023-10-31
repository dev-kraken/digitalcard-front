"use client"
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd";
import React, {useEffect} from "react";
import {Loader2, Menu, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {IMaskInput} from "react-imask";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";

interface SocialInput {
    id: number
    label: string;
    type: string;
}

interface SocialInputsGridProps {
    socialInputs: SocialInput[];
    onDragEnd: (result: DropResult) => void;
    removeSocialInput: (label: string) => void;
}

// const formSchemaMedia = z.object({
//     Facebook: z.string().min(1, {
//         message: "Facebook link is required.",
//     }),
//     Instagram: z.string().min(1, {
//         message: "Instagram link is required.",
//     }),
//     Linkedin: z.string().min(1, {
//         message: "Linkedin link is required.",
//     }),
//     Website: z.string().min(1, {
//         message: "Linkedin link is required.",
//     }),
// });
let formSchemaMedia = z.record(z.string(), z.string());
export const SocialInputsGrid: React.FC<SocialInputsGridProps> = ({socialInputs, onDragEnd, removeSocialInput}) => {
    const paramsCardID = useParams();
    const mask = [{mask: '(000) 000-0000'}, {mask: '(000) 000-0000'}];
    const form = useForm({
        resolver: zodResolver(formSchemaMedia),
    });
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchemaMedia>) => {
       let data : any[] = [];
        socialInputs.map((asd,index) => {
            const d = {
                link: values[asd.label],
                priority: index,
                cardId:paramsCardID.cardID,
                socialNetworkId:asd.id
            }
            data.push(d)
       })
        console.log(data)
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-2">
                <ScrollArea className="h-[750px] w-full px-4 py-1 border-2 rounded border-dashed">
                    <DragDropContext onDragEnd={onDragEnd}>
                        {socialInputs.map((media, index) => (
                            <Droppable droppableId={`droppable${index}`} key={media.label}>
                                {(provided) => (
                                    <div className="asd" {...provided.droppableProps} ref={provided.innerRef}>
                                        <Draggable draggableId={`dnd${media.label}`} index={index}>
                                            {(provided) => (
                                                <div className="shadow border my-4 p-4 rounded"
                                                     {...provided.dragHandleProps}
                                                     {...provided.draggableProps}
                                                     ref={provided.innerRef}
                                                >
                                                    <div className="flex justify-between pb-4">
                                                        <div className="flex">
                                                            <Menu className="mr-2"/>
                                                            {media.label}
                                                        </div>
                                                        <X onClick={() => {
                                                            removeSocialInput(media.label);
                                                            form.reset();
                                                        }}
                                                           className="text-rose-500 cursor-pointer"/>
                                                    </div>
                                                    {media.type === 'tel' ?
                                                        <IMaskInput
                                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                            mask={mask} name="phone"
                                                            placeholder="Enter phone number here"/>
                                                        :
                                                        <FormField
                                                            control={form.control}
                                                            // @ts-ignore
                                                            name={media.label}
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Input
                                                                            disabled={isLoading}
                                                                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                                            placeholder={media.label}
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    }

                                                </div>
                                            )}
                                        </Draggable>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </DragDropContext>
                </ScrollArea>
                <Button variant="default" className="mt-2 float-right" disabled={isLoading}>
                    {isLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>)}
                    Create
                </Button>
            </form>
        </Form>
    );
}