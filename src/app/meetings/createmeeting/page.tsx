"use client";

import AuthGuard from "@/components/AuthGuard";
import { Calendar } from "@/components/ui/calendar";
import { useAuthStore } from "@/store/auth/auth.store";
import { useMeetingStore } from "@/store/meetings/meetings.store";
import { useSubjectStore } from "@/store/subject/subject.store";
import React from "react";
import { useEffect, useState, MouseEvent } from "react";

const startTime = 8;
const endTime = 20;

const times:string[] = [];

for (let i = startTime; i <= 9; i++) {
    times.push(i + ":00 AM");
}

for (let i = 10; i <= 11; i++) {
    times.push(i + ":00 AM");
}

for (let i = 12; i <= endTime; i++) {
    times.push(i + ":00 PM");
}


function CreateMeetingPage() {

  const getTeachers = useAuthStore((state) => state.getTeachers);
  const user = useAuthStore((state) => state.user);
  const getUser = useAuthStore((state) => state.getUserByToken);
  const teachers = useAuthStore((state) => state.teachers);

  const getSubjects = useSubjectStore((state) => state.getSubjects);
  const subjects = useSubjectStore((state) => state.subjects);

  const createMeeting = useMeetingStore((state) => state.createMeeting);

  const [selection, setSelection] = useState({
    subject: "",
    teacher: "",
    start_time: "",
    end_time: "",
  });

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState("");

  useEffect(() => {
    getTeachers();
    getSubjects();
    getUser();
  }, [getSubjects, getTeachers, getUser]);

  if (subjects?.length == 0 || teachers?.length == 0) {
    return (
      <h2 className="font-bold text-xl my-5">
        Server cannot get teachers or subjects at this time, please try again
        later
      </h2>
    );
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let payload = {
      student_id: user?.id!,
      subject_id: selection.subject,
      teacher_id: selection.teacher,
      start_time: `${selection.start_time}:00.000Z`,
      end_time: `${selection.end_time}:00.000Z`,
    };
    createMeeting(payload);
    console.log(payload.end_time);
  };

  return (
    <div className="mt-16 m-auto border-gray-800 h-full mb-10"> 
      <h2 className="text-3xl font-bold sm:text-4xl px-2">
        Book Your <span className="text-primary">Meeting</span>!
      </h2>

      <div
        className="
           grid lg:grid-cols-2
           sm:grid-cols-1 md:grid-cols-2
           m-auto bg-white my-10 gap-6
        "
      >
        <div className="border-gray-800 grid-cols-1 justify-center w-[310px] flex flex-col mx-auto">
          <h2 className="font-bold">Choose a Subject</h2>

          <select
            onChange={(e) =>
              setSelection({ ...selection, subject: e.target.value })
            }
            defaultValue={"default"}
            className="border-gray-300 border-2 rounded-md bg-white p-2 px-10"
            name=""
            id=""
          >
            <option disabled value="default">
              Choose a Subject
            </option>
            {subjects &&
              subjects.length > 0 &&
              subjects.map((s) => (
                <option className="text-align mx-auto" key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>

        <div className="border-gray-800 grid-cols-1 justify-center w-[310px] flex flex-col mx-auto">
          <h2 className="font-bold">Select a Teacher</h2>
          <select
            onChange={(e) =>
              setSelection({ ...selection, teacher: e.target.value })
            }
            defaultValue="default"
            className="border-gray-300 border-2 rounded-md bg-white p-2 px-10"
            name=""
            id=""
          >
            <option disabled value="default">
              Choose a Teacher
            </option>
            {teachers &&
              teachers.length > 0 &&
              teachers.map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                >{`${t.first_name} ${t.last_name}`}</option>
              ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="border-gray-200 border-[1px] m-3 p-4 rounded-xl">
          <h2 className="p-1">Day</h2>
          <Calendar 
            mode="single"
            onSelect={setDate}
            selected={date}
          />
        </div>
        <div className="border-gray-200 border-[1px] m-3 p-4 rounded-xl">
          <h2 className="p-1">Time</h2>
          <div className="grid grid-cols-3 gap-3 rounded-lg p-3">
              {times.map(time => (
                <h2 
                  onClick={() => setTimeSlot(time)}
                  key={time}
                  className={` p-2 border rounded-full cursor-pointer
                    hover:bg-primary hover:text-white
                    ${time===timeSlot&&'bg-primary text-white'}`
                  }
                >
                    {time}
                </h2>
              ))} 
          </div>
        </div>
      </div>
      <div className="flex">
          <button
            onClick={handleSubmit}
            className="
                w-[96%] mx-auto bg-gradient-to-r 
                from-green-400 to-emerald-500 
                text-white p-1 rounded-lg 
                hover:bg-green-600 focus:outline-none"
          >
            Submit
          </button>
      </div>
    </div>
  );
}

export default AuthGuard(CreateMeetingPage);
