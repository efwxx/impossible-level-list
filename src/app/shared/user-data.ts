export interface Roles {
    reader?: boolean;
    admin?: boolean;
}

export interface UserData {
    //Base info that is required
    uid?: string;
    email: string;
    roles: Roles;
    username?: string;

    //Profile info that is optional
    gd_username?: string; //used to display pfps inside of the levels themselves
    description?: string;
    profilePicture?: string; //url to a pfp. Limited to 1mb
    badges?: string[]; //basically roles like list mod, list helper, botter and etc.

    //sloomy
    sloomish_points?:number;
    people_find_sloomish?:string[];
    people_find_not_sloomish?:string[];

    //ILLP related things
    ill_points?: number;
    bottedLevels_name?: string[];
    bottedLevels_creator?: string[];
    completed_bundles_name?: string[];

    //Creator related stuff
    verified?: boolean;
    builder_points?: number;
    created_levels?: number;

    //bans and such
    show_in_leaderboards?: boolean;
    banned_from_leaderboards?: boolean;
    banned_from_wrs?:boolean;
}
