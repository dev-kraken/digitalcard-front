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
import {useParams, useRouter} from "next/navigation";
import {useSetSocialMedia} from "@/hooks/query";

interface SocialInput {
    id: number
    label: string;
    type: string;
    value: string;
}

interface SocialInputsGridProps {
    socialInputs: SocialInput[];
    onDragEnd: (result: DropResult) => void;
    removeSocialInput: (label: string) => void;
}

let formSchemaMedia = z.record(z.string({
    required_error: "This field is required",
}));

export const SocialInputsGrid: React.FC<SocialInputsGridProps> = ({socialInputs, onDragEnd, removeSocialInput}) => {
    const paramsCardID = useParams();
    const {mutate: addMutate} = useSetSocialMedia()
    const form = useForm({
        resolver: zodResolver(formSchemaMedia),
    });

    if (socialInputs){
        socialInputs.map((data) => {
            if (data.value !== ""){
                form.setValue(data.label, data.value)
            }
        })
    }


    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchemaMedia>) => {
       let data : any[] = [];
        socialInputs.map((asd,index) => {
            const d = {
                link: values[asd.label],
                priority: index,
                cardId:paramsCardID.cardID,
                socialNetworkId:asd.id,
            }
            data.push(d)
       })
        addMutate(
            {data},
            {
                onSuccess: () => {

                },
            }
        );
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-2">
                <ScrollArea className="h-[750px] w-full px-4 py-1 border-2 rounded border-dashed">
                    <DragDropContext onDragEnd={onDragEnd}>
                        {socialInputs.map((media, index) => (
                            <Droppable droppableId={`droppable${index}`} key={media.label}>
                                {(provided) => (
                                    <div className="media-input" {...provided.droppableProps} ref={provided.innerRef}>
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
                                                            form.unregister(media.label)
                                                        }}
                                                           className="text-rose-500 cursor-pointer"/>
                                                    </div>
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