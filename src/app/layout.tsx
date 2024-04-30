import {ThemeProvider} from "@/providers/theme-provider"

import type {Metadata} from "next";

// Aca podes importar fonts desde Google fonts!
import {DM_Sans} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import ModalProvider from "@/providers/modal-provider";

// Aca creas un objeto del font
const font = DM_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Fuzzie",
    description: "Automate Your Work With Fuzzie",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
            <html lang="en">
            <body className={font.className}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <ModalProvider>
                    {children}
                </ModalProvider>
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}
