// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRoBCWdcoORHEm-4tJ4ef_kYrbilyJvqo",
  authDomain: "radio-lsr.firebaseapp.com",
  projectId: "radio-lsr",
  storageBucket: "radio-lsr.appspot.com",
  messagingSenderId: "123740105356",
  appId: "1:123740105356:web:89ead7d795d23e41cd29a9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)

export { db, auth, storage };
