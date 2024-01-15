import { createClient } from "@libsql/client";
import { type ClassValue, clsx } from "clsx";
import { drizzle } from "drizzle-orm/libsql";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createDb() {
  const client = createClient({
    url: process.env.DB_URL as string,
    authToken: process.env.DB_AUTH_TOKEN as string,
  });

  return drizzle(client);
}
