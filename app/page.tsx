import { chore } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createChore, deleteChore } from "@/actions/create-chore";
import { Check, Trash } from "lucide-react";
import { unstable_cache } from "next/cache";
import { createDb } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";

const getChores = unstable_cache(
  async function () {
    const db = createDb();

    return db.select().from(chore).where(eq(chore.created_by, 1));
  },
  undefined,
  { tags: ["chores"] }
);

export default async function Home() {
  const chores = await getChores();

  return (
    <>
      <h1 className="text-3xl py-4">My chores</h1>

      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <h2 className="text-xl py-4">Incomplete</h2>
          {chores
            .filter((c) => !c.completed)
            .map((chore) => (
              <ul key={chore.id} className="ml-4 flex flex-col">
                <li>{chore.name}</li>
                <li className="text-sm text-gray-300">{chore.description}</li>
                <Button size="icon">
                  <Check />
                </Button>
                <form
                  action={async () => {
                    "use server";
                    await deleteChore(chore.id);
                  }}
                >
                  <Button size="icon">
                    <Trash />
                  </Button>
                </form>
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
          <form action={createChore}>
            <DialogHeader>
              <DialogTitle>Add new chore</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input required id="name" name="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  required
                  id="description"
                  name="description"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Due data
                </Label>
                <DatePicker id="date" name="date"/>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
