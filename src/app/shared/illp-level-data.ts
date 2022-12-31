export interface IllpLevelData {
    $key:string; //database doc key
    name:string; //level name
    position:number; //position on hlbl
    ill_position:number; //position on the ILL
    fps:number; //fps required for the hlbl position

    ill_points:number; //how much points beating this level gives

    video_url:string; //url for the vid that showcases this level
    tips?:string[]; //tips for the level (optional)
}
