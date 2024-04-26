import React from 'react';
import ProfileForm from "@/components/forms/profile-form";
import ProfilePicture from "@/app/(main)/(pages)/settings/_components/profile-picture";
import {db} from "@/lib/db";
import {currentUser} from "@clerk/nextjs/server";


type Props = {}

async function Settings(props: Props) {

    const authUser = await currentUser()

    if (!authUser) return null

    const user = await db.user.findUnique({where: {clerkId: authUser.id}})

    const removeProfileImage = async () => {
        'use server' // esto es nuevo (server action)
        // Por lo que entiendo, es que 'use server' lo que le va a decir a NEXTJS es que
        // esta funcion solo se va a ejecutar por el servidor
        const response = await db.user.update({
            where: {
                clerkId: authUser.id,
            },
            data: {
                profileImage: '',
            },
        })
        return response
    }

    const uploadProfileImage = async (image: string) => {
        'use server'
        const response = await db.user.update({
            where: {
                clerkId: authUser.id,
            },
            data: {
                profileImage: image,
            },
        })
        return response
    }

    const updateUserInfo = async (name: string) => {
        'use server'

        const updateUser = await db.user.update({
            where: {
                clerkId: authUser.id,
            },
            data: {
                name,
            },
        })
        return updateUser
    }

    return (
        <div className="flex flex-col gap-4">

            {/* Siempre se va a mantener arriba, aunque se haga scroll para abajo */}
            <h1 className={"sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg"}>
                <span>Settings</span>
            </h1>

            <div className={"flex flex-col gap-10 p-6"}>
                <div>
                    <h2 className="text-2xl font-bold">User Profile</h2>
                    <p className="text-base text-white/50">
                        Add or update your information
                    </p>
                </div>
                <ProfilePicture onDelete={removeProfileImage} userImage={user?.profileImage || ''}
                                onUpload={uploadProfileImage}/>
                <ProfileForm user={user} onUpdate={updateUserInfo}/>
            </div>
        </div>
    );
}

export default Settings;