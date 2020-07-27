import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { Bid } from '../models/bid';

@Injectable()
export class BidService extends BaseService {

    private api = 'bids';

    constructor(private configService: ConfigService, private httpClient: HttpClient) {
        super();
    }

    getList(): Observable<Bid[]> {
        return this.httpClient.get<Bid[]>(
            `${this.apiDomain}${this.api}`,
            {
                headers: this.httpOptions.headers
            });
    }

    get(id: string): Observable<Bid> {
        return this.httpClient.get<Bid>(
            `${this.apiDomain}${this.api}/${id}`,
            {
                headers: this.httpOptions.headers
            });
    }

    post(entity: Bid): Observable<HttpResponse<any>> {
        return this.httpClient.post<Bid>(
            `${this.apiDomain}${this.api}/${entity.id}`,
            entity,
            {
                headers: this.httpOptions.headers,
                observe: 'response'
            });
    }
}
