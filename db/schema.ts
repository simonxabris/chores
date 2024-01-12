import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const chore = sqliteTable("chore", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  due_date: integer("due_date", { mode: "timestamp" }).notNull(),
  completed: integer("completed", { mode: "boolean" }),
  completed_by: integer("completed_by"),
  created_by: integer("created_by"),
  created_at: integer("created_at").default(sql`CURRENT_TIMESTAMP`),
});
