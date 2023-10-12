import {Metadata} from "next"
import {SignUpForm} from "@/components/auth/sign-up";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Welcome in Future of Real Estate",
}

export default function SignIn() {
    return (
        <div className="lg:p-8">
            <div className="h-screen lg:h-auto mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-start text-3xl font-bold tracking-tight text-teal-600">
                        Create an account
                    </h1>
                    <div className="border-b-4 border-teal-600 w-2/6 ml-1"></div>
                    <p className="text-start text-sm text-muted-foreground mt-4">
                        Enter your info below to create your account
                    </p>
                </div>
                <SignUpForm/>
            </div>
        </div>
    )
}