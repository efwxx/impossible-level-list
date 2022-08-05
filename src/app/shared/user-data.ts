export interface Roles {
    reader?: boolean;
    admin?: boolean;
}

export interface UserData {
    uid?: string;
    email: string;
    roles: Roles;
    displayName?: string;
}
