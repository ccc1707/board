import { createWebHistory, createRouter } from "vue-router";

import LoginPage from './components/LoginPage'
import BoardList from './components/BoardList'
import BoardWrite from './components/BoardWrite'
import DetailPage from './components/DetailPage'

const routes = [
    {
        path: "/",
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: "/list",
        name: 'BoardList',
        component: BoardList
    },
    {
        path: "/write",
        name: 'BoardWrite',
        component: BoardWrite,
    },
    {
        path: "/detail",
        name: 'DetailPage',
        component: DetailPage,
        props: true
    }

    // {
    //     path: "/",
    //     component: BoardList,
    //     children: {
    //         path: "detail/:id",
    //         component: DetailPage
    //     }
    // },
    // {
    //     path: "/write",
    //     component: BoardWrite,
    // },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;