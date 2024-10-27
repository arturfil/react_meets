export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  is_admin?: boolean;
  roles?: string[];
  email: string;
  password: string;
}

export interface RegisterUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
