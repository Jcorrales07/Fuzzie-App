import React from 'react';
import EditorProvider from "@/providers/editor-provider";

type Props = {}

function Page(props: Props) {
    // WIP: If the user tries to access this route you should send them to their first workflow they have
    // or create one or you can have your own behavior

    return (
        <div className="h-full">
            <EditorProvider>
                <div></div>
            </EditorProvider>
        </div>
    );
}

export default Page;