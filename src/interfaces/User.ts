export interface User {
    id?: string;
    first_name: string;
    last_name: string;
    is_admin?: boolean;
    email: string;
    password: string;
    roles?: string[]
}

export interface RegisterUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}
