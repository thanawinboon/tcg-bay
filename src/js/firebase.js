import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBL5sdV8qRigK8dQInqNYrWaaeoq2bNJ4k",
  authDomain: "iccs340-project-1e562.firebaseapp.com",
  projectId: "iccs340-project-1e562",
  storageBucket: "iccs340-project-1e562.appspot.com",
  messagingSenderId: "254948308067",
  appId: "1:254948308067:web:8899b0c7d6a33ef4ee3456"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const auth = getAuth(app);

export {
    db,
    auth
}
