'use client'

import {
    Dispatch,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from 'react'

import {EditorActions, EditorNodeType} from "@/lib/types";

// Simplemente son tipados, como en Java
export type EditorNode = EditorNodeType;

export type Editor = {
    elements: EditorNode[];
    edges: {
        id: string;
        source: string;
        target: string;
    }[];
    selectedNode: EditorNodeType;
}

// Para hacer un historial
export type HistoryState = {
    history: Editor[]
    currentIndex: number
}

export type EditorState = {
    editor: Editor
    history: HistoryState
}

// La estructura por defecto del contexto del editos
const initialEditorState: EditorState['editor'] = {
    elements: [],
    selectedNode: {
        data: {
            completed: false,
            current: false,
            description: '',
            metadata: {},
            title: '',
            type: 'Trigger',
        },
        id: '',
        position: {x: 0, y: 0},
        type: 'Trigger'
    },
    edges: [],
}

// Estructura por defecto del History Stack
const initialHistoryState: HistoryState = {
    history: [initialEditorState],
    currentIndex: 0,
}

// Estructura por defecto de todo el componente
const initialState: EditorState = {
    editor: initialEditorState,
    history: initialHistoryState,
}

// Funcion para el Reducer, por defecto su estado va a ser el estado inicial del editor
const editorReducer = (state: EditorState = initialState, action: EditorActions): EditorState => {
    switch (action.type) {
        case 'REDO':
            // si el index actual es menor que la longitud del historial... pasamos
            if (state.history.currentIndex < state.history.history.length - 1) {
                // Actualizando el History stack, actualizandolo con la nueva accion que se hizo
                const nextIndex = state.history.currentIndex + 1
                const nextEditorState = {...state.history.history[nextIndex]}

                // se modifica el estado y se guarda en esta variable
                const redoState = {
                    ...state, // hacemos una copia del estado actual
                    editor: nextEditorState, // le modificamos lo que se necesita cambiar
                    history: {
                        ...state.history,
                        currentIndex: nextIndex,
                    },
                }
                return redoState
            }
            return state // si no, no hay nada que hacer

        case 'UNDO':
            if (state.history.currentIndex > 0) {
                const prevIndex = state.history.currentIndex - 1
                const prevEditorState = {...state.history.history[prevIndex]}
                const undoState = {
                    ...state,
                    editor: prevEditorState,
                    history: {
                        ...state.history,
                        currentIndex: prevIndex,
                    },
                }
                return undoState
            }
            return state

        case 'LOAD_DATA':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    elements: action.payload.elements || initialEditorState.elements,
                    edges: action.payload.edges,
                },
            }
        case 'SELECTED_ELEMENT':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    selectedNode: action.payload.element,
                }
            }

        case 'UPDATE_DATA':
            return state

        default:
            return state
    }
}

export type EditorContextData = {
    previewMode: boolean
    setPreviewMode: (previewMode: boolean) => void
}

// Creando el contexto que se va a compartir SOLO con los elementos del editor
export const EditorContext = createContext<{
    state: EditorState
    dispatch: Dispatch<EditorActions>
}>({
    state: initialState,
    dispatch: () => undefined,
})

type EditorProps = {
    children: React.ReactNode
}

const EditorProvider = (props: EditorProps) => {
    const [state, dispatch] = useReducer(editorReducer, initialState)

    return (
        <EditorContext.Provider value={{state, dispatch}}>{props.children}</EditorContext.Provider>
    )
}

// Para crear un contexto en typescript se ocupa:
// Los tipos (si ocupa)
// un provider
// el contexto como tal

// Para hacer una especie de Redux se ocupa:
// Lo anterior
// initial states
// dispatch
// reducers
// actions

// Custom Hook para usar el context del editor
export const useEditor = () => {
    const context = useContext(EditorContext)

    if (!context) {
        throw new Error('useEditor Hook must be used within the EDITOR provider')
    }

    return context
}

export default EditorProvider;