import React from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {WorkflowFormSchema} from "@/lib/types";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

type Props = {
    title?: string
    subTitle?: string
}

function WorkflowForm({title, subTitle}: Props) {

    const form = useForm<z.infer<typeof WorkflowFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(WorkflowFormSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })

    const isLoading = form.formState.isLoading
    const router = useRouter()

    const handleSubmit = () => {
    }

    return (
        <Card className="w-full max-w-[650px] border-none">
            {title && subTitle && (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{subTitle}</CardDescription>
                </CardHeader>
            )}

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 text-left">
                        <FormField
                            disabled={isLoading}
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Name"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={isLoading}
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="description"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type={'submit'} className={"mt-4"} disabled={isLoading}>
                            {isLoading ? (
                                <> <Loader2 className="mr-2 h-4 animate-spin"/> Saving </>) : ('Save Workflow Settings'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default WorkflowForm;

// Si te sale un error como este cuando estas haciendo un form:

// Unhandled Runtime Error
// TypeError: Cannot destructure property 'getFieldState' of '(0 , react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useFormContext)(...)' as it is null.
//
// Source
// src\components\ui\form.tsx (45:10) @ getFieldState
//
// 43 | const fieldContext = React.useContext(FormFieldContext)
// 44 | const itemContext = React.useContext(FormItemContext)
//     > 45 | const { getFieldState, formState } = useFormContext()
// |        ^
// 46 |
// 47 | const fieldState = getFieldState(fieldContext.name, formState)

// Es porque tenes importado el Form de react-hook-form y no de shadcn

// import {Form} from "react-hook-form";

// cambialo a esto:
// import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";


