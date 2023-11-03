"use client"

import { ColumnDef } from "@tanstack/react-table"
import { statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Task" />
        ),
        cell: ({ row }) => <div className="w-[80px]">
            <Avatar>
                <AvatarImage src="/124599.jpg" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            )

            if (!status) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && (
                        <status.icon className={`${status.label == 'Active' ?  'text-green-500' : 'text-rose-500'} mr-2 h-4 w-4`} />
                    )}
                    <span>{status.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]