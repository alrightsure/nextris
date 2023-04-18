import "./globals.css";

export const metadata = {
    title: "Nextris",
    description: "Tetris powered by Next.js"
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

export default RootLayout;
