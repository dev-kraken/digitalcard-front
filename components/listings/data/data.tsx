import {
    CheckCircledIcon,
    CrossCircledIcon,
} from "@radix-ui/react-icons"

export const statuses = [
    {
        value: "done",
        label: "Active",
        icon: CheckCircledIcon,
    },
    {
        value: "in progress",
        label: "InActive",
        icon: CrossCircledIcon,
    }
]