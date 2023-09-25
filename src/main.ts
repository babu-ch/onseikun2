import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Home from "./components/Home.vue";
import Tweet from "./components/Tweet.vue";
import Profile from "./components/Profile.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: "/", component: Home},
    {path: "/tweet", component: Tweet},
    {path: "/profile/:uid", component: Profile},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);

app.mount('#app')
