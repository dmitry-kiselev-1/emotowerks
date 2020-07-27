import { BidStatus } from './bid-status';
import { BidElement } from './bid-element';

export interface Bid {
    id: string; // Guid;
    //MonetizationChannel MonetizationChannel { get; set; }
    energyGroup: string;
    status: BidStatus;          // changeable
    bidStartTimeUtc: Date;      // bid editable if BidStartTimeUtc > now
    bidEndTimeUtc: Date;
    drEventId: string; // Guid?
    elements: BidElement[];
    Price: number;              // changeable
    market:string;              // RTM, DAM, _marketsDataService.GetMarketById(i.MonetizationChannelId)
}
/*
    Guid Id { get; set; }
    MonetizationChannel MonetizationChannel { get; set; }
    string EnergyGroupId { get; set; }
    BidStatuses Status { get; set; } // changeable
    DateTime BidStartTimeUtc { get; set; }
    DateTime BidEndTimeUtc { get; set; }
    Guid? DrEventId { get; set; } // Guid?
    List<BidElement> Elements { get; set; }
*/
