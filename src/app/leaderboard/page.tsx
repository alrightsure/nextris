import { H2 } from "@/components/ui/h2";
import { db } from "@/utils/db";
import { topScores } from "@/utils/db/schema";
import { desc } from "drizzle-orm/expressions";

const HighScores = async () => {
    const scores = await db.select().from(topScores).orderBy(desc(topScores.score)).limit(100);

    return (
        <>
            <H2>Leaderboard</H2>
            <div className="w-3/4">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Rank
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Score
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {scores.map((score, index) => (
                                <tr key={score.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{index + 1}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">{score.name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm ">{score.score}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm ">{new Date(score.enteredOn).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default HighScores;
