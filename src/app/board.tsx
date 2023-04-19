"use client";

import { cn } from "@/utils/cn";
import { useCallback, useEffect, useState } from "react";
import { useKeyPressEvent } from "react-use";
import { useTimer } from "use-timer";

interface Tetrimino {
    cells: [{ x: number; y: number }];
    className: string;
}

const getNextPiece = () => {
    const getLShape = () => [
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 2]
    ];

    const getSquareShape = () => [
        [1, 0],
        [1, 1],
        [2, 0],
        [2, 1]
    ];

    const getStraightShape = () => {
        const isHorizontal = Math.random() > 0.5;
        if (isHorizontal) {
            return [
                [1, 0],
                [1, 1],
                [1, 2],
                [1, 3]
            ];
        } else {
            return [
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0]
            ];
        }
    };

    const getSkewShape = () => {
        const isHorizontal = Math.random() > 0.5;
        if (isHorizontal) {
            return [
                [1, 0],
                [1, 1],
                [2, 1],
                [2, 2]
            ];
        } else {
            return [
                [1, 0],
                [2, 0],
                [2, 1],
                [3, 1]
            ];
        }
    };

    const pieceChoice = Math.floor(Math.random() * 4);
    switch (pieceChoice) {
        case 0:
            return getLShape();
        case 1:
            return getSquareShape();
        case 2:
            return getStraightShape();
        case 3:
            return getSkewShape();
        default:
            return getLShape();
    }
};

export const Board = () => {
    const [currentPiece, setCurrentPiece] = useState<number[][]>([]);
    const [occupiedSpaces, setOccupiedSpaces] = useState<number[][]>([
        [9, 19],
        [8, 19],
        [7, 19],
        [6, 19],
        [5, 19],
        [4, 19],
        [3, 19],
        [2, 19]
    ]);

    const canMoveRight = () => {
        return !currentPiece.some(([x, y]) => x === 9 || y === 19 || occupiedSpaces.some(([x2, y2]) => x2 === x + 1 && y2 === y));
    };

    const canMoveLeft = () => {
        return !currentPiece.some(([x, y]) => x === 0 || y === 19 || occupiedSpaces.some(([x2, y2]) => x2 === x - 1 && y2 === y));
    };

    const canMoveDown = useCallback(() => {
        return !currentPiece.some(([x, y]) => y === 19 || occupiedSpaces.some(([x2, y2]) => x === x2 && y + 1 === y2));
    }, [currentPiece, occupiedSpaces]);

    useTimer({
        autostart: true,
        onTimeUpdate: () => {
            if (currentPiece.some(([x, y]) => y === 19)) {
                return;
            }
            setCurrentPiece(currentPiece.map(([x, y]) => [x, y + 1]));
        }
    });

    useEffect(() => {
        setCurrentPiece(getNextPiece());
    }, []);

    useEffect(() => {
        if (!canMoveDown()) {
            setOccupiedSpaces([...occupiedSpaces, ...currentPiece]);
            setCurrentPiece(getNextPiece());
        }
    }, [canMoveDown, currentPiece, occupiedSpaces]);

    useEffect(() => {
        const deleteRow = (rowIndex: number) => {
            const newOccupiedSpaces: number[][] = [];

            occupiedSpaces.forEach(space => {
                if (space[1] === rowIndex) {
                    return;
                }

                if (space[1] > rowIndex) {
                    newOccupiedSpaces.push(space);
                    return;
                }

                newOccupiedSpaces.push([space[0], space[1] + 1]);
            });

            setOccupiedSpaces(newOccupiedSpaces);
        };

        if (occupiedSpaces.some(([_, y]) => y === 0)) {
            alert("Game Over!");
            setOccupiedSpaces([]);
        }

        const rows = [...Array(20)].map((_, yIndex) => {
            return [...Array(10)].map((_, xIndex) => {
                return occupiedSpaces.some(([x, y]) => x === xIndex && y === yIndex);
            });
        });

        rows.forEach((row, rowIndex) => {
            if (row.every(cell => cell)) {
                deleteRow(rowIndex);
            }
        });
    }, [occupiedSpaces]);

    useKeyPressEvent("ArrowLeft", () => {
        if (canMoveLeft()) {
            setCurrentPiece(currentPiece.map(([x, y]) => [x - 1, y]));
        }
    });

    useKeyPressEvent("ArrowRight", () => {
        if (canMoveRight()) {
            setCurrentPiece(currentPiece.map(([x, y]) => [x + 1, y]));
        }
    });

    useKeyPressEvent("ArrowDown", () => {
        if (canMoveDown()) {
            setCurrentPiece(currentPiece.map(([x, y]) => [x, y + 1]));
        }
    });

    useKeyPressEvent("ArrowUp", () => {
        const rotatedPiece = currentPiece.map(([x, y]) => {
            const xDiff = x - currentPiece[0][0];
            const yDiff = y - currentPiece[0][1];
            return [currentPiece[0][0] - yDiff, currentPiece[0][1] + xDiff];
        });
        if (rotatedPiece.some(([x, y]) => x < 0 || x > 9 || y < 0 || y > 19 || occupiedSpaces.some(([x2, y2]) => x === x2 && y === y2))) {
            return;
        }
        setCurrentPiece(rotatedPiece);
    });

    const shouldFillCell = ({ xIndex, yIndex }: { xIndex: number; yIndex: number }) => {
        return occupiedSpaces.some(([x, y]) => x === xIndex && y === yIndex) || currentPiece.some(([x, y]) => x === xIndex && y === yIndex);
    };

    return (
        <div className="grid grid-cols-10 h-2/3 w-1/2 border-4 border-black">
            {[...Array(10)].map((_, xIndex) => (
                <div className="border-2 flex flex-col" key={xIndex}>
                    {[...Array(20)].map((_, yIndex) => (
                        <div key={yIndex} className={cn("border-2 flex-grow", shouldFillCell({ xIndex, yIndex }) ? "bg-slate-700" : "bg-white")} />
                    ))}
                </div>
            ))}
        </div>
    );
};
