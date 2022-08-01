export interface ImpossibleLevel {
    $key: string, //This is the access ID of the collection stuff
    name: string,
    fps: number,
    level_id: string,
    gd_version: string,
    yt_videoID: string,
    creators_short: string,
    creators_full: string[],
    playtesters_short: string,
    tags: string[],
    uploader: string,
    wr_min_percent: string,
    wr: string,
    wr_yt: string,
    marked_for_removal: boolean,
    annotated: boolean
}
