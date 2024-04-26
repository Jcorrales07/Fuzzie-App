import {z} from "zod";
import {ConnectionProviderProps} from "@/providers/connections-provider";


// Esto es basicamente los parametros que debe llevar el formulario para editar el perfil, es para mantener consistencia.
export const EditUserProfileSchema = z.object({
    email: z.string().email('Required'),
    name: z.string().min(2, 'Required'),
})

export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'

export type Connection = {
    title: ConnectionTypes
    description: string
    image: string
    connectionKey: keyof ConnectionProviderProps
    accessTokenKey?: string
    alwaysTrue?: boolean
    slackSpecial?: boolean
}