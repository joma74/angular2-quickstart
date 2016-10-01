import {OnInit, Component} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Hero} from "./hero";
import {HeroSearchService} from "./hero-search.service";
import {Router} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: 'hero-search',
    templateUrl: 'hero-search.component.html',
    styleUrls: ['hero-search.component.css'],
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
    private searchTerms = new Subject<String>();
    heroes: Observable<Hero[]>;

    constructor(private heroSearchService: HeroSearchService,
                private router: Router) {
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(term => term ? // switch to new observable each time
                this.heroSearchService.search(term)  // return the http search observable
                :
                Observable.of<Hero[]>([]) // or the observable of empty heroes if no search term
            )
            .catch(error => {
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}