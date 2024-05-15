export interface User {
    id?: string;
    first_name: string;
    last_name: string;
    is_admin?: boolean;
    email: string;
    password: string;
    roles?: string[]
}
