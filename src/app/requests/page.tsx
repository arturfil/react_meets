"use client";

import AuthGuard from "@/components/AuthGuard";
import { useRequestStore } from "@/store/requests/requests.store";
import RequestCard from "@/components/RequestCard";
import React, { useEffect } from "react";
import { Request } from "@/interfaces/Request";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MobileTableCard from "@/components/MobileTableCard";

function Requests() {
  const requests = useRequestStore((state) => state.requests);
  const getAllRequests = useRequestStore((state) => state.getAllRequests);

  useEffect(() => {
    getAllRequests();
  }, [getAllRequests]);

  return (
    <div className="mt-16 mb-10 h-full">
      <div className="flex">
        <h2 className="font-bold text-5xl text-center justify-center my-5">
          Teacher Requests
        </h2>
      </div>
      {requests ? (
        <RequestsTable requests={requests} />
      ) : (
        <h2 className="font-bold text-xl my-5">
          Server Trying to reach requests
        </h2>
      )}
    </div>
  );
}

interface TableProps {
  requests: Request[];
}

function RequestsTable({ requests }: TableProps) {
  return (
    <div className="">
      <Table className="max-sm:hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="">User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Approve</TableHead>
            <TableHead className="text-right">Deny</TableHead>
            <TableHead className="">Copy ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <RequestCard key={request.id} {...request} />
          ))}
        </TableBody>
      </Table>
      <div
        className="grid grid-cols-1 
                place-items-center sm:hidden 
                md:hidden lg:hidden xl:hidden 2xl:hidden
                w-full mx-auto justify-center
"
      >
        {requests.map((request) => (
          <MobileTableCard key={request.id} {...request} />
        ))}
      </div>
    </div>
  );
}

export default AuthGuard(Requests);
