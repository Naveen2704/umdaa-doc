importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDGWuC6ALMHIpqNM13mf5Ruq93rAnBAxtk",
  authDomain: "umdaa-662e4.firebaseapp.com",
  databaseURL: "https://umdaa-662e4.firebaseio.com",
  projectId: "umdaa-662e4",
  storageBucket: "umdaa-662e4.appspot.com",
  messagingSenderId: "528691646339",
  appId: "1:528691646339:web:64653f375d7310de7c30b6",
  measurementId: "G-6CZ13JHRKC",
  vapidKey:'BABy_zsHBGFhErrC2LDbZGvy_AZEdyHpoKpMs8h7T8nskLcwZzK_F3sG15wYcy2XoXLHSvUYJTPVEWMrOFqgCDk',
  messagingSenderId: '528691646339'
};

firebase.initializeApp(config);

var messaging = firebase.messaging();
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log('Registration successful, scope is:', registration.scope);
//       }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//       });
//     }

    // messaging.setBackgroundMessageHandler((function(payload) {
    //     console.log(payload);
    //     const notification = Json.parse(payload);
    //     const notificationOption = {
    //         body: payload.data.body,
    //         icon: payload.data.image
    //       };
    //       return self.registration.showNotification(payload.data.title, notificationOption)
    // }))

    // messagingSenderId: '528691646339' 

    messaging.onBackgroundMessage(function(payload) {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      // Customize notification here
      const notificationTitle = 'Background Message Title';
      const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
      };
    
      self.registration.showNotification(notificationTitle,
        notificationOptions);
    });

    self.addEventListener('install', () => self.skipWaiting());

    self.addEventListener('activate', () => {
      self.registration.unregister();
      self.clients.matchAll({ type: 'window' }).then(clients => {
        for (const client of clients) {
          client.navigate(client.url);
        }
      });
    });