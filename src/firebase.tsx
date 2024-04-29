// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey: "",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("Current token for client: ", currentToken);
        // setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // Show on the UI that permission is secured
      } else {
        console.log("No registration token available. Request permission to generate one.");
        // setTokenFound(false);
        // Show on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error("An error occurred while retrieving token: ", err);
      // Catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });