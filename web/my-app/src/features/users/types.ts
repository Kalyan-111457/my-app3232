export interface UserRequestPayload {
    id?: number,
    email: string,
    password: string,
    fullname: string,
    phone: string,
    bio: string,
}


export interface UsersData {
    id: number;
    email: string;
    password: string;
    fullname: string;
    phone: string;
    bio: string;
    resumeurl?: string | null;
    createdAt: Date;

}