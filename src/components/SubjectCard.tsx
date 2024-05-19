import { Subject } from '@/interfaces/Subject'
import React from 'react'

interface Props {
    subject: Subject
}

export default function SubjectCard({subject}: Props) {
  return (
    <div className="w-60 p-2 bg-gray-100 rounded-xl shadow-md hover:shadow-lg">
        <h2 className="font-bold text-lg">
          {subject.name }
        </h2>
        <p className="text-sm text-gray-600">
          {subject.description} 
        </p>
    </div> 
  )
}

