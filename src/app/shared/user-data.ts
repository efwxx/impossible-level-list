export interface Roles {
    reader?: boolean;
    admin?: boolean;
}

export interface UserData {
    uid?: string;
    email: string;
    roles: Roles;
    username?: string;
    description?: string;
    creatorPoints?: number;
}
