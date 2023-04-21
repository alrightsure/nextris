import { z } from "zod";
import { db } from "@/utils/db";
import { topScores } from "@/utils/db/schema";

const scoreAddSchema = z.object({
    name: z.string(),
    score: z.number()
});

export type ScoreAddSchema = z.infer<typeof scoreAddSchema>;

export const POST = async (request: Request) => {
    const { name, score } = await scoreAddSchema.parseAsync(await request.json());

    try {
        await db.insert(topScores).values({
            name,
            score
        });
    } catch (e: any) {
        console.log(e.message);
        return new Response(e.message, { status: 400 });
    }

    return new Response("Score added", { status: 200 });
};
