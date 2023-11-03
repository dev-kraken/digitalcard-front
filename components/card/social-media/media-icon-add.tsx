"use client"
import {Instagram, Mail} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {SocialMedia} from "@/types";
import React from "react";
import {FaLinkedinIn, FaSkype, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube} from "react-icons/fa6";
import {FaFacebookF} from "react-icons/fa";
import {AiOutlineGlobal} from "react-icons/ai";
import {Badge} from "@/components/ui/badge";
import {SiZillow} from "react-icons/si";
import {BiLogoGmail, BiLogoTelegram} from "react-icons/bi";
import {BsPhoneFill} from "react-icons/bs";

const getIconComponent = (iconName: string, className: string) => {
    switch (iconName) {
        case 'Facebook':
            return <FaFacebookF className={className}/>;
        case 'Instagram':
            return <Instagram className={className}/>;
        case 'Linkedin':
            return <FaLinkedinIn className={className}/>;
        case 'mail':
            return <BiLogoGmail className={className}/>;
        case 'X':
            return <FaXTwitter className={className}/>;
        case 'Phone':
            return <BsPhoneFill className={className}/>;
        case 'Website':
            return <AiOutlineGlobal className={className}/>;
        case 'Zillow':
            return <SiZillow className={className}/>;
        case 'WhatsApp':
            return <FaWhatsapp className={className}/>;
        case 'Telegram':
            return <BiLogoTelegram className={className}/>;
        case 'TikTok':
            return <FaTiktok className={className}/>;
        case 'YouTube':
            return <FaYoutube className={className}/>;
        case 'Skype':
            return <FaSkype className={className}/>;
        default:
            return null;
    }
}

interface SocialFieldsProps {
    iconsSocial: SocialMedia[] | null;
    addSocialInput: (id: number, label: string, type: string, value: string) => void;
}

export const SocialFields: React.FC<SocialFieldsProps> = ({iconsSocial, addSocialInput}) => {
    return (
        <div>
            <Badge className="my-2 bg-purple-500 text-white font-semibold" variant="outline">Most Popular</Badge>
            <div className="flex flex-wrap gap-2">
                {iconsSocial && iconsSocial.map((media) => (
                    <Button key={media.label}
                            onClick={() => addSocialInput(media.id,media.label, media.type, "")}
                            disabled={media.disable}
                            variant={"outline"} className=""
                    >
                        {getIconComponent(media.icon, "h-4 w-4 mr-2")}
                        {media.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}