"use client";

import Hero from "@/components/Hero";
import RadioSearchGroup from "@/components/RadioSearchGroup";
import SearchComponent from "@/components/SearchComponent";
import SubjectCard from "@/components/SubjectCard";
import UserCard from "@/components/UserCard";
import { useAuthStore } from "@/store/auth/auth.store";
import { useSubjectStore } from "@/store/subject/subject.store";
import Link from "next/link";
import { useEffect, useState } from "react";

type SearchOption =  "Teacher" | "Subject";

function Home() {

  const teachers = useAuthStore((state) => state.teachers);
  const getTeachers = useAuthStore((state) => state.getTeachers);
  const getUserByToken = useAuthStore((state) => state.getUserByToken);

  const getSubjects = useSubjectStore((state) => state.getSubjects);
  const subjects = useSubjectStore((state) => state.subjects);

  const [searchTeacherTerm, setSearchTeacherTerm] = useState("");
  const [searchSubjectTerm, setSearchSubjectTerm] = useState("");
  const [searchOption, setSearchOption] = useState<SearchOption>("Teacher");

  useEffect(() => {
    getUserByToken();
    getTeachers();
    getSubjects();
  }, [getSubjects, getTeachers, getUserByToken]);

  return (
    <div className="p-10 m-auto mb-10">

      <Hero/>
      <SearchComponent 
        term={searchOption === "Teacher" ? searchTeacherTerm : searchSubjectTerm } 
        setSearchTeacherTerm={searchOption === "Teacher" ? setSearchTeacherTerm : setSearchSubjectTerm}
      />
      <RadioSearchGroup searchOption={searchOption} setSearchOption={setSearchOption}/>


      <div className="mx-auto mt-20 xl:w-8/12">

          {teachers && teachers!.length > 0 ? (
            <h2 className="justify-center flex font-bold text-xl my-5">Tutors</h2>
          ) : (
            <h2 className="font-bold text-xl my-5">
              Server is trying to fetch the data for teachers
            </h2>
          )}

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10 place-items-center">
            {teachers &&
              teachers.length > 0 &&
              teachers.filter(teacher => searchTeacherTerm ? teacher.first_name.toLowerCase().includes(searchTeacherTerm) : teacher).map((teacher) => (
                <UserCard key={teacher.id} user={teacher} />
              ))}
          </div>

          {subjects && subjects!.length > 0 ? (
            <h2 className="mt-20 justify-center flex font-bold text-xl my-5 mx-auto">Subjects</h2>
          ) : (
            <h2 className="font-bold text-xl my-5">
              Server is trying to fetch the data for subjects
            </h2>
          )}

          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-10 mx-auto place-items-center">
            {subjects &&
              subjects.length > 0 &&
              subjects.filter(subject => searchSubjectTerm ? subject.name.toLowerCase().includes(searchSubjectTerm) : subject).map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
          </div>


          <div className="
            grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mx-auto place-items-center
          ">
            <Link
              href="/meetings/createmeeting"
              className="
                w-60 bg-gradient-to-r my-10 from-green-400 to-emerald-500 text-white
                rounded-xl p-2 text-center hover:bg-green-600 focus:outline-none
              ">
              Reserve Now!
            </Link>
          </div>
      </div>




    </div>
  );
}

export default Home
