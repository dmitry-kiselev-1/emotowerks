import { Bid } from './bid';
import { BidStatus } from './bid-status';

export interface BidElement {
    id: string; // Guid;
    startTimeUtc: Date;
    endTimeUtc: Date;
    powerKw: number;        // changeable
}
/*
    DateTime StartTimeUtc { get; set; }
    DateTime EndTimeUtc { get; set; }
    decimal PowerKw { get; set; }
 */
