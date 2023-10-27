"use client";
import Image from "next/image";
import {
    BadgeCheck,
    Facebook,
    Hash,
    Instagram,
    Link2,
    Linkedin,
    MailPlus,
    MessageSquare,
    Phone,
    Twitch,
    Twitter,
} from "lucide-react";
import { Separator } from "../ui/separator";

type cardProfile =  {
    id: string;
    name: string;
    license: string;
    slogan: string;
    profileUrl: string;
    createdAt: Date;
    updatedAt: Date;
    cardId: string;
}

interface cardProfileProps {
    profile:cardProfile
}

export default function Style2() {
    return (
        <div className="bg-white">
            {/*<Image src="/s1.jpg" width="450" height="100" alt="S1" />*/}
            <Image
                src="/124599.jpg"
                width="150"
                height="150"
                alt="S1"
                className="rounded-full mt-2 mx-auto shadow-white shadow-inner"
            />

            <h1 className="text-zinc-700 text-xl font-bold text-center">John Dove</h1>
            <Separator className="bg-zinc-200 dark:bg-zinc-200 rounded-md my-1 w-20 mx-auto" />
            <h1 className="text-zinc-500 text-sm font-light text-center">
                Style 1
            </h1>
            <Separator className="bg-zinc-200 dark:bg-zinc-300 rounded-md my-2 w-10 mx-auto" />
            <div className="flex flex-wrap gap-5 justify-center w-5/6 mx-auto mt-4">
                <Phone className="w-12 h-12 bg-gradient-to-b from-blue-500 to-gray-500 p-2 text-white rounded-2xl" />
                <MessageSquare className="w-12 h-12 bg-gradient-to-b from-blue-500 to-gray-500 p-2 text-white rounded-2xl" />
                <MailPlus className="w-12 h-12 bg-gradient-to-b from-blue-500 to-gray-500 p-2 text-white rounded-2xl" />
                <BadgeCheck className="w-12 h-12 bg-gradient-to-b from-blue-500 to-gray-500 p-2 text-white rounded-2xl" />
                <Link2 className="w-12 h-12 bg-gradient-to-b from-blue-500 to-gray-500 p-2 text-white rounded-2xl" />
                <Facebook className="w-12 h-12 bg-gradient-to-b from-blue-500 to-gray-500 p-2 text-white rounded-2xl" />
                <Instagram className="w-12 h-12 bg-gradient-to-b from-blue-500 to-gray-500 p-2 text-white rounded-2xl" />
                <Twitter className="w-12 h-12 bg-gradient-to-b from-blue-500 to-gray-500 p-2 text-white rounded-2xl" />
                <Linkedin className="w-12 h-12 bg-gradient-to-b from-blue-500 to-gray-500 p-2 text-white rounded-2xl" />
                <Twitch className="w-12 h-12 bg-gradient-to-b from-blue-500 to-gray-500 p-2 text-white rounded-2xl" />
            </div>
            <Separator className="bg-zinc-200 dark:bg-zinc-300 rounded-md mt-6 w-2/3 mx-auto" />
            <h1 className="text-zinc-700 text-2xl mt-4 mb-4 font-bold text-center">
                About Me
            </h1>
            <p className="text-zinc-500 text-lg text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, labore
                quibusdam? Voluptatum excepturi nulla et voluptatibus explicabo! A
                aperiam repellendus, dolores praesentium aspernatur quisquam saepe,
                consequatur quia fugit nisi asperiores.
            </p>

            <h1 className="text-zinc-700 text-2xl mt-6 mb-4 font-bold text-center">
                Testimonal
            </h1>
            <figure className="max-w-screen-md mx-auto pb-8">
                <svg
                    className="h-8 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                        fill="currentColor"
                    />
                </svg>
                <blockquote>
                    <p className="text-base text-center font-medium text-gray-900 dark:text-zinc-700">
                        Flowbite is just awesome. It contains tons of predesigned components
                        and pages starting from login screen to complex dashboard. Perfect
                        choice for your next SaaS application
                    </p>
                </blockquote>
                <figcaption className="flex items-center justify-center mt-6 space-x-3">
                    <Image
                        className="w-6 h-6 rounded-full"
                        src="/124599.jpg"
                        alt="profile picture"
                        width="24"
                        height="24"
                    />
                    <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                        <div className="pr-3 font-medium text-gray-900 dark:text-zinc-500">
                            Micheal Gough
                        </div>
                        <div className="pl-3 text-sm font-light text-gray-500 dark:text-orange-500">
                            CEO at Google
                        </div>
                    </div>
                </figcaption>
            </figure>
        </div>
    );
}