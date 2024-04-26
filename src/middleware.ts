import {clerkMiddleware, ClerkMiddlewareAuth, createRouteMatcher} from "@clerk/nextjs/server";
import {NextApiRequest} from "next";
import {NextRequest} from "next/server";

const isProtectedRoute = createRouteMatcher('/dashboard')

export default clerkMiddleware((auth : ClerkMiddlewareAuth, req : NextRequest) => {
    if (isProtectedRoute(req)) auth().protect();
}) ;

export const config = {
    matcher: [
        '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
        '/', // Run middleware on index page
        '/(api|trpc)(.*)'], // Run middleware on API routes
};

// Aprendí esto con los docs de Clerk
// https://clerk.com/docs/references/nextjs/clerk-middleware

// Con clerkMiddleware, NINGUNA ruta está protegida. Entonces es tu trabajo hacerlo. Y se hace con:
// createRouteMatcher() para proteger multiples rutas.

// Con authMiddleware, se tienen que definir las rutas que son publicas y las que se pueden ignorar,
// las que no se definan ahi, estan protegidas por default

//publicRoutes: ['/', '/api/clerk-webhook', '/api/drive-activity/notification'],
// ignoredRoutes: [
//     '/api/auth/callback/discord',
//     '/api/auth/callback/notion',
//     '/api/auth/callback/slack',
//     '/api/flow',
//     '/api/cron/wait',
// ],