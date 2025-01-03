import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRequestStore } from '@/store/requests/requests.store';

export default function TeacherRequest() {
  const request = useRequestStore((state) => state.request);

  return (
    <div className='flex flex-col'>
      <Image
        className='mx-auto mb-10 flex justify-center rounded-3xl'
        src='/tutor-image.jpg'
        width={600}
        height={400}
        alt='tutors'
      />

      <h2 className='mx-auto w-8/12 rounded-md bg-green-200 p-4 text-2xl font-bold'>
        If you want to teach courses first create a user account and then
        request your teacher account here.
      </h2>

      <br />

      <h2 className='mx-auto w-8/12 rounded-md bg-green-300 p-4 font-bold'>
        You already requeseted teacher access? Please wait till the verification
        process is completed or get in contact with support.
      </h2>

      {request ? (
        <h2 className='mt-5 flex justify-center text-lg font-bold'>
          Your request has been sent already!
        </h2>
      ) : (
        <Button asChild className='mx-auto mt-5 flex w-[200px] justify-center'>
          <Link href='/requests/new'>Request Access</Link>
        </Button>
      )}
    </div>
  );
}
