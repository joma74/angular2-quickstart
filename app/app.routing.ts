import {ModuleWithProviders} from "@angular/core";
import {Route, RouterModule} from "@angular/router";

import {HeroesComponent} from "./heroes.component";
import {DashboardComponent} from "./dashboard.component";

const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'heroes',
        component: HeroesComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
