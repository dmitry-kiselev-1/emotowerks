import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutes } from './app.routes';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, InMemoryBackendConfigArgs } from 'angular-in-memory-web-api';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/layout/top-bar/top-bar.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';

import { DashboardComponent } from './components/under-construction/dashboard.component';
import { BidListComponent } from './components/bid-list/bid-list.component';
import { BidDetailComponent } from './components/bid-detail/bid-detail.component';
import { BidProposalComponent } from './components/under-construction/bid-proposal.component';
import { BaselineChartComponent } from './components/under-construction/baseline-chart.component';
import { PriceChartComponent } from './components/under-construction/price-chart.component';

import { PrimeNgModule } from './primeng.module';
import { EnumPipe } from './pipes/enum.pipe';
import { BoolPipe } from './pipes/bool.pipe';

import { NotificationService } from './services/notification.service';
import { ConfigService } from './services/config.service';
import { DateService } from './services/date.service';

import { environment } from '../environments/environment';
import { InMemoryDataService } from './services/in-memory-data.service';

import { BidService } from './services/bid.service';

@NgModule({
    declarations: [
        EnumPipe,
        BoolPipe,
        AppComponent,
        TopBarComponent,
        SideBarComponent,
        DashboardComponent,
        BidListComponent,
        BidDetailComponent,
        BidProposalComponent,
        BaselineChartComponent,
        PriceChartComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,

        HttpClientModule,
        environment.production ?
            [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
                delay: 500, passThruUnknownUrl: true, apiBase: 'api/', caseSensitiveSearch: false
            } as InMemoryBackendConfigArgs),

        BrowserAnimationsModule,
        PrimeNgModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ConfigService, NotificationService, DateService, BidService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
