"use client";

import AuthGuard from "@/components/AuthGuard";
import { useRequestStore } from "@/store/requests/requests.store";
import RequestCard from "@/components/RequestCard";
import React, { useEffect } from "react";

 function Requests() {
  const requests = useRequestStore((state) => state.requests);
  const getAllRequests = useRequestStore((state) => state.getAllRequests);

  useEffect(() => {
    getAllRequests();
  }, []);

  return (
    <div className="mt-16 ml-10">
      <h2 className="font-bold text-5xl my-5">Teacher Requests</h2>
      {requests ? (
          <RequestsTable props={requests}/>
      ) : (
        <h2 className="font-bold text-xl my-5">Server Trying to reach requests</h2>
      )}
    </div>
  );
}


interface TableProps {
    requests: Object 
}

export function RequestsTable({requests}: Props) {
  return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
               ID 
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {requests &&
              requests.length > 0 &&
              requests.map((r) => (
                <RequestCard key={r.id} fullname={`${r.first_name} ${r.last_name}`} user_id={r.id} status={r.status} />
              ))}
          </tbody>
        </table>
      </div>
  )
}

export default AuthGuard(Requests);
