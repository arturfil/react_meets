import { ErrorLoginResponse } from "@/interfaces/Error";
import { RegisterUser, User } from "@/interfaces/User";
import { toast } from "react-toastify";
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AuthState {
  status: string;
  token?: string | undefined;
  user?: User;
  teachers: User[];
  error: ErrorLoginResponse | undefined;

  loginUser: (email: string, password: string) => Promise<void>;
  signUpUser: (user: RegisterUser) => Promise<void>;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
  getTeachers: () => Promise<void>;
  getUserByToken: () => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set, get) => ({
  status: "pending",
  token: undefined,
  user: undefined,
  isAdmin: undefined,
  teachers: [],
  error: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      let data = await fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }).then((res) => res.json());

      console.log("data", data);
    
      if (data.error) {
            set({error: data});
            return; 
       }

      localStorage.setItem("meetings_tk", JSON.stringify(data.token));
      set({ token: data.token, status: "authenticated" });
      toast.success("Logged In!", { theme: "colored" });

      // getUserInfo()
      get().getUserByToken();

    } catch (error) {
      console.log(error);
    }
  },

  signUpUser: async (user: RegisterUser) => {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/signup", {
        method: "POST",
        body: JSON.stringify(user)
    }).then(res => res.json());

    console.log("response signup", response);
  },

  logoutUser: () => {
    toast.info("Loged Out!", { theme: "colored" });
    localStorage.removeItem("meetings_tk");
  },

  isLoggedIn: () => {
    if (typeof localStorage === "undefined") return false// if pre-rendered ?
    let token: string = JSON.parse(window.localStorage.getItem("meetings_tk")!);
    return token !== null;
  },

  getTeachers: async () => {
    try {

      let data = await fetch(process.env.NEXT_PUBLIC_API_URL+ "/teachers").then(
        (res) => res.json(),
      );
      set({ teachers: data });
    } catch (error) {
      console.log(error);
    }
  },

  getUserByToken: async () => {
    let token: string = JSON.parse(localStorage.getItem("meetings_tk")!)!;
    try {
      let user: any = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/bytoken', {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then(res => res.json());

      set({user: user})

    } catch (error) {
        console.log(error)
    }
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(storeApi, { name: "auth-store" }),
);
