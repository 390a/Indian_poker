import{ createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import GameView from '../views/GameView.vue'

const routes = [
    // {path:'/', name: 'Start', component: StartView}, //local用
    // {path:'/game', name: 'Game', component: GameView},//local用
    {path:'/', name: 'Start', component: StartView},//github用
    {path:'/game', name: 'Game', component: GameView},//github用
] 

export default createRouter({
    history: createWebHistory(),
    routes
})