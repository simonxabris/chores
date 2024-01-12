import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { chore } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

async function getChores() {
  const client = createClient({
    url: process.env.DB_URL as string,
    authToken: process.env.DB_AUTH_TOKEN as string,
  });
  const db = drizzle(client);

  return db.select().from(chore).where(eq(chore.created_by, 1));
}

export default async function Home() {
  const chores = await getChores();

  return (
    <>
      <h1 className="text-3xl py-4">My chores</h1>

      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <h2 className="text-xl py-4">Incomplete</h2>
          {chores
            .filter((c) => c.completed === null)
            .map((chore) => (
              <ul key={chore.id} className="ml-4 flex flex-col">
                <li>{chore.name}</li>
                <li className="text-sm text-gray-300">{chore.description}</li>
              </ul>
            ))}
        </div>

        <div className="col-span-1">
          <h2 className="text-xl py-4">Complete</h2>
          {chores
            .filter((c) => c.completed === true)
            .map((chore) => (
              <ul key={chore.id} className="ml-4 mb-2 flex flex-col">
                <li>{chore.name}</li>
                <li className="text-sm text-gray-300">{chore.description}</li>
              </ul>
            ))}
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Add chore</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Textarea id="username" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Due data
              </Label>
              <Input id="date" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
