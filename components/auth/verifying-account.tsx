"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {BadgeCheck} from "lucide-react";
import {useParams} from "next/navigation";
export function VerifyingAccount(){
    const params = useParams();
    console.log(params.id)
    return(
        <Alert variant="default">
            <AlertTitle className="text-2xl flex items-center font-bold"><BadgeCheck className="h-6 w-6 mr-1" />
                Email Verification Successful
            </AlertTitle>
            <AlertDescription className="text-zinc-500 pl-7">
                Congratulations! Your email address has been successfully verified, and your account is now active. Welcome to Digital Business Card!
            </AlertDescription>
        </Alert>
    )
}