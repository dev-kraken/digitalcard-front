"use client"

import * as React from "react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Loader2} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {BsFacebook} from "react-icons/bs";
import {AiFillGoogleCircle} from "react-icons/ai";
import {useModal} from "@/hooks/use-modal-store";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

const formSchema = z.object({
    fname: z.string().min(3, {
        message: "First Name must be at least 3 characters.",
    }),
    lname: z.string().min(3, {
        message: "Last Name must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Email enter valid Email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Passwords must match!",
        path: ["confirmPassword"],
    }
);

export function SignUpForm({className, ...props}: UserAuthFormProps) {
    const {onOpen} = useModal();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fname: "",
            lname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values)
            setIsLoading(true)
            onOpen("emailVerification");
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="fname"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="First Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lname"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Last Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                            placeholder="name@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            type="password"
                                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            disabled={isLoading}
                                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                            placeholder="Confirm Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} className="bg-gradient-to-r from-teal-400 to-teal-600">
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Sign Up with Email
                        </Button>
                        <div className="text-sm text-zinc-900 text-center">
                            Already have an account? &nbsp;
                            <Link
                                href="/sign-in"
                                className="text-teal-600 font-bold">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-5 text-muted-foreground rounded-lg">
            Or
          </span>
                </div>
            </div>
            <Button disabled={isLoading} className="bg-[#3b5998] hover:bg-[#3b5998]/90">
                <BsFacebook className="mr-2 h-4 w-4"/>
                Sign up with Facebook
            </Button>
            <Button disabled={isLoading} className="bg-[#4285F4] hover:bg-[#4285F4]/90">
                <AiFillGoogleCircle className="w-5 h-5 mr-2"/>
                Sign up with Google
            </Button>
        </div>
    )
}