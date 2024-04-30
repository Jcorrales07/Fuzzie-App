import {z} from "zod";
import {ConnectionProviderProps} from "@/providers/connections-provider";
import {EditorNode} from "@/providers/editor-provider";


// Esto es basicamente los parametros que debe llevar el formulario para editar el perfil, es para mantener consistencia.
export const EditUserProfileSchema = z.object({
    email: z.string().email('Required'),
    name: z.string().min(2, 'Required'),
})

export const WorkflowFormSchema = z.object({
    name: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required')
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

export type EditorCanvasType =
    | 'Email'
    | 'Condition'
    | 'AI'
    | 'Slack'
    | 'Google Drive'
    | 'Notion'
    | 'Custom Webhook'
    | 'Google Calendar'
    | 'Trigger'
    | 'Action'
    | 'Wait'

export type EditorCanvasCardType = {
    title: string;
    description: string;
    completed: boolean;
    current: boolean;
    metadata: any;
    type: EditorCanvasType;
}

export type EditorNodeType = {
    id: string;
    type: EditorCanvasCardType['type'];
    position: {
        x: number;
        y: number;
    };
    data: EditorCanvasCardType;
}


// Definiendo los tipos de acciones que vamos a hacer con el reducer para modificar el estado del editor
// Las acciones ocupan un tipo y un set de datos: payload para ejecutar la accion
export type EditorActions = | {
    type: 'LOAD_DATA',
    payload: {
        elements: EditorNode[]
        edges: {
            id: string
            source: string
            target: string
        }[]
    }
} | {
    type: 'UPDATE_DATA',
    payload: {
        elements: EditorNode[]
    }
} | { type: 'REDO' }
    | { type: 'UNDO' }
    | {
    type: 'SELECTED_ELEMENT'
    payload: {
        element: EditorNode
    }
}