import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { EnumPipe } from '../../pipes/enum.pipe';
import { SelectItem } from 'primeng/api';
import { BidStatus } from '../../models/bid-status';
import { finalize, switchMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { BidElement } from '../../models/bid-element';
import { Bid } from '../../models/bid';
import { BidService } from '../../services/bid.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-bid-detail',
    templateUrl: './bid-detail.component.html',
    styleUrls: ['./bid-detail.component.scss']
})
export class BidDetailComponent extends BaseComponent implements OnInit {

    constructor(
        private configService: ConfigService,
        private bidService: BidService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
        super();
    }

    bid: Bid = {} as Bid;
    bidStatuseCol: SelectItem[];

    cols = [
        { field: 'id', header: 'Element Id' },
        { field: 'powerKw', header: 'PowerKw' },
        { field: 'startTimeUtc', header: 'Start' },
        { field: 'endTimeUtc', header: 'End' }
    ];


    ngOnInit() {
        this.activatedRoute.paramMap
            .subscribe(
            (params: ParamMap) => {
                //debugger;
                let id = params.get('id');
                if (id)
                    this.loadBid(params.get('id'));
            },
            error => this.handleError(error)
        );
    }

    private loadBid(id: string) {
        this.loading = true;
        this.bidService.get(id)
            .pipe(finalize(() => this.loading = false))
            .subscribe(
                data =>
                {
                    //debugger;
                    this.bid = data;
                },
                error => this.handleError(error)
            );

        (new EnumPipe()).transform(BidStatus).subscribe(data => {
                //debugger;
                this.bidStatuseCol = data.map((v, i) =>
                    ({value: v, label: v} as SelectItem)) as SelectItem[];
            }
        );
    }

    private save()
    {
        if (!this.bid || !this.bid.id) return;

        this.loading = true;
        this.bidService.post(this.bid)
            .pipe(finalize(() => this.loading = false))
            .subscribe(
                httpResponse =>
                {
                    //debugger;
                    if ((httpResponse as HttpResponse<any>).ok == true)
                        console.log("Bid post HttpResponse == OK");
                        //console.log(this.bid);
                    else
                        console.error("Bid post HttpResponse != OK");
                },
                error => this.handleError(error)
            );
    }

}
