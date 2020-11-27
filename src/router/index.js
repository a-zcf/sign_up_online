import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import ('@/views/index/index');
const Signup = () => import ('@/views/signup/signup');
const Signupquery = () => import ('@/views/signupquery/signupquery');

Vue.use(Router)
export default new Router({
  routes: [
    {path: '/', name: 'index', component: Index, meta: {title: '线下报名活动'}},
    {path: '/signup', name: 'signup', component: Signup, meta: {title: '报名'}},
    {path: '/signupquery', name: 'signupquery', component: Signupquery, meta: {title: '报名查询'}},
  ]
})
