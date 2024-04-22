"use client"

// Esto es la configuracion de la API de UploadCare, tiene documentacion asi que de ahi se saca todo.
// Se configura en un componente, entonces por eso lo hago aca.

import React, {useEffect, useRef} from 'react';
import * as LR from '@uploadcare/blocks'
import {useRouter} from 'next/navigation'

type Props = {
    onUpload?: any
}

LR.registerBlocks(LR)

function UploadcareButton({onUpload}: Props) {
    const router = useRouter()
    const ctxProviderRef = useRef<typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider>(null)

    // useEffect lo vamos a usar para esperar un evento (que es el de un archivo ya cargado)
    // Y va a recargar la pagina para que el usuario pueda ver la ultima info
    useEffect(() => {
        const handleUpload = async (e: any) => {
            const file = await onUpload(e.detail.cdnUrl)

            // Si el archivo está subido correctamente, entonces refrescamos
            // Si no, no pasa nada
            if (file) {
                router.refresh()
            }
        }

        // Lo ignoro porque me molesta, pero no causa un error
        // @ts-ignore
        ctxProviderRef.current.addEventListener('file-upload-success', handleUpload)
    }, []);

    // Esto son web components, se quitan los errores con
    // "types": ["@uploadcare/blocks/types/jsx"] en tsconfig.json
    return (
        <div>
            <lr-config
                ctx-name="my-uploader"
                pubkey="a9428ff5ff90ae7a64eb"
            />

            <lr-file-uploader-regular
                ctx-name="my-uploader"
                css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
            />

            <lr-upload-ctx-provider
                ctx-name="my-uploader"
                ref={ctxProviderRef}
            />
        </div>
    );
}

export default UploadcareButton;