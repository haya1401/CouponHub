import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmQAe4uKdPD_LDYMhrhEKy3WMhiAjQiP8",
  authDomain: "couponhub-70fc5.firebaseapp.com",
  projectId: "couponhub-70fc5",
  storageBucket: "couponhub-70fc5.firebasestorage.app",
  messagingSenderId: "544276776162",
  appId: "1:544276776162:web:6617c611e06f932afccabb"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
