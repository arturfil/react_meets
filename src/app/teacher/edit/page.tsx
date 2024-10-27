'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuthStore } from '@/store/auth/auth.store';

export default function EditSettings() {
  const user = useAuthStore((state) => state.user);
  const getUserByToken = useAuthStore((state) => state.getUserByToken);

  useEffect(() => {
    getUserByToken();
  }, [getUserByToken]);

  return (
    <div className="m-auto p-10">
      <h2 className="mx-auto rounded-md p-4 text-2xl font-bold">
        Edit Settings
      </h2>
      <div className="container flex h-[600px] flex-col rounded-lg border-[1px] border-gray-400 p-6 sm:w-[400px] md:w-[600px] lg:w-[800px]">
        <div className="grid grid-cols-3">
          <h2>Start Work Time</h2>
          <p>8:00 AM</p>
          <ScheduleDialog />
        </div>
        <div className="grid grid-cols-3">
          <h2>End Work Time</h2>
          <p>6:00 PM</p>
        </div>
        <hr className="my-2 border-gray-400" />
        <div className="grid grid-cols-3">
          <h2>Subjects Taught</h2>
          <p>{}</p>
          {user && (
            <Button
              asChild
              className="w-[100px]"
              variant="outline"
            >
              <Link href={`/subjects/${user!.id}`}>
                Edit <Pencil className="ml-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ScheduleDialog() {
  const [schedule, setSchedule] = useState({
    startTime: '',
    endTime: '',
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-[100px]"
          variant="outline"
        >
          Edit
          <Pencil className="ml-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-h-[400px] sm:max-w-[555px]">
        <p>
          {schedule.startTime} - {schedule.endTime}
        </p>
        <DialogHeader>
          <DialogTitle>Edit Schedule</DialogTitle>
          <DialogDescription>
            Select Start and End Time for available spots
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right"
            >
              Start Work Time
            </Label>
            <Input
              type="time"
              onChange={(e) =>
                setSchedule({
                  ...schedule,
                  startTime: e.target.value,
                })
              }
              value={schedule.startTime}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="username"
              className="text-right"
            >
              End Work Time
            </Label>
            <Input
              type="time"
              onChange={(e) =>
                setSchedule({
                  ...schedule,
                  endTime: e.target.value,
                })
              }
              value={schedule.endTime}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
