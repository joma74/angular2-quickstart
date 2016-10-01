import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Hero} from "./hero";
import {Injectable} from "@angular/core";

@Injectable()
export class HeroSearchService {
    constructor(private http: Http) {
    }
    private heroesUrl = 'app/heroes';  // URL to web api
    search(term: String): Observable<Hero[]> {
        const url = `${this.heroesUrl}/?name=${term}`;
        return this.http
            .get(url)
            .map((r: Response) => r.json().data as Hero[]);
    }
}