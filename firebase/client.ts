import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOIM0_-JRDUTuhV1CpQS-hM8Jro4aZxAg",
  authDomain: "lilemar-website.firebaseapp.com",
  projectId: "lilemar-website",
  storageBucket: "lilemar-website.firebasestorage.app",
  messagingSenderId: "480105221246",
  appId: "1:480105221246:web:8325c2745a44af73d99c2f",
};

const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
  storage = getStorage(app);
}

export { auth, storage };
