import { H1 } from "@/components/ui/h1";
import Link from "next/link";
import "./globals.css";

export const metadata = {
    title: "Nextris",
    description: "Tetris powered by Next.js"
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <main className="container flex flex-col items-center h-screen gap-8 pt-12">
                    <Link href="/">
                        <H1>Nextris</H1>
                    </Link>
                    {children}
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
