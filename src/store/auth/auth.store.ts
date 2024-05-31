import { ErrorLoginResponse } from "@/interfaces/Error";
import { RegisterUser, User } from "@/interfaces/User";
import { toast } from "react-toastify";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

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
  getUserById: (id: string) => Promise<void>;
  getUserByToken: () => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,
  teachers: [],
  error: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      let data = await fetch("http://localhost:8080/api/v1/login", {
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
    } catch (error) {
      console.log(error);
    }
  },

  signUpUser: async (user: RegisterUser) => {
    let response = await fetch("http://localhost:8080/api/v1/signup", {
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
      let data = await fetch("http://localhost:8080/api/v1/teachers").then(
        (res) => res.json(),
      );
      set({ teachers: data });
    } catch (error) {
      console.log(error);
    }
  },

  getUserById: async (id: string) => {
    try {
      let user = await fetch(`http://locahost:8080/api/v1/users/${id}`);
    } catch (error) {}
  },

  getUserByToken: async () => {
    let token: string = JSON.parse(localStorage.getItem("meetings_tk")!)!;
    try {
      let user: any = await fetch(`http://localhost:8080/api/v1/users/bytoken`, {
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
