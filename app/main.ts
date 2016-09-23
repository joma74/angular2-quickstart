import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app.module';

const PLATFORM = platformBrowserDynamic();

PLATFORM.bootstrapModule(AppModule)
    .then(success => console.log(`Angular Bootstrap success`))
    .catch(error => console.log(error))
;

