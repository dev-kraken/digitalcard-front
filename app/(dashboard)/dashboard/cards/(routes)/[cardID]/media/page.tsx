"use client"
import React, {useEffect, useState} from 'react';
import {SocialMedia} from '@/types';
import {SocialFields} from '@/components/card/social-media/media-icon-add';
import {SocialInputsGrid} from '@/components/card/social-media/media-input-dnd';
import {DropResult} from '@hello-pangea/dnd';
import {useAllSocialMedia, useGetSocialMedia} from '@/hooks/query';

interface SocialInput {
    id: number;
    label: string;
    type: string;
    value: string;
}

export default function CardMedia({params}: any) {
    const {data: socialData} = useAllSocialMedia();
    const {data: dataSocial, isLoading} = useGetSocialMedia(params.cardID)

    const [socialInputs, setSocialInputs] = useState<SocialInput[]>([]);
    const [iconsSocial, setIconsSocial] = useState<SocialMedia[] | null>(null);

    useEffect(() => {
        if (socialData) {
            setIconsSocial(socialData);
        }
    }, [socialData]);

    useEffect(() => {
        if (dataSocial) {
            setSocialInputs(dataSocial);
        }
    }, [dataSocial]);

    const addSocialInput = (id: number, label: string, type: string, value: string) => {
        const updatedIconsSocial = iconsSocial && iconsSocial.map((media) => {
            if (media.label === label) {
                return {...media, disable: true};
            }
            return media;
        });

        const newInput: SocialInput = {id, label, type, value};
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
            {isLoading ? "Loading" : <SocialInputsGrid socialInputs={socialInputs} onDragEnd={onDragEnd}
                                                       removeSocialInput={removeSocialInput}/>}
            <div className="bg-purple-100 p-3 rounded">
                <h2>Select Media</h2>
                <SocialFields iconsSocial={iconsSocial} addSocialInput={addSocialInput}/>
            </div>
        </div>
    );
}
