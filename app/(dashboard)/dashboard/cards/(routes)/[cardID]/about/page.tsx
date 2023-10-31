"use client";

import Image from "next/image";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";

const startTodos = [
    {
        id: 1,
        content: "Complete entire javaScript course",
        active: false,
        completed: true,
    },
    {
        id: 2,
        content: "Jog around the park 3x",
        active: false,
        completed: false,
    },
    {
        id: 3,
        content: "1312",
        active: false,
        completed: false,
    }
    ,
    {
        id: 4,
        content: "adada",
        active: false,
        completed: false,
    }
];

interface Data {
    id: number;
    content: string;
    active: boolean;
    completed: boolean;
}

//--------------------------------------------
export default function Home() {
    const [data, setData] = useState<Data[]>(startTodos);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return; // Dropped outside the list
        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log(items)
        setData(items);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {data.map((todo, index) => (
                <Droppable droppableId={`droppable${index}`} key={todo.id}>
                    {(provided) => (
                        <div className="asd" {...provided.droppableProps} ref={provided.innerRef}>
                            <Draggable draggableId={`asda${todo.id}`} index={index}>
                                {(provided) => (
                                    <div
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                    >
                                        {todo.content}
                                    </div>
                                )}
                            </Draggable>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))}
        </DragDropContext>
    );
}
