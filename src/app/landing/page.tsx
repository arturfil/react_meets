'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import RadioSearchGroup from '@/components/RadioSearchGroup';
import SearchComponent from '@/components/SearchComponent';
import SubjectTile from '@/components/SubjectTile';
import UserCard from '@/components/cards/UserCard';
import { useAuthStore } from '@/store/auth/auth.store';
import { useSubjectStore } from '@/store/subject/subject.store';

type SearchOption = 'Teacher' | 'Subject';

function LandingPage() {
  const teachers = useAuthStore((state) => state.teachers);
  const getTeachers = useAuthStore((state) => state.getTeachers);
  const getUserByToken = useAuthStore((state) => state.getUserByToken);

  const getSubjects = useSubjectStore((state) => state.getSubjects);
  const subjects = useSubjectStore((state) => state.subjects);

  const [searchTeacherTerm, setSearchTeacherTerm] = useState('');
  const [searchSubjectTerm, setSearchSubjectTerm] = useState('');
  const [searchOption, setSearchOption] = useState<SearchOption>('Teacher');

  useEffect(() => {
    getUserByToken();
    getTeachers();
    getSubjects();
  }, [getSubjects, getTeachers, getUserByToken]);

  return (
    <div className='m-auto mb-10 p-10'>
      <Hero />
      <SearchComponent
        term={
          searchOption === 'Teacher' ? searchTeacherTerm : searchSubjectTerm
        }
        setSearchTeacherTerm={
          searchOption === 'Teacher'
            ? setSearchTeacherTerm
            : setSearchSubjectTerm
        }
      />
      <RadioSearchGroup
        searchOption={searchOption}
        setSearchOption={setSearchOption}
      />

      <div className='mx-auto mt-20 xl:w-8/12'>
        {teachers && teachers!.length > 0 ? (
          <h2 className='my-5 flex justify-center text-xl font-bold'>Tutors</h2>
        ) : (
          <h2 className='my-5 text-xl font-bold'>
            Server is trying to fetch the data for teachers
          </h2>
        )}

        <div className='grid place-items-center gap-10 sm:grid-cols-1 lg:grid-cols-1'>
          {teachers &&
            teachers.length > 0 &&
            teachers
              .filter((teacher) =>
                searchTeacherTerm
                  ? teacher.first_name.toLowerCase().includes(searchTeacherTerm)
                  : teacher,
              )
              .map((teacher) => <UserCard key={teacher.id} user={teacher} />)}
        </div>

        {subjects && subjects!.length > 0 ? (
          <h2 className='mx-auto my-5 mt-20 flex justify-center text-xl font-bold'>
            Subjects
          </h2>
        ) : (
          <h2 className='my-5 text-xl font-bold'>
            Server is trying to fetch the data for subjects
          </h2>
        )}

        <div className='mx-auto grid place-items-center gap-10 dark:text-gray-300 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
          {subjects &&
            subjects.length > 0 &&
            subjects
              .filter((subject) =>
                searchSubjectTerm
                  ? subject.name.toLowerCase().includes(searchSubjectTerm)
                  : subject,
              )
              .map((subject) => (
                <SubjectTile key={subject.id} subject={subject} />
              ))}
        </div>

        <div className='mx-auto grid place-items-center gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          <Link
            href='/meetings/createmeeting'
            className='my-10 w-60 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 p-2 text-center text-white hover:bg-green-600 focus:outline-none'
          >
            Reserve Now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
