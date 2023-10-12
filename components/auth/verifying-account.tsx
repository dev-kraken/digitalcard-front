"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {BadgeCheck} from "lucide-react";
export function VerifyingAccount(){
    return(
        <Alert variant="success">
            <AlertTitle className="text-2xl flex items-center font-bold"><BadgeCheck className="h-6 w-6 mr-1" />
                Email Verification Successful
            </AlertTitle>
            <AlertDescription className="text-zinc-500 pl-7">
                Congratulations! Your email address has been successfully verified, and your account is now active. Welcome to Digital Business Card!
            </AlertDescription>
        </Alert>
    )
}