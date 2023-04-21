"use client";

import { cn } from "@/utils/cn";
import { useCallback, useEffect, useState } from "react";
import { useTimer } from "use-timer";
import { ScoreCard } from "@/components/scoreCard";
import { GameOver } from "@/components/gameOver";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const runtime = 'experimental-edge';

interface Cell {
    x: number;
    y: number;
    className: string;
}

const getRandomPiece = (): Cell[] => {
    const isHorizontal = Math.random() > 0.5;

    const getBlueRicky = () => {
        const className = "bg-blue-ricky";

        if (isHorizontal) {
            return [
                { x: 0, y: 0, className },
                { x: 1, y: 0, className },
                { x: 2, y: 0, className },
                { x: 2, y: 1, className }
            ];
        }

        return [
            { x: 1, y: 0, className },
            { x: 1, y: 1, className },
            { x: 1, y: 2, className },
            { x: 0, y: 2, className }
        ];
    };

    const getOrangeRicky = () => {
        const className = "bg-orange-ricky";
        if (isHorizontal) {
            return [
                { x: 0, y: 1, className },
                { x: 1, y: 1, className },
                { x: 2, y: 1, className },
                { x: 2, y: 0, className }
            ];
        }

        return [
            { x: 1, y: 0, className },
            { x: 1, y: 1, className },
            { x: 1, y: 2, className },
            { x: 2, y: 2, className }
        ];
    };

    const getHero = () => {
        const className = "bg-hero";

        if (isHorizontal) {
            return [
                { x: 1, y: 0, className },
                { x: 1, y: 1, className },
                { x: 1, y: 2, className },
                { x: 1, y: 3, className }
            ];
        }

        return [
            { x: 0, y: 1, className },
            { x: 1, y: 1, className },
            { x: 2, y: 1, className },
            { x: 3, y: 1, className }
        ];
    };

    const getSmashBoy = () => {
        const className = "bg-smash-boy";
        return [
            { x: 0, y: 0, className },
            { x: 1, y: 0, className },
            { x: 1, y: 1, className },
            { x: 0, y: 1, className }
        ];
    };

    const getClevelandZ = () => {
        const className = "bg-cleveland-z";
        if (isHorizontal) {
            return [
                { x: 0, y: 0, className },
                { x: 1, y: 0, className },
                { x: 1, y: 1, className },
                { x: 2, y: 1, className }
            ];
        }

        return [
            { x: 1, y: 0, className },
            { x: 1, y: 1, className },
            { x: 0, y: 1, className },
            { x: 0, y: 2, className }
        ];
    };

    const getRhodeIslandZ = () => {
        const className = "bg-rhode-island-z";
        if (isHorizontal) {
            return [
                { x: 0, y: 1, className },
                { x: 1, y: 1, className },
                { x: 1, y: 0, className },
                { x: 2, y: 0, className }
            ];
        }

        return [
            { x: 0, y: 0, className },
            { x: 0, y: 1, className },
            { x: 1, y: 1, className },
            { x: 1, y: 2, className }
        ];
    };

    const getTeeWee = () => {
        const className = "bg-teewee";
        if (isHorizontal) {
            return [
                { x: 0, y: 0, className },
                { x: 1, y: 0, className },
                { x: 2, y: 0, className },
                { x: 1, y: 1, className }
            ];
        }

        return [
            { x: 1, y: 0, className },
            { x: 1, y: 1, className },
            { x: 1, y: 2, className },
            { x: 0, y: 1, className }
        ];
    };

    const pieceChoice = Math.floor(Math.random() * 7);
    switch (pieceChoice) {
        case 0:
            return getBlueRicky();
        case 1:
            return getOrangeRicky();
        case 2:
            return getHero();
        case 3:
            return getSmashBoy();
        case 4:
            return getClevelandZ();
        case 5:
            return getRhodeIslandZ();
        case 6:
            return getTeeWee();
        default:
            return getHero();
    }
};

const Home = () => {
    const [gameActive, setGameActive] = useState(true);
    const [currentPiece, setCurrentPiece] = useState<Cell[]>([]);
    const [occupiedCells, setOccupiedCells] = useState<Cell[]>([]);
    const [currentScore, setCurrentScore] = useState(0);

    const startGame = () => {
        setCurrentScore(0);
        setOccupiedCells([]);
        setCurrentPiece(getRandomPiece());
        setGameActive(true);
    };

    const canMoveRight = useCallback(() => {
        return !currentPiece.some(
            currentCell =>
                currentCell.x === 9 ||
                currentCell.y === 19 ||
                occupiedCells.some(occupiedCell => occupiedCell.x === currentCell.x + 1 && occupiedCell.y === currentCell.y)
        );
    }, [currentPiece, occupiedCells]);

    const canMoveLeft = useCallback(() => {
        return !currentPiece.some(
            currentCell =>
                currentCell.x === 0 ||
                currentCell.y === 19 ||
                occupiedCells.some(occupiedCell => occupiedCell.x === currentCell.x - 1 && occupiedCell.y === currentCell.y)
        );
    }, [currentPiece, occupiedCells]);

    const canMoveDown = useCallback(() => {
        return !currentPiece.some(
            currentCell =>
                currentCell.y === 19 || occupiedCells.some(occupiedCell => occupiedCell.x === currentCell.x && currentCell.y + 1 === occupiedCell.y)
        );
    }, [currentPiece, occupiedCells]);

    useTimer({
        autostart: true,
        onTimeUpdate: () => {
            if (!gameActive) {
                return;
            }

            if (currentPiece.some(cell => cell.y === 19)) {
                return;
            }
            setCurrentPiece(currentPiece.map(cell => ({ x: cell.x, y: cell.y + 1, className: cell.className })));
        }
    });

    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        if (!gameActive) {
            return;
        }

        const keyDownHandler = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowLeft":
                    if (canMoveLeft()) {
                        setCurrentPiece(currentPiece.map(cell => ({ x: cell.x - 1, y: cell.y, className: cell.className })));
                    }
                    break;
                case "ArrowRight":
                    if (canMoveRight()) {
                        setCurrentPiece(currentPiece.map(cell => ({ x: cell.x + 1, y: cell.y, className: cell.className })));
                    }
                    break;
                case "ArrowDown":
                    if (canMoveDown()) {
                        setCurrentScore(currentScore + 1);
                        setCurrentPiece(currentPiece.map(cell => ({ x: cell.x, y: cell.y + 1, className: cell.className })));
                    }
                    break;
                case "ArrowUp":
                    rotate();
                    break;
            }
        };

        const rotate = () => {
            const newX1 = currentPiece[0].y - currentPiece[1].y + currentPiece[1].x;
            const newY1 = currentPiece[1].x - currentPiece[0].x + currentPiece[1].y;
            const newX3 = currentPiece[2].y - currentPiece[1].y + currentPiece[1].x;
            const newY3 = currentPiece[1].x - currentPiece[2].x + currentPiece[1].y;
            const newX4 = currentPiece[3].y - currentPiece[1].y + currentPiece[1].x;
            const newY4 = currentPiece[1].x - currentPiece[3].x + currentPiece[1].y;

            const rotatedPiece = [
                { x: newX1, y: newY1, className: currentPiece[0].className },
                { x: currentPiece[1].x, y: currentPiece[1].y, className: currentPiece[1].className },
                { x: newX3, y: newY3, className: currentPiece[2].className },
                { x: newX4, y: newY4, className: currentPiece[3].className }
            ];

            if (
                rotatedPiece.some(
                    currentCell =>
                        currentCell.x < 0 ||
                        currentCell.x > 9 ||
                        currentCell.y < 0 ||
                        currentCell.y > 19 ||
                        occupiedCells.some(occupiedCell => occupiedCell.x === currentCell.x && currentCell.y === occupiedCell.y)
                )
            ) {
                return;
            }

            setCurrentPiece(rotatedPiece);
        };

        window.addEventListener("keydown", keyDownHandler);
        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    }, [canMoveDown, canMoveLeft, canMoveRight, currentPiece, currentScore, gameActive, occupiedCells]);

    useEffect(() => {
        if (!gameActive) {
            return;
        }

        if (!canMoveDown()) {
            setOccupiedCells([...occupiedCells, ...currentPiece]);
            setCurrentPiece(getRandomPiece());
        }
    }, [canMoveDown, currentPiece, gameActive, occupiedCells]);

    useEffect(() => {
        if (!gameActive) {
            return;
        }

        const deleteRow = (rowIndex: number) => {
            const newOccupiedSpaces: Cell[] = [];

            occupiedCells.forEach(cell => {
                if (cell.y === rowIndex) {
                    return;
                }

                if (cell.y > rowIndex) {
                    newOccupiedSpaces.push(cell);
                    return;
                }

                newOccupiedSpaces.push({ x: cell.x, y: cell.y + 1, className: cell.className });
            });

            setOccupiedCells(newOccupiedSpaces);
            setCurrentScore(currentScore + 100);
        };

        const gameOver = () => {
            setGameActive(false);
        };

        if (occupiedCells.some(cell => cell.y === 0)) {
            gameOver();
            return;
        }

        const rows = [...Array(20)].map((_, yIndex) => {
            return [...Array(10)].map((_, xIndex) => {
                return occupiedCells.some(cell => cell.x === xIndex && cell.y === yIndex);
            });
        });

        rows.forEach((row, rowIndex) => {
            if (row.every(cell => cell)) {
                deleteRow(rowIndex);
            }
        });
    }, [currentScore, gameActive, occupiedCells]);

    const getCellFill = ({ xIndex, yIndex }: { xIndex: number; yIndex: number }) => {
        for (const cell of [...currentPiece, ...occupiedCells]) {
            if (cell.x === xIndex && cell.y === yIndex) {
                return cell.className;
            }
        }

        return "bg-white";
    };

    return (
        <>
            <ScoreCard score={currentScore} />
            <div className="grid grid-cols-10 h-3/4 aspect-1/2 border-4 relative">
                {!gameActive && <GameOver score={currentScore} startGame={startGame} />}
                {[...Array(10)].map((_, xIndex) => (
                    <div className="border-2 flex flex-col" key={xIndex}>
                        {[...Array(20)].map((_, yIndex) => (
                            <div key={yIndex} className={cn("border-2 flex-grow", getCellFill({ xIndex, yIndex }))} />
                        ))}
                    </div>
                ))}
            </div>
            <Link href="/leaderboard">
                <Button variant="link">Leaderboard</Button>
            </Link>
        </>
    );
};

export default Home;
