import {
  Meeting,
  MeetingResponse,
  MeetingSubmission,
} from "@/interfaces/Meeting";
import { toast } from "react-toastify";
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

interface MeetingsState {
  meetings: MeetingResponse[] | null;
  loading: boolean;
  singleMeeting: Meeting | null;

  getMeetings: () => Promise<void>;
  createMeeting: (selection: MeetingSubmission) => Promise<void>;
}

const storeApi: StateCreator<MeetingsState> = (set) => ({
  loading: false,
  meetings: null,
  singleMeeting: null,

  getMeetings: async () => {
    try {
      let token = JSON.parse(localStorage.getItem("meetings_tk")!);
          const meetings: any = await fetch( "http://localhost:8080/api/v1/meetings", {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      ).then((res) => res.json());

      set({ meetings });
    } catch (error) {
      console.log("Error", error);

      throw "Couldn't get the meetings";
    }
  },

  createMeeting: async (selection: MeetingSubmission) => {
    try {
      let token = JSON.parse(localStorage.getItem("meetings_tk")!);
      await fetch("http://localhost:8080/api/v1/meetings/create", {
        method: "POST",
        body: JSON.stringify(selection),
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Submited new meeting!");
    } catch (error) {}
  },
});

export const useMeetingStore = create<MeetingsState>()(
  devtools(storeApi, { name: "meeting-store" }),
);
