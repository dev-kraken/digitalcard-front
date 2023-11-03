"use client";

import {useEffect, useState} from "react";
import {EmailVerification} from "@/components/modals/email-verification";
import {DeleteCardModal} from "@/components/modals/delete-card-modal";
import {CreateCardModal} from "@/components/modals/create-card-modal";
import {AddHomeListing} from "@/components/modals/add-home-listing";

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
            <DeleteCardModal />
            <CreateCardModal />
            <AddHomeListing />
        </>
    );
};