import { Card, CardHeader, CardTitle } from "./ui/card";

interface ScoreCardProps {
    score: number;
}

export const ScoreCard = ({ score }: ScoreCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between gap-8">
                    Score <span>{score}</span>
                </CardTitle>
            </CardHeader>
        </Card>
    );
};
