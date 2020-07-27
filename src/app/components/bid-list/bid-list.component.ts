import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { BidService } from '../../services/bid.service';
import { ConfigService } from '../../services/config.service';
import { Bid } from '../../models/bid';
import { EnumPipe } from '../../pipes/enum.pipe';
import { SelectItem } from 'primeng/api';
import { BidStatus } from '../../models/bid-status';
import { EnergyGroup } from '../../models/energy-group';
import { Market } from '../../models/market';

@Component({
    selector: 'app-bid-list',
    templateUrl: './bid-list.component.html',
    styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent extends BaseComponent implements OnInit {

    constructor(
        private configService: ConfigService,
        private bidService: BidService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
        super();
    }

    bidList: Array<Bid> = [];
    selectedBid: Bid = {} as Bid;

    cols = [
        { field: 'id', header: 'Id' },
        { field: 'price', header: 'Price' },
        { field: 'bidStartTimeUtc', header: 'Start' },
        { field: 'bidEndTimeUtc', header: 'End' },
        { field: 'status', header: 'Status' },
        { field: 'market', header: 'Market' },
        { field: 'energyGroup', header: 'Energy Group' }
    ];

    bidStatuseCol: SelectItem[];
    energyGroupCol: SelectItem[];
    marketCol: SelectItem[];

    ngOnInit() {
        this.loadBidList();
    }

    private loadBidList() {
        this.loading = true;
        this.bidService.getList()
            .pipe(finalize(() => this.loading = false))
            .subscribe(
                data =>
                {
                    //debugger;
                    this.bidList = data;
                },
                error => this.handleError(error)
            );

        // BidStatus option list:
        (new EnumPipe()).transform(BidStatus).subscribe(data => {
                //debugger;
                this.bidStatuseCol = data.map((v, i) =>
                    ({value: v, label: v} as SelectItem)) as SelectItem[];
            }
        );

        // EnergyGroup option list:
        (new EnumPipe()).transform(EnergyGroup).subscribe(data => {
                //debugger;
                this.energyGroupCol = data.map((v, i) =>
                    ({value: v, label: v} as SelectItem)) as SelectItem[];
            }
        );

        // Market option list:
        (new EnumPipe()).transform(Market).subscribe(data => {
                //debugger;
                this.marketCol = data.map((v, i) =>
                    ({value: v, label: v} as SelectItem)) as SelectItem[];
            }
        );
    }

}
