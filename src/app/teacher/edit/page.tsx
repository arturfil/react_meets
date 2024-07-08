import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function EditSettings() {
  return (
    <div className="p-10 m-auto">
      <h2 className="font-bold text-2xl p-4 mx-auto rounded-md">
        Edit Settings
      </h2>

      <div className="
        flex flex-col border-gray-400 
        border-[1px] p-6 container sm:w-[400px] 
        md:w-[600px] lg:w-[800px] h-[600px] rounded-lg
      ">

        <div className="grid grid-cols-3">
          <h2>Start Work Time</h2>
          <p>8:00 AM</p>
          <Button asChild className="w-[100px]" variant="outline">
            <Link href="/teacher/addSubject">
              Edit <Pencil className="ml-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-3">
          <h2>End Work Time</h2>
          <p>6:00 PM</p>
        </div>
        <hr className="border-gray-400 my-2" />
        <div className="grid grid-cols-3">
          <h2>Subjects Taught</h2>
          <p>Test</p>
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
