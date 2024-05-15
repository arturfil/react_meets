import { Meeting, MeetingResponse } from '@/interfaces/Meeting'
import React from 'react'

interface Props {
    props: MeetingResponse
}

export default function Card({props}: Props) {
  return (
    <div className="w-60 p-2 bg-gray-100 rounded-xl shadow-md hover:shadow-lg">
        <h2 className="font-bold text-lg">
            Review: {props.subject}
        </h2>
        <p className="text-sm text-gray-600">
            Teacher: {props.teacher}
        </p>
        <p className="text-sm text-gray-600">
            Student: {props.student}
        </p>
        <p className="text-sm text-gray-600">
            Starts at: {props.start_time.split("T")[0]} - {props.start_time.split("T")[1]}
        </p>
        <p className="text-sm mb-2 text-gray-600">
            Ends at: {props.end_time.split("T")[0]}
        </p>
        <a role="button" 
            href={`/meetings/${props.id}`} 
            className="text-white text-sm bg-orange-600 px-3 py-1 rounded-lg"
        >
           Meeting Details 
        </a>
    </div> 
  )
}
