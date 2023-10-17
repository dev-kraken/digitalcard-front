"use client"

import * as React from "react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {AlertOctagon, Loader2} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {AiFillGoogleCircle} from "react-icons/ai";
import {BsFacebook} from "react-icons/bs";
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

const formSchema = z.object({
    email: z.string().email({
        message: "Email enter valid Email address.",
    }),
    password: z.string().min(1, {
        message: "Please enter your password.",
    }),
})

export function SignInForm({className, ...props}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false)
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values)
            setIsLoading(true)
            const res = await signIn("credentials", {
                redirect: false,
                username: values.email,
                password: values.password,
                callbackUrl,
            });

            setIsLoading(false);

            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                setError("Invalid email or password");
            }
        } catch (error: any) {
            setIsLoading(false);
            setError(error);
            console.log(error);
        }
    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            {error && (
                <p className="text-center bg-red-500 py-2 rounded text-white flex justify-center items-center gap-1">
                    <AlertOctagon className="animate-pulse w-4 h-4"/>
                    {error}
                </p>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
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
                        </div>
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem className="relative">
                                        <FormControl>
                                            <Input
                                                type={visible ? "text" : "password"}
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 relative"
                                                placeholder="********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={isLoading} className="bg-gradient-to-r from-teal-400 to-teal-600">
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Sign In with Email
                        </Button>
                        <div className="text-sm text-zinc-900 text-center">
                            Don&lsquo;t have an account? &nbsp;
                            <Link
                                href="/sign-up"
                                className="text-teal-600 font-bold">
                                Sign Up
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
                Sign in with Facebook
            </Button>
            <button onClick={() => signOut()}>asd</button>
            <Button disabled={isLoading} className="bg-[#4285F4] hover:bg-[#4285F4]/90">
                <AiFillGoogleCircle className="w-5 h-5 mr-2"/>
                Sign in with Google
            </Button>
        </div>
    )
}