import axios from 'axios'
import Api from '../api/api'
import Vue from 'vue'
import store from '../store/store'
import * as types from '../store/types'
import Qs from 'qs'
import { Toast } from 'vant'
Vue.use(Toast);
const query = Qs.parse(location.search.substring(1))
axios.defaults.withCredentials = false
axios.interceptors.request.use(config => {
  store.commit(types.LOGIN, query.token);
  store.commit(types.ACTIVITYNO, query.activityNo);
  localStorage.setItem("activityNo",store.state.activityNo);
  config.data = JSON.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
  }
  if (store.state.token) {
    config.headers.accessToken = `${store.state.token}`;
  }
  return config
},
  err => {
    return Promise.resolve(err)
  })

axios.interceptors.response.use(response => {
  if (response.data.code === 0) {
    return response
  } else if (response.data.code === 1000) {
    let url = location.href
    store.commit(types.LOGOUT)
    Toast.fail(response.data.msg);
    window.location.href = Api.red_url+url
  } else {

  }
  return response
},
  error => {
    if(error.response){

    }
    return Promise.reject(error.response.data)
  })
let base = Api.base
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    dataType: 'jsonp',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    params:params,
    url: `${base}${url}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}