import {z} from "zod";


// Esto es basicamente los parametros que debe llevar el formulario para editar el perfil, es para mantener consistencia.
export const EditUserProfileSchema = z.object({
    email: z.string().email('Required'),
    name: z.string().min(2, 'Required'),
})