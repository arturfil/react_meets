import React, { useEffect, useState } from "react";
import {
  CircleUser,
  Clock,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth/auth.store";
import { useScheduleStore } from "@/store/schedules/schedule.store";
import { useSubjectStore } from "@/store/subject/subject.store";
import { useTeachingStore } from "@/store/teachings/teachings.store";
import ScheduleDialog from "../dialogs/ScheduleDialog";
import SubjectDialog from "../dialogs/SubjectDialog";
import { ScheduleDay, ScheduleUpdateField } from "@/interfaces/Schedule";
import { Subject } from "@/interfaces/Subject";


const TeacherProfile: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  const searchedSubjects = useSubjectStore((state) => state.searchedSubjects as Subject[]);
  const getSubjects = useSubjectStore((state) => state.getSubjects);

  const isSubjectDialogOpen = useSubjectStore(
    (state) => state.isSubjectDialogOpen
  );
  const setSubjectDialogOpen = useSubjectStore(
    (state) => state.setSubjectDialogOpen
  );

  const teachings = useTeachingStore((state) => state.teachings);
  const getTeachings = useTeachingStore((state) => state.getTeachings);

  const setScheduleDialogOpen = useScheduleStore(
    (state) => state.setScheduleDialogOpen
  );

  const [schedule, setSchedule] = useState<ScheduleDay>({
    monday: { start: "09:00", end: "17:00", enabled: true },
    tuesday: { start: "09:00", end: "17:00", enabled: true },
    wednesday: { start: "09:00", end: "17:00", enabled: true },
    thursday: { start: "09:00", end: "17:00", enabled: true },
    friday: { start: "09:00", end: "17:00", enabled: true },
  });

  const [teachingSubjects, setTeachingSubjects] = useState<string[]>([]);

  useEffect(() => {
    getSubjects();
    getTeachings();
  }, [getSubjects, getTeachings]);

  const handleScheduleUpdate = (
    day: string,
    field: ScheduleUpdateField,
    value: string | boolean
  ): void => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSubjectAdd = (subjectId: string): void => {
    if (!teachingSubjects.includes(subjectId)) {
      setTeachingSubjects([...teachingSubjects, subjectId]);
    }
  };

  const handleSubjectRemove = (subjectId: string): void => {
    setTeachingSubjects(teachingSubjects.filter((id) => id !== subjectId));
  };

  return (
    <div className="container mx-auto rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800">
      <div className="mb-6 rounded-lg p-6">
        {/* Profile Header with Image */}
        <div className="mb-8 flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8">
          <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-gray-200 bg-gray-50">
            <div className="flex h-full w-full items-center justify-center">
              <CircleUser className="h-32 w-32 text-gray-400" />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="mb-4 text-gray-600">{user?.email}</p>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setScheduleDialogOpen(true)}>
                <Clock className="mr-2 h-4 w-4" />
                Edit Schedule
              </Button>
              <Button onClick={() => setSubjectDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Subjects
              </Button>
            </div>
          </div>
          <div>
            <Button
              onClick={() => console.log("works")}
              variant="ghost"
            >
              <Settings />
            </Button>
          </div>
        </div>

        {/* Schedule Display */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Working Hours</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(schedule).map(([day, hours]) => (
              <div
                key={day}
                className="rounded-lg border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium capitalize">{day}</h3>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hours.enabled}
                      onChange={(e) =>
                        handleScheduleUpdate(day, "enabled", e.target.checked)
                      }
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                </div>
                {hours.enabled && (
                  <p className="mt-2 text-sm text-gray-600">
                    {hours.start} - {hours.end}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Subjects */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Teaching Subjects</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teachings?.map(
              (teaching) =>
                teaching && (
                  <div
                    key={teaching.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 shadow-sm"
                  >
                    <div>
                      <h3 className="font-medium">{teaching.name}</h3>
                      <p className="text-sm text-gray-600">
                        {teaching.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSubjectRemove(teaching.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      {/* Schedule Dialog */}
      <ScheduleDialog />

      {/* Subject Dialog */}
      <SubjectDialog
        isOpen={isSubjectDialogOpen}
        onOpenChange={setSubjectDialogOpen}
        subjects={searchedSubjects}
        teachingSubjects={teachingSubjects}
        onSubjectAdd={handleSubjectAdd}
        onSubjectRemove={handleSubjectRemove}
        userId={user?.id ?? ""}
      />
    </div>
  );
};

export default AuthGuard(TeacherProfile);
