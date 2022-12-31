export interface WrSubmission {
    $key: string;
    progress: string; //progress of the WR submission (eg: 25%, 5-67%, 78-100)
    level: string; //the level that the WR is submitted for
    status: string; //status of the WR submission (sent, under review, approved, rejected)
    submitted_by: string; //user/author who submitted the WR (as uid)
    submitted_at: number; //date when the WR was submitted as epoch

    isFromZero:boolean;

    video_url: string; //video of the completion/WR
    raw_footage_url?: string; //raw footage of the completion/WR

    reject_reason?: string; //reason why the WR submission was rejected
}
