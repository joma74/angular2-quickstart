import {Injectable} from "@angular/core";
import {Hero} from "./hero";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class HeroService {

    constructor(private http: Http) {
    }

    private heroesUrl = 'app/heroes';  // URL to web api

    getHero(id: number): Promise<Hero> {

        return this.getHeroes()
            .then(heroes => heroes
                .find(hero => hero.id === id)
            );
    }

    getHeroes(): Promise<Hero[]> {

        return this.http.get(this.heroesUrl)//
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000))
            .then(() => this.getHeroes())
            ;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}