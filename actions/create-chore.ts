"use server";

import { chore } from "@/db/schema";
import { createDb } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function createChore(data: FormData) {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const date = data.get("date") as string;

  if (!name || !description || !date) {
    return;
  }

  const db = createDb();

  const newChore: typeof chore.$inferInsert = {
    name,
    description,
    due_date: new Date(date),
    created_by: 1,
  };

  await db.insert(chore).values(newChore);
  revalidateTag('chores');
}

export async function deleteChore(id: number) {
  const db = createDb();

  await db.delete(chore).where(eq(chore.id, id));
  revalidateTag('chores');
}
