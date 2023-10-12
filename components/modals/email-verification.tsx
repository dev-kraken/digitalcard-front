import {useModal} from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const EmailVerification = () => {
    const {isOpen, onClose, type} = useModal();

    const isModalOpen = isOpen && type === "emailVerification";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold pb-3">
                        Thank You for Registering with Us
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-600 text-1xl">
                        Thank you for choosing to register with Digital Business Card! We&#39;re excited to have
                        you as part of our community.
                        To ensure the security of your account and to complete the registration process, please verify
                        your email address by clicking the verification link we&#39;ve sent to the email address you
                        provided during registration. This step is important to protect your account and enhance your
                        experience on our platform.
                        <br/>
                        <p className="text-sm mt-4 text-teal-600">
                            Thank you for choosing Digital Business Card. We look forward to serving you, and we&#39;re
                            confident that you&#39;ll enjoy all the benefits our platform has to offer.
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}