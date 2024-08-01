import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Home from "./components/Home.vue";
import Tweet from "./components/Tweet.vue";
import Profile from "./components/Profile.vue";
import {createRouter, createWebHistory} from "vue-router";
import {createPinia} from "pinia";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_API_KEY,
    authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PROJECT_ID,
    storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const routes = [
    {path: "/", component: Home},
    {path: "/tweet", component: Tweet},
    {path: "/profile/:uid", component: Profile},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount('#app')
