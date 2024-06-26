import { Subject } from "@/interfaces/Subject";
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

interface SubjectState {
    subjects: Subject[] | null;
    loading: boolean;

    getSubjects: () => Promise<void>; 
}

const storeApi: StateCreator<SubjectState> = (set) => ({
    subjects: [],
    loading: false,

    getSubjects: async () => {
        try {
            const subjects: any = await fetch(process.env.NEXT_PUBLIC_API_URL + "/subjects")
                .then(res => res.json())
            set({ subjects })
        } catch (error) {
           console.log("Error: ", error) 
        }
    }
});

export const useSubjectStore = create<SubjectState>()(
    devtools(storeApi, {name: "subject-store"})
)


