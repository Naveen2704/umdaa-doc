import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then((reg) => {
  
//   if ('serviceWorker' in navigator && environment.production) {
//     navigator.serviceWorker.register('ngsw-worker.js');
//     reg.pushManager.getSubscription().then(function(sub) {
//     }
//   }
// }).catch(err => console.log(err));
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('ngsw-worker.js').then(function(reg) {
    console.log('Service Worker Registered!', reg);

    reg.pushManager.getSubscription().then(function(sub) {
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
      } else {
        // We have a subscription, update the database
        console.log('Subscription object: ', sub);
        // alert('hell')
      }
    });
  })
   .catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
}

})