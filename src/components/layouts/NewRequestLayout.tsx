import React, { useState } from 'react';
import { Input } from '../ui/input';

export default function NewRequestLayout() {
  const requests = ['course', 'category', 'subject'];
  const [requestType, setRequestType] = useState('');

  return (
    <div className='ml-10 mt-16'>
      <h2 className='my-4 text-3xl font-bold'>Create a new request</h2>
      <select
        onChange={(e) => setRequestType(e.target.value)}
        className='rounded-md border-2 border-gray-300 p-2 px-10 dark:bg-[#191c21]'
        defaultValue='default'
        name=''
        id=''
      >
        <option disabled value='default'>
          Type of request
        </option>
        {requests.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <form className='w-10/12' action='submitCourse'>
        <div className='mb-4'>
          <label htmlFor='course_name'>Course Name</label>
          <Input placeholder='Course Name' />
        </div>
        <label htmlFor='course_name'>Category</label>
        <Input placeholder='Course Name' />
      </form>
    </div>
  );
}
