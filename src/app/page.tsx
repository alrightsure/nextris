import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Board } from "@/components/board";

const Home = () => {
    return (
        <main className="container flex flex-col items-center h-screen gap-8 pt-12">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Nextris</h1>
            <Board />
        </main>
    );
};
export default Home;
