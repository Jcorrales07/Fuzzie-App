"use client"
import React, {useEffect, useState} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {EditUserProfileSchema} from "@/lib/types";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

type Props = {
    user: any,
    onUpdate: (name: string) => any,
}

function ProfileForm({user, onUpdate}: Props) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof EditUserProfileSchema>>({
        mode: 'onChange',
        resolver: zodResolver(EditUserProfileSchema),
        defaultValues: {
            name: "",
            email: "",
        }
    })

    const handleSubmit = async (values: z.infer<typeof EditUserProfileSchema>) => {
        setIsLoading(true)
        await onUpdate(values.name)
        setIsLoading(false)
    }

    useEffect(() => {
        form.reset({name: user.name, email: user.email})
    }, [user]);


    return (
        <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField disabled={isLoading} control={form.control} name={"name"} render={({field}) => (
                    <FormItem>
                        <FormLabel className={"text-lg"}>User full name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={"Name"} />
                        </FormControl>
                    </FormItem>
                )}/>
                <FormField control={form.control} name={"email"} render={({field}) => (
                    <FormItem>
                        <FormLabel className={"text-lg"}>Email</FormLabel>
                        <FormControl>
                            <Input {...field} type={"email"} placeholder={"Email"} disabled={true}  />
                        </FormControl>
                    </FormItem>
                )}/>

                <Button type="submit" className="self-start hover:bg-[#2F006B] hover:text-white">
                    {isLoading ? (<>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        Saving
                    </>) : ('Save User Settings')}
                </Button>
            </form>
        </Form>
    );
}

export default ProfileForm;

// Cosas que puedo enseñar:
// Emmet
// github.dev/repositorio (para descargar cosas mas rapido)
//