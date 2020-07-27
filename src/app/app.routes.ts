import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './components/under-construction/dashboard.component';
import { BidListComponent } from './components/bid-list/bid-list.component';
import { BidDetailComponent } from './components/bid-detail/bid-detail.component';
import { BidProposalComponent } from './components/under-construction/bid-proposal.component';
import { BaselineChartComponent } from './components/under-construction/baseline-chart.component';
import { PriceChartComponent } from './components/under-construction/price-chart.component';

export const routes: Routes = [
    { path: '', redirectTo: '/BidList', pathMatch: 'full' },
    { path: 'Dashboard', component: DashboardComponent },
    { path: 'BidList', component: BidListComponent },
    { path: 'BidDetail', children: [
        { path: '', component: BidDetailComponent },
        { path: ':id', component: BidDetailComponent },
    ]},
    { path: 'BidProposal', component: BidProposalComponent },
    { path: 'BaselineChart', component: BaselineChartComponent },
    { path: 'PriceChart', component: PriceChartComponent },
    { path: '**', component: DashboardComponent }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
