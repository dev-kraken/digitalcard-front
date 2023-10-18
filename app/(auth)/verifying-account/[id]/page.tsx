import {VerifyingAccount} from "@/components/auth/verifying-account";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: "Email Verification",
    description: "Welcome in Future of Real Estate",
}
export default function VerifyingAccountPage() {
    return (
        <div className="lg:p-8">
            <div className="h-screen lg:h-auto mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[480px]">
                <VerifyingAccount/>
            </div>
        </div>
    )
}