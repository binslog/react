import "./style.css";
import javascriptLogo from "./javascript.svg";
import { setupCounter } from "./counter.js";

import firebase from "firebase/app";
import "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDktLoBxSTRsX-w88O6tCnxBM-ZD5FcmbM",
  authDomain: "webrtc-ex1.firebaseapp.com",
  databaseURL: "https://webrtc-ex1-default-rtdb.firebaseio.com",
  projectId: "webrtc-ex1",
  storageBucket: "webrtc-ex1.appspot.com",
  messagingSenderId: "281312474867",
  appId: "1:281312474867:web:1fdbda2a57109664202986",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
