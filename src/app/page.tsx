"use client"

import AuthGuard from "@/components/AuthGuard";
import MeetingCard from "@/components/MeetingCard";
import SubjectCard from "@/components/SubjectCard";
import UserCard from "@/components/UserCard";
import { useAuthStore } from "@/store/auth/auth.store";
import { useMeetingStore } from "@/store/meetings/meetings.store";
import { useSubjectStore } from "@/store/subject/subject";
import { useEffect } from "react";

function Home() {

    const meetings = useMeetingStore(state => state.meetings);
    const getMeetings = useMeetingStore(state => state.getMeetings);

    const teachers = useAuthStore(state => state.teachers);
    const getTeachers = useAuthStore(state => state.getTeachers);
    const getUserByToken = useAuthStore(state => state.getUserByToken);

    const getSubjects = useSubjectStore(state => state.getSubjects);
    const subjects = useSubjectStore(state => state.subjects);

    useEffect(() => {
        getUserByToken()     
        getTeachers();
        getSubjects();
    }, [])

  return (
    <div className="mt-16 ml-10">
      <h2 className="font-bold text-5xl text-center w-8/12 my-5">Reserve A Tutoring Session With Us!</h2>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
        {meetings && meetings.map(meeting => (
            <MeetingCard key={meeting.id} props={meeting} />
        ))}
      </div>     

      { teachers!.length > 0 ? (
        <h2 className="font-bold text-xl my-5">Teachers</h2>
      ) : (
        <h2 className="font-bold text-xl my-5">Server is trying to fetch the data for teachers</h2>
      )}

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
        {teachers && teachers.length > 0 && teachers.map(teacher => (
            <UserCard key={teacher.id} user={teacher} />
        ))}
      </div>


      { subjects!.length > 0 ? (
        <h2 className="font-bold text-xl my-5">Subjects</h2>
      ) : (
        <h2 className="font-bold text-xl my-5">Server is trying to fetch the data for subjects</h2>
      )}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mx-auto">
        {subjects && subjects.length > 0 && subjects.map(subject => (
            <SubjectCard key={subject.id} subject={subject} />
        ))}  
      </div>
    </div>
  );
}

export default AuthGuard(Home);
