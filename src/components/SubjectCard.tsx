import { Subject } from '@/interfaces/Subject'
import React from 'react'

interface Props {
    subject: Subject
}

export default function SubjectCard({subject}: Props) {
  return (
    <div className="flex w-60 h-40 p-2 bg-gray-100 rounded-xl shadow-md hover:shadow-lg">
      <div className="flex flex-col align-middle justify-center mx-auto">
        <h2 className="font-bold text-center text-lg">
          {subject.name }
        </h2>
        <p className="text-sm overflow-clip overflow-ellipsis text-wrap text-gray-600">
          {subject.description} 
        </p>
      </div>
    </div> 
  )
}

