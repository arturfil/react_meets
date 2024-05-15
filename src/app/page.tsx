"use client"

import AuthGuard from "@/components/AuthGuard";
import Card from "@/components/Card";
import { useAuthStore } from "@/store/auth/auth.store";
import { useMeetingStore } from "@/store/meetings/meetings.store";
import { useEffect } from "react";

function Home() {
    const meetings = useMeetingStore(state => state.meetings);
    const getMeetings = useMeetingStore(state => state.getMeetings);
    const getUserByToken = useAuthStore(state => state.getUserByToken);

    useEffect(() => {
        getMeetings()
        getUserByToken()     
    }, [])


  return (
    <div className="mt-16 ml-10">
      <h2 className="font-bold text-xl my-5">Home Page</h2>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
        {meetings && meetings.map(meeting => (
            <Card key={meeting.id} props={meeting} />
        ))}
      </div>     
    </div>
  );
}

export default AuthGuard(Home);
