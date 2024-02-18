import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBHfwepS_UPP0KxP48OTCrK2Pb3tpSXooA",
    authDomain: "dropbox-clone-f6d83.firebaseapp.com",
    projectId: "dropbox-clone-f6d83",
    storageBucket: "dropbox-clone-f6d83.appspot.com",
    messagingSenderId: "5520277134",
    appId: "1:5520277134:web:314720812ed471d3e613df"
  };

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };