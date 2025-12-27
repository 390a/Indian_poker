import{ createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import GameView from '../views/GameView.vue'
// import Result from '../views/ResultView.vue'

const routes = [
    {path:'/', name: 'Start', component: StartView},
    {path:'/game', name: 'Game', component: GameView},
    // {path:'/result', name: 'Result', component: ResultView}
] 

export default createRouter({
    history: createWebHistory(),
    routes
})