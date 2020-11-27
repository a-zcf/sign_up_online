import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store/store'
import router from './router/index'
import './utils/rem'
import './assets/icon/iconfont.css'
import { getRequest, postRequest } from './utils/request'
import { 
  Dialog,
  Popup,
  Field,
  RadioGroup,
  Radio,
  Toast
} from 'vant';
Vue.use(Vuex)
Vue.use(Dialog);
Vue.use(Popup);
Vue.use(Field);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Toast);
Vue.config.productionTip = false
Vue.prototype.$getRequest = getRequest // get请求
Vue.prototype.$postRequest = postRequest // post请求

//弹出框禁止滑动
Vue.prototype.noScroll = function () {
  var mo = function (e) { e.preventDefault() }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false)// 禁止页面滑动
  }
 
 //弹出框可以滑动
  Vue.prototype.canScroll = function () {
  var mo = function (e) {
  e.preventDefault()
  }
  document.body.style.overflow = ''// 出现滚动条
  document.removeEventListener('touchmove', mo, false)
  }

router.beforeEach((to, from, next) => {
  // 路由发生改变修改页面的title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
