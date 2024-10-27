import React from 'react';

import { Meeting, MeetingResponse } from '@/interfaces/Meeting';

interface Props {
  props: MeetingResponse;
}

export default function MeetingCard({ props }: Props) {
  return (
    <div className="w-60 rounded-xl bg-gray-100 p-2 shadow-md hover:shadow-lg">
      <h2 className="text-lg font-bold">Review: {props.subject}</h2>
      <p className="text-sm text-gray-600">Teacher: {props.teacher}</p>
      <p className="text-sm text-gray-600">Student: {props.student}</p>
      <p className="text-sm text-gray-600">
        Starts at: {props.start_time.split('T')[0]} -{' '}
        {props.start_time.split('T')[1]}
      </p>
      <p className="mb-2 text-sm text-gray-600">
        Ends at: {props.end_time.split('T')[0]}
      </p>
      <a
        role="button"
        href={`/meetings/${props.id}`}
        className="rounded-lg bg-orange-600 px-3 py-1 text-sm text-white"
      >
        Meeting Details
      </a>
    </div>
  );
}
