"use client";

import AuthGuard from "@/components/AuthGuard";
import Hero from "@/components/Hero";
import MeetingCard from "@/components/MeetingCard";
import SearchComponent from "@/components/SearchComponent";
import SubjectCard from "@/components/SubjectCard";
import UserCard from "@/components/UserCard";
import { useAuthStore } from "@/store/auth/auth.store";
import { useMeetingStore } from "@/store/meetings/meetings.store";
import { useSubjectStore } from "@/store/subject/subject";
import Link from "next/link";
import { useEffect } from "react";

function Home() {
  const meetings = useMeetingStore((state) => state.meetings);
  const getMeetings = useMeetingStore((state) => state.getMeetings);

  const teachers = useAuthStore((state) => state.teachers);
  const getTeachers = useAuthStore((state) => state.getTeachers);
  const getUserByToken = useAuthStore((state) => state.getUserByToken);

  const getSubjects = useSubjectStore((state) => state.getSubjects);
  const subjects = useSubjectStore((state) => state.subjects);

  useEffect(() => {
    getUserByToken();
    getTeachers();
    getSubjects();
  }, [getSubjects, getTeachers, getUserByToken]);

  return (
    <div className="p-10 m-auto">

      <Hero/>
      <SearchComponent/>
      <h2 className="font-bold text-4xl text-center mt-20">
        Reserve A Tutoring Session With Us!
      </h2>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
        {meetings &&
          meetings.map((meeting) => (
            <MeetingCard key={meeting.id} props={meeting} />
          ))}
      </div>

      {teachers && teachers!.length > 0 ? (
        <h2 className="font-bold text-xl my-5">Teachers</h2>
      ) : (
        <h2 className="font-bold text-xl my-5">
          Server is trying to fetch the data for teachers
        </h2>
      )}

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
        {teachers &&
          teachers.length > 0 &&
          teachers.map((teacher) => (
            <UserCard key={teacher.id} user={teacher} />
          ))}
      </div>

      {subjects && subjects!.length > 0 ? (
        <h2 className="font-bold text-xl my-5">Subjects</h2>
      ) : (
        <h2 className="font-bold text-xl my-5">
          Server is trying to fetch the data for subjects
        </h2>
      )}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mx-auto">
        {subjects &&
          subjects.length > 0 &&
          subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
      </div>


      <div className="
        grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mx-auto
      ">
        <Link
          href="/meetings/createmeeting"
          className="
            w-60 bg-gradient-to-r my-10 from-green-400 to-emerald-500 text-white
            rounded-xl p-3 text-center hover:bg-green-600 focus:outline-none
          ">
          Reserve Now!
        </Link>
      </div>

    </div>
  );
}

export default Home
