/* tslint:disable */
import { InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { BidStatus } from '../models/bid-status';
import { EnumPipe } from '../pipes/enum.pipe';
import { Bid } from '../models/bid';
import { BidElement } from '../models/bid-element';
import { DateService } from './date.service';
import { map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';
import { Market } from '../models/market';

/*
  GET api/bids          // all heroes
  GET api/bids/42       // the hero with id=42
  GET api/bids??propertyName=^j  // 'j' is a regexPattern; returns heroes whose name starting with 'j' or 'J'
  GET api/bids.json/42  // ignores the ".json"
*/

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

    constructor(private dateService: DateService) {
    }

    parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
        const newUrl = url.replace('/bids', '/heroes');
        const parsed = utils.parseRequestUrl(newUrl);
        console.log(`parseRequestUrl override of '${url}':`, parsed);

        // const newUrl = url.replace(/\/foo\/heroes/, '/heroes');
        // console.log('newUrl', newUrl);
        // const parsed = utils.parseRequestUrl(newUrl);
        // console.log(`parseRequestUrl override of '${url}':`, parsed);
        // return parsed;

        return utils.parseRequestUrl(url);
    }

    createDb() {

        let bids = [];
        let bidElements = [];

        for (let i = 1; i < 100; i++) {
            let bidElements = []; //as BidElement;

            for (let q = 1; q < 10; q++) {
                bidElements.push(
                    {
                        id: `00000000-0000-0000-0000-00000000000${q}`,
                        startTimeUtc: `2018-12-0${this.randomBetween(1, 4)}T00:00:00`, //this.dateService.toDate(`2018-12-0${this.randomBetween(1, 4)}T00:00:00`),
                        endTimeUtc: `2018-12-0${this.randomBetween(4, 8) + 1}T00:00:00`, //this.dateService.toDate(`2018-12-0${this.randomBetween(4, 8) + 1}T00:00:00`),
                        powerKw: Number.parseFloat(`${q}000.1`)
                    } //as BidElement
                );
            }

            bids.push(
                {
                    id: `${i}0000000-0000-0000-0000-000000000000`,
                    energyGroup: `EnergyGroup_${this.randomBetween(1, 3)}`,
                    status: BidStatus[this.randomBetween(0, 6)],
                    bidStartTimeUtc: `2018-12-0${this.randomBetween(1, 4)}T00:00:00`, //this.dateService.toDate(`2018-12-0${this.randomBetween(1, 4)}T00:00:00`),
                    bidEndTimeUtc: `2018-12-0${this.randomBetween(4, 8) + 1}T00:00:00`, //this.dateService.toDate(`2018-12-0${this.randomBetween(4, 8) + 1}T00:00:00`),
                    drEventId: `drEventId ${i}`,
                    elements: bidElements,
                    price: Number.parseFloat(`${i}00.1`),
                    market: Market[this.randomBetween(0, 1)]
                } //as Bid
            );
        }

        return {bids};
    }

    // Id generator
    genId<T extends { id: any }>(collection: T[], collectionName: string): any {
        if (collectionName === '') {
            console.log('genId override for new guid');
            return this.guid();
        } else if (collection) {
            console.log(`genId override for '${collectionName}'`);
            return 1 + collection.reduce((prev, curr) => Math.max(prev, curr.id || 0), 1000);
        }
    }

    // Pseudo guid generator
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    randomBetween(min, max): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Переопределяет путь к api
     * либо mock-сервисы (если environment.production = false)
     * либо back-сервисы (если environment.production = true)
     */
    // _parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    //
    //     let newUrl: string = url;
    //
    //     if (this.dealMock && url.indexOf("/cashflow/api/items/?listInnerName=deals&filters") != -1 )
    //     {
    //         console.log(`запрос "Сделка"`);
    //         const parsedUrl = utils.parseRequestUrl(url);
    //         let filter0value = (parsedUrl as ParsedRequestUrl).query.get("filters[0].fieldValue")[0];
    //
    //         newUrl = `deal`;
    //         console.log(`Override URL: \n ${url} \nto URL: \n ${newUrl}/${filter0value}`);
    //         return {apiBase: "api/", collectionName: `${newUrl}` /*, id:`${filter0value}` */} as ParsedRequestUrl;
    //     }
    //
    //     if (this.dealsMock && url.indexOf("/cashflow/api/items/?listInnerName=deals") != -1 )
    //     {
    //         console.log(`запрос "Список сделок"`);
    //         newUrl = "deals";
    //         console.log(`Override URL: \n ${url} \nto URL: \n ${newUrl}`);
    //         return {apiBase: "api/", collectionName: `${newUrl}`} as ParsedRequestUrl;
    //     }
    //
    //     if (this.borrowersMock && url.indexOf("/cashflow/api/items/?listInnerName=clients&filters") != -1 )
    //     {
    //         console.log(`запрос "Заёмщик"`);
    //         const parsedUrl = utils.parseRequestUrl(url);
    //         let filter0value = (parsedUrl as ParsedRequestUrl).query.get("filters[0].fieldValue")[0];
    //
    //         newUrl = `borrowers`;
    //         console.log(`Override URL: \n ${url} \nto URL: \n ${newUrl}/${filter0value}`);
    //         return {apiBase: "api/", collectionName: `${newUrl}` /*, id:`${filter0value}` */} as ParsedRequestUrl;
    //     }
    //
    //     if (this.productsMock && url.indexOf("/cashflow/api/items/?listInnerName=deal_products") != -1 )
    //     {
    //         console.log(`запрос "Список продуктов"`);
    //         const parsedUrl = utils.parseRequestUrl(url);
    //         let filter0value = (parsedUrl as ParsedRequestUrl).query.get("filters[0].fieldValue")[0];
    //
    //         newUrl = "products";
    //         console.log(`Override URL: \n ${url} \nto URL: \n ${newUrl}/${filter0value}`);
    //         return {apiBase: "api/", collectionName: `${newUrl}` /*, id:`${filter0value}` */} as ParsedRequestUrl;
    //     }
    // }
}
