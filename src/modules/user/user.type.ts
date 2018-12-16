
export enum UseRoles {
    user = <any>'User',
    admin = <any>"Admin"
}

export interface UserDocument {
    _id?: string;
    email: string;
    password: string;
    salt?: string;
    roles?: UseRoles;
    verifyUserToken?: string;
    verified?: boolean;
    active?: boolean;
    verificationToken?: string;
    created?: Date;
    updated?: Date;
}