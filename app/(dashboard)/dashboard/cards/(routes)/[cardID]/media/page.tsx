"use client"
import React, {useEffect, useState} from 'react';
import {useAllSocialMedia} from "@/hooks/query";
import {SocialMedia} from "@/types";
import {SocialFields} from "@/components/card/social-media/media-icon-add";
import {SocialInputsGrid} from "@/components/card/social-media/media-input-dnd";
import {DropResult} from "@hello-pangea/dnd";

interface SocialInput {
    id: number;
    label: string;
    type: string;
}

const initialSocialInputs: SocialInput[] = [];
export default function CardMedia() {
    const {data} = useAllSocialMedia();
    const [socialInputs, setSocialInputs] = useState<SocialInput[]>(initialSocialInputs);
    const [iconsSocial, setIconsSocial] = useState<SocialMedia[] | null>(null);

    useEffect(() => {
        if (data) {
            setIconsSocial(data);
        }
    }, [data]);

    const addSocialInput = (id: number, label: string, type: string) => {
        const updatedIconsSocial = iconsSocial && iconsSocial.map((media) => {
            if (media.label === label) {
                return {...media, disable: true};
            }
            return media;
        });

        const newInput: SocialInput = {id, label, type};
        setSocialInputs([...socialInputs, newInput]);
        setIconsSocial(updatedIconsSocial);
    };

    const removeSocialInput = (label: string) => {
        const updatedIconsSocial = iconsSocial && iconsSocial.map((media) => {
            if (media.label === label) {
                return {...media, disable: false};
            }
            return media;
        });

        const updatedInputs = socialInputs.filter((input) => input.label !== label);
        setSocialInputs(updatedInputs);
        setIconsSocial(updatedIconsSocial);
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return; // Dropped outside the list
        const items = Array.from(socialInputs);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSocialInputs(items);
    };
    return (
        <div className="grid grid-cols-3 gap-2">
            <SocialInputsGrid socialInputs={socialInputs} onDragEnd={onDragEnd} removeSocialInput={removeSocialInput}/>
            <div className="bg-purple-100 p-3 rounded">
                <h2>Select Media</h2>
                <SocialFields iconsSocial={iconsSocial} addSocialInput={addSocialInput}/>
            </div>
        </div>
    );
}

