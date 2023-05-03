import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDWE85opyOd4ZWHSnKhKhppfeDz5W0IVyk",
  authDomain: "social-media-login-7213e.firebaseapp.com",
  projectId: "social-media-login-7213e",
  storageBucket: "social-media-login-7213e.appspot.com",
  messagingSenderId: "309992322782",
  appId: "1:309992322782:web:2a0ae98a1c8bae13fbb44f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();
