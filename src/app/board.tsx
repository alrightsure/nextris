"use client";

import { cn } from "@/utils/cn";
import { useCallback, useEffect, useState } from "react";
import { useKeyPressEvent } from "react-use";
import { useTimer } from "use-timer";

interface Cell {
    x: number;
    y: number;
    className: string;
}

const getNextPiece = (): Cell[] => {
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

export const Board = () => {
    const [currentPiece, setCurrentPiece] = useState<Cell[]>([]);
    const [occupiedCells, setOccupiedCells] = useState<Cell[]>([]);

    const canMoveRight = () => {
        return !currentPiece.some(
            currentCell =>
                currentCell.x === 9 ||
                currentCell.y === 19 ||
                occupiedCells.some(occupiedCell => occupiedCell.x === currentCell.x + 1 && occupiedCell.y === currentCell.y)
        );
    };

    const canMoveLeft = () => {
        return !currentPiece.some(
            currentCell =>
                currentCell.x === 0 ||
                currentCell.y === 19 ||
                occupiedCells.some(occupiedCell => occupiedCell.x === currentCell.x - 1 && occupiedCell.y === currentCell.y)
        );
    };

    const canMoveDown = useCallback(() => {
        return !currentPiece.some(
            currentCell =>
                currentCell.y === 19 || occupiedCells.some(occupiedCell => occupiedCell.x === currentCell.x && currentCell.y + 1 === occupiedCell.y)
        );
    }, [currentPiece, occupiedCells]);

    useTimer({
        autostart: true,
        onTimeUpdate: () => {
            if (currentPiece.some(cell => cell.y === 19)) {
                return;
            }
            setCurrentPiece(currentPiece.map(cell => ({ x: cell.x, y: cell.y + 1, className: cell.className })));
        }
    });

    useEffect(() => {
        setCurrentPiece(getNextPiece());
    }, []);

    useEffect(() => {
        if (!canMoveDown()) {
            setOccupiedCells([...occupiedCells, ...currentPiece]);
            setCurrentPiece(getNextPiece());
        }
    }, [canMoveDown, currentPiece, occupiedCells]);

    useEffect(() => {
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
        };

        if (occupiedCells.some(cell => cell.y === 0)) {
            alert("Game Over!");
            setOccupiedCells([]);
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
    }, [occupiedCells]);

    useKeyPressEvent("ArrowLeft", () => {
        if (canMoveLeft()) {
            setCurrentPiece(currentPiece.map(cell => ({ x: cell.x - 1, y: cell.y, className: cell.className })));
        }
    });

    useKeyPressEvent("ArrowRight", () => {
        if (canMoveRight()) {
            setCurrentPiece(currentPiece.map(cell => ({ x: cell.x + 1, y: cell.y, className: cell.className })));
        }
    });

    useKeyPressEvent("ArrowDown", () => {
        if (canMoveDown()) {
            setCurrentPiece(currentPiece.map(cell => ({ x: cell.x, y: cell.y + 1, className: cell.className })));
        }
    });

    useKeyPressEvent("ArrowUp", () => {
        const rotatedPiece: Cell[] = currentPiece.map(cell => {
            const xDiff = cell.x - currentPiece[0].x;
            const yDiff = cell.y - currentPiece[0].y;
            return { x: currentPiece[0].x - yDiff, y: currentPiece[0].y + xDiff, className: cell.className };
        });
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
    });

    const getCellFill = ({ xIndex, yIndex }: { xIndex: number; yIndex: number }) => {
        for (const cell of [...currentPiece, ...occupiedCells]) {
            if (cell.x === xIndex && cell.y === yIndex) {
                return cell.className;
            }
        }

        return "bg-white";
    };

    return (
        <div className="grid grid-cols-10 h-3/4 aspect-1/2 border-4 border-black">
            {[...Array(10)].map((_, xIndex) => (
                <div className="border-2 flex flex-col" key={xIndex}>
                    {[...Array(20)].map((_, yIndex) => (
                        <div key={yIndex} className={cn("border-2 flex-grow", getCellFill({ xIndex, yIndex }))} />
                    ))}
                </div>
            ))}
        </div>
    );
};
