"use client";

import AuthGuard from "@/components/AuthGuard";
import { useAuthStore } from "@/store/auth/auth.store";
import { useMeetingStore } from "@/store/meetings/meetings.store";
import { useSubjectStore } from "@/store/subject/subject";
import { useEffect, useState, MouseEvent }  from "react";

function CreateMeetingPage() {
  const getTeachers = useAuthStore((state) => state.getTeachers);
  const user = useAuthStore((state) => state.user);
  const getUser = useAuthStore((state) => state.getUserByToken);
  const teachers = useAuthStore((state) => state.teachers);

  const getSubjects = useSubjectStore(state => state.getSubjects);
  const subjects = useSubjectStore(state => state.subjects);

  const createMeeting = useMeetingStore(state => state.createMeeting);

  const [selection, setSelection] = useState({
    subject: "",
    teacher: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    getTeachers();
    getSubjects();
    getUser();
  }, []);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    let payload = {
            student_id : user?.id!,
            subject_id : selection.subject,
            teacher_id : selection.teacher,
            start_time : `${selection.start_time}:00.000Z`,
            end_time   : `${selection.end_time}:00.000Z`,
        }
    createMeeting(payload)
    console.log(payload.end_time);
  }

  return (
    <div className="mt-16 ml-10">
      <h2 className="mb-10 flex-left text-[30px] font-bold">
        Reserve a Meeting
      </h2>

      <p>subject: {JSON.stringify(selection.subject)}</p>
      <p>teacher: {JSON.stringify(selection.teacher)}</p>
      <p>start_time: {JSON.stringify(selection.start_time)}</p>
      <p>end_time: {JSON.stringify(selection.end_time)}</p>

      <div className="grid lg:grid-cols-4 
       sm:grid-cols-2 gap-10 bg-gray-200 
       p-10 rounded-2xl"
      >
        <div className="border-gray-800 ">
          <h2 className="font-bold">Choose a Subject</h2>
        <select
            onChange={(e) =>
              setSelection({ ...selection, subject: e.target.value })
            }
            defaultValue={"default"}
            className="border-gray-300 border-2 rounded-md"
            name=""
            id=""
          >
            <option disabled value="default">Choose a Subject</option>
            {subjects && subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="font-bold">Select a Teacher</h2>
          <select
            onChange={(e) =>
              setSelection({ ...selection, teacher: e.target.value })
            }
            defaultValue="default"
            className="border-gray-300 border-2 rounded-md"
            name=""
            id=""
          >
            <option disabled value="default">Choose a Teacher</option>
            {teachers &&
              teachers.map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                >{`${t.first_name} ${t.last_name}`}</option>
              ))}
          </select>
        </div>

        <div>
          <h2 className="font-bold">Start Time</h2>
          <input
            onChange={e => setSelection({...selection, start_time: String(e.target.value)})}
            value={selection.start_time}
            className="border-gray-300 border-2 rounded-md"
            type="datetime-local"
          />
        </div>

        <div>
          <h2 className="font-bold">End Time</h2>
          <input
            onChange={e => setSelection({...selection, end_time: String(e.target.value)})}
            className="border-gray-300 border-2 rounded-md"
            type="datetime-local"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="
            w-full bg-gradient-to-r 
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
