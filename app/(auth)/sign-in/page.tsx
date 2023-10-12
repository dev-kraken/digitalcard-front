import {Metadata} from "next"
import {SignInForm} from "@/components/auth/sign-in"
export const metadata: Metadata = {
    title: "Sign In",
    description: "Welcome in Future of Real Estate",
}

export default function SignIn() {
    return (
        <div className="lg:p-8">
            <div className="h-screen lg:h-auto mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-start text-3xl font-bold tracking-tight text-teal-600">
                        Welcome !
                    </h1>
                    <div className="border-b-4 border-teal-600 w-1/6 ml-1"></div>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials below to sign in your account
                    </p>
                </div>
                <SignInForm/>
            </div>
        </div>
    )
}