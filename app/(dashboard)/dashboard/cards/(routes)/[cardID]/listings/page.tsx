import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"

import { taskSchema } from "@/components/listings/data/schema"
import {DataTable} from "@/components/listings/components/data-table";
import {columns} from "@/components/listings/components/columns";
import {List} from "lucide-react";
import {AddHomeListing} from "@/components/listings/add-listing";

export const metadata: Metadata = {
    title: "Tasks",
    description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getTasks() {
    const data = await fs.readFile(
        path.join(process.cwd(), "components/listings/data/tasks.json")
    )

    const tasks = JSON.parse(data.toString())

    return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
    const tasks = await getTasks()
    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <List />
                    </div>
                    <div className="flex items-center space-x-2">
                        <AddHomeListing />
                    </div>
                    </div>
                <DataTable data={tasks} columns={columns} />
            </div>
        </>
    )
}