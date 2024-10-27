'use client';

import React from 'react';

export default function Teachings() {
  return (
    <div className="container mt-20">
      <h2>Search your teachings</h2>
      <form onSubmit={() => console.log('test')}>
        <input
          className="w-full rounded-xl border p-2 focus:border-blue-500 focus:outline-none"
          type="text"
          placeholder="Search for a subject here"
        />
      </form>
    </div>
  );
}
