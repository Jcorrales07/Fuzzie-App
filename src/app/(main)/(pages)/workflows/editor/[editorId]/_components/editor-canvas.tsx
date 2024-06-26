import React, {useMemo} from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import {EditorNodeType} from "@/lib/types";
import {useEditor} from "@/providers/editor-provider";


type Props = {}

const initialNodes: EditorNodeType[] = []

const initialEdges: { id: string; source: string; target: string }[] = []

function EditorCanvas(props: Props) {
    // Esta es la manera a como accedes al Provider (o al State) del Editor, igual como en Redux
    const {dispatch, state} = useEditor()

    //
    const nodeTypes = useMemo(() =>  ({
        Action: EditorCanvasCardSingle,
        Trigger: EditorCanvasCardSingle,
        Email: EditorCanvasCardSingle,
        Condition: EditorCanvasCardSingle,
        AI: EditorCanvasCardSingle,
        Slack: EditorCanvasCardSingle,
        'Google Drive': EditorCanvasCardSingle,
        Notion: EditorCanvasCardSingle,
        Discord: EditorCanvasCardSingle,
        'Custom Webhook': EditorCanvasCardSingle,
        'Google Calendar': EditorCanvasCardSingle,
        Wait: EditorCanvasCardSingle,
    }))

    return (
        <div>EditorCanvas</div>
    );
}

export default EditorCanvas;