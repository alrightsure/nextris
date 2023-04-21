import { pgTable, serial, integer, varchar, date } from "drizzle-orm/pg-core";

export const topScores = pgTable("top_scores", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 3 }).notNull(),
    score: integer("score").notNull(),
    enteredOn: date("entered_on").notNull().default("now()")
});
