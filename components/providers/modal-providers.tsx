"use client";

import {useEffect, useState} from "react";
import {EmailVerification} from "@/components/modals/email-verification";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <EmailVerification />
        </>
    );
};