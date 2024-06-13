import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d3da5.firebaseapp.com",
  projectId: "mern-blog-d3da5",
  storageBucket: "mern-blog-d3da5.appspot.com",
  messagingSenderId: "382172879859",
  appId: "1:382172879859:web:9e362ed79b894bce799086",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
