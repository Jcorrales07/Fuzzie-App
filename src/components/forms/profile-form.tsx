"use client"
import React, {useState} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {EditUserProfileSchema} from "@/lib/types";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

type Props = {}

function ProfileForm(props: Props) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof EditUserProfileSchema>>({
        mode: 'onChange',
        resolver: zodResolver(EditUserProfileSchema),
        defaultValues: {
            name: "user.name",
            email: "user.email",
        }
    })


    return (
        <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={() => {
            }}>
                <FormField disabled={isLoading} control={form.control} name={"name"} render={({field}) => (
                    <FormItem>
                        <FormLabel className={"text-lg"}>User full name</FormLabel>
                        <FormControl>
                            <Input placeholder={"Name"} {...field} />
                        </FormControl>
                    </FormItem>
                )}/>
                <FormField disabled={isLoading || true} control={form.control} name={"email"} render={({field}) => (
                    <FormItem>
                        <FormLabel className={"text-lg"}>User full name</FormLabel>
                        <FormControl>
                            <Input type={"email"} placeholder={"Email"} disabled {...field} />
                        </FormControl>
                    </FormItem>
                )}/>

                <Button type="submit" className="self-start hover:bg-[#2F006B] hover:text-white">
                    {isLoading  ? (<>
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