// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCqCpgF3Us9yAukqbD5Efko8pkSwPEIYn4",
    authDomain: "friend-connection-4685a.firebaseapp.com",
    projectId: "friend-connection-4685a",
    storageBucket: "friend-connection-4685a.appspot.com",
    messagingSenderId: "1086901690310",
    appId: "1:1086901690310:web:6022324f54b3c62a875cc7",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});