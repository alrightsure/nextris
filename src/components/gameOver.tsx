"use client";

import { useState, useTransition, type FormEvent } from "react";
import { Button } from "./ui/button";
import { H1 } from "./ui/h1";
import { H3 } from "./ui/h3";
import type { ScoreAddSchema } from "../app/api/scores/route";
import { useRouter } from "next/navigation";

interface GameOverProps {
    score: number;
    startGame: () => void;
}

export const GameOver = ({ score, startGame }: GameOverProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);

    const isMutating = isFetching || isPending;

    const updateScore = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFetching(true);

        const formData = new FormData(e.currentTarget);
        const char1 = formData.get("char1");
        const char2 = formData.get("char2");
        const char3 = formData.get("char3");

        const scorePayload: ScoreAddSchema = {
            name: `${char1}${char2}${char3}`,
            score
        };

        await fetch("/api/scores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(scorePayload)
        });
        setIsFetching(false);

        startTransition(() => {
            router.refresh();
            startGame();
        });
    };

    return (
        <div className="absolute h-full w-full text-white" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
            <div className="flex flex-col items-center justify-center h-full">
                <H1>Game Over!</H1>
                <H3>Final Score: {score}</H3>
                <form onSubmit={updateScore}>
                    <div className="flex gap-4 p-4">
                        <LetterPicker name="char1" disabled={isMutating} />
                        <LetterPicker name="char2" disabled={isMutating} />
                        <LetterPicker name="char3" disabled={isMutating} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" type="submit" loading={isMutating}>
                            Submit Score
                        </Button>
                        <Button variant="ghost" type="button" onClick={() => startGame()} disabled={isMutating}>
                            Play Again
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const LetterPicker = ({ name, disabled }: { name: string; disabled?: boolean }) => {
    const [letter, setLetter] = useState("A");

    const incrementLetter = () => {
        const charCode = letter.charCodeAt(0);
        if (charCode < 90) {
            setLetter(String.fromCharCode(charCode + 1));
        } else {
            setLetter("A");
        }
    };

    const decrementLetter = () => {
        const charCode = letter.charCodeAt(0);
        if (charCode > 65) {
            setLetter(String.fromCharCode(charCode - 1));
        } else {
            setLetter("Z");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <Button onClick={incrementLetter} type="button" variant="outline" disabled={disabled}>
                ^
            </Button>
            <input hidden value={letter} name={name} readOnly />
            <div className="text-4xl font-extrabold tracking-tight">{letter}</div>
            <Button onClick={decrementLetter} type="button" variant="outline" disabled={disabled}>
                v
            </Button>
        </div>
    );
};
