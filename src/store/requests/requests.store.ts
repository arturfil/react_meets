import { Request } from "@/interfaces/Request";
import { toast } from "react-toastify";
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

interface RequestsState {
  requests: Request[] | null;
  request: Request | null;

  createRequest: (request: Request) => Promise<void>;
}

const storeApi: StateCreator<RequestsState> = (set) => ({
  requests: null,

  createRequest: async (request: Request) => {
    try {
      await fetch("http://localhost:8080/api/v1/requests/create", {
        method: "POST",
        body: JSON.stringify(request),
      });
      toast.success("successfully created a request");
    } catch (error) {
      console.log(error);
    }
  },
});

export const useRequestStore = create<RequestsState>()(
    devtools(storeApi, {name: "requests-store"}),
)
