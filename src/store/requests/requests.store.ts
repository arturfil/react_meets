import { toast } from 'react-toastify';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Request } from '@/interfaces/Request';

interface RequestsState {
  requests: Request[] | null;
  request: Request | null;

  getAllRequests: () => Promise<void>;
  getRequestById: (id: string) => Promise<void>;
  createRequest: (request: Request) => Promise<void>;
  updateRequest: (request: Request) => Promise<void>;
}

const storeApi: StateCreator<RequestsState> = (set) => ({
  requests: null,
  request: null,

  getAllRequests: async () => {
    try {
      const requests = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/requests'
      ).then((res) => res.json());
      console.log(requests);
      set({ requests });
    } catch (error) {
      console.log(error);
    }
  },

  getRequestById: async (id: string) => {
    try {
      const response: any = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/requests/' + id
      ).then((res) => res.json());
      console.log('req payload', response);
      if (response.error) return;
      set({ request: response });
    } catch (error) {
      console.log(error);
    }
  },

  createRequest: async (request: Request) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + '/requests/create', {
        method: 'POST',
        body: JSON.stringify(request),
      });
      toast.success('successfully created a request');
    } catch (error) {
      console.log(error);
    }
  },

  updateRequest: async (request: Request) => {
    try {
      let token = JSON.parse(localStorage.getItem('meetings_tk')!);
      await fetch(process.env.NEXT_PUBLIC_API_URL + '/request/update', {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      set((state) => ({
        requests: state.requests!.map((req) =>
          req.id === request.id ? { ...req, status: request.status } : req
        ),
      }));
      toast.success('updated request');
    } catch (error) {}
  },
});

export const useRequestStore = create<RequestsState>()(
  devtools(storeApi, { name: 'requests-store' })
);
