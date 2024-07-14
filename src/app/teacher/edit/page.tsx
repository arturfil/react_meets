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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function EditSettings() {
  return (
    <div className="p-10 m-auto">
      <h2 className="font-bold text-2xl p-4 mx-auto rounded-md">
        Edit Settings
      </h2>

      <div
        className="
            flex flex-col border-gray-400 
            border-[1px] p-6 container sm:w-[400px] 
            md:w-[600px] lg:w-[800px] h-[600px] rounded-lg
          "
      >
        <div className="grid grid-cols-3">
          <h2>Start Work Time</h2>
          <p>8:00 AM</p>
          {/*<Button className="w-[100px]" variant="outline">
              Edit <Pencil className="ml-4" />
          </Button>*/}
          <ScheduleDialog />
        </div>
        <div className="grid grid-cols-3">
          <h2>End Work Time</h2>
          <p>6:00 PM</p>
        </div>
        <hr className="border-gray-400 my-2" />
        <div className="grid grid-cols-3">
          <h2>Subjects Taught</h2>
          <p>{}</p>
          <Button asChild className="w-[100px]" variant="outline">
            <Link href="/teacher/edit">
              Edit <Pencil className="ml-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ScheduleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[100px]" variant="outline">
          Edit
          <Pencil className="ml-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[555px] sm:min-h-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Schedule</DialogTitle>
          <DialogDescription>
            Select Start and End Time for available spots
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Start Work Time
            </Label>
            <Input id="name" type="time" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              End Work Time
            </Label>
            <Input id="username" type="time" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
