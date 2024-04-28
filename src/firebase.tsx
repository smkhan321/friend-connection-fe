// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqCpgF3Us9yAukqbD5Efko8pkSwPEIYn4",
  authDomain: "friend-connection-4685a.firebaseapp.com",
  projectId: "friend-connection-4685a",
  storageBucket: "friend-connection-4685a.appspot.com",
  messagingSenderId: "1086901690310",
  appId: "1:1086901690310:web:6022324f54b3c62a875cc7",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey: "BJ4BZVxhpNTjOoxgLxquvHLSDSnR4qjl4Gyq5MPiffx4aXeE78KWXUW6U9_TM8bwLn_3NU3z-taK-dyfC38NhGA",
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