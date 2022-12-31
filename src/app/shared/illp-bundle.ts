import { IllpLevelData } from "./illp-level-data";

export interface IllpBundle {
    $key: string;
    name:string;

    is_progression:boolean; //whether the bundle is a part of the progression, or a side-bundle
    progression_position?:number //the position of the bundle in the progression (0 is beginning and n is last one)

    levels:IllpLevelData[]; //the levels of the bundle

    sloomish_points:number; //likes/dislikes which is likes - dislikes (similar to Reddit's upvotes/downvotes)
    liked_by: string[]; //uids of people that liked
    disliked_by: string[]; //uids of people that disliked

    completed_py: string[]; //uids of people who completed the bundle
}
