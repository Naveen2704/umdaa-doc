import {Injectable} from '@angular/core';
import {firebase} from '@firebase/app';
import '@firebase/messaging';
import {environment} from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    currentMessage = new BehaviorSubject(null);

init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        // navigator.serviceWorker.getRegistrations().then(function(registrations) { for(let registration of registrations) { registration.unregister() } })
        navigator.serviceWorker.ready.then((registration) => {
            console.log(registration)
            // Don't crash an error if messaging not supported
            if (!firebase.messaging.isSupported()) {
                   resolve();
                   return;
            }

            const messaging = firebase.messaging();

            // Register the Service Worker
            messaging.useServiceWorker(registration);

            // Initialize your VAPI key
            messaging.usePublicVapidKey(
                  environment.firebase.vapidKey
            );

            // Optional and not covered in the article
            // Listen to messages when your app is in the foreground
            messaging.onMessage((payload) => {
                console.log(payload);
                const notificationOption = {
                  body: payload.data.body,
                  icon: payload.data.icon,
                  click_action:payload.data.click_action
                };
                if (Notification.permission ==="granted") {
                  console.log(notificationOption)
                  var notification = new Notification(payload.data.title,notificationOption);
                  notification.onclick = function(ev){
                    // ev.preventDefault();
                    // window.open(payload.notification.click_action,'_blank');
                    notification.close()
                  }
                }
            });
            // Optional and not covered in the article
            // Handle token refresh
            messaging.onTokenRefresh(() => {
                messaging.getToken().then(
                (refreshedToken: string) => {
                    console.log(refreshedToken);
                }).catch((err) => {
                    console.error(err);
                });
            });
            // messaging.onMessage((payload) => {
            //     console.log('Message received. ', payload);
            //     this.currentMessage.next(payload);
            //   });
            resolve();
        }, (err) => {
            reject(err);
        });
    });
  }
  
  requestPermission(): Promise<void> {
    return new Promise<void>(async (resolve) => {
        if (!Notification) {
            resolve();
            return;
        }
        if (!firebase.messaging.isSupported()) {
            resolve();
            return;
        }
        try {
            const messaging = firebase.messaging();
            await messaging.requestPermission();

            const token: string = await messaging.getToken();
            messaging.onMessage((payload) => {
                console.log('Message received. ', payload);
                // ...
              });
            localStorage.setItem('fcmId', JSON.stringify(token));
            console.log('User notifications token:', token);
        } catch (err) {
            // No notifications granted

            console.log(err)
            
        }

        resolve();
    });
}

}
