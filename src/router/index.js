import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/main/login.vue'
import Home from '../views/Home.vue'
import Booklist from '../views/Booklist.vue'
import selectbook from '../views/selectbook.vue'
import firstpage from '../views/firstpage.vue'
import borrownow from '../views/BorrowNow.vue'
import bookrecord from '../views/BookRecord.vue'
Vue.use(VueRouter)




const routes = [{
        path: '/',
        redirect: '/login'
    }, {

        path: "/home",
        name: 'home',
        component: Home,
        meta: {
            isLogin: true
        },
        children: [{
                path: "/home",
                redirect: 'firstpage'
            }, {
                path: "booklist",
                name: 'Booklist',
                component: Booklist,
            },
            {
                path: "selectbook",
                name: 'selectbook',
                component: selectbook,
            },
            {
                path: "firstpage",
                name: 'firstpage',
                component: firstpage,
            },
            {
                path: "bookrecord",
                name: 'bookrecord',
                component: bookrecord,
            },
            {
                path: "borrownow",
                name: 'borrownow',
                component: borrownow,
            }

        ]

    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            isLogin: true
        }
    }
]



const router = new VueRouter({
    routes,
    mode: 'history',
})

router.beforeEach((to, from, next) => {

    if (to.path === '/login') {
        next()
    } else {
        let token = localStorage.getItem('token')
        if (token == 'success') {
            next()
        } else {
            next('/login')
        }
    }
})

export default router