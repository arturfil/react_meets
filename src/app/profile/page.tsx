"use client"

import AuthGuard from '@/components/AuthGuard';
import React from 'react'

function Profile() {
  return (
    <div className="mt-16 ml-10">
      <h2 className="font-bold text-4xl text-center my-5">
        Profile Page      
      </h2>
    </div>
  )
}

export default AuthGuard(Profile);
