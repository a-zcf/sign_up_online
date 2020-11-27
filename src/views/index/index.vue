<template>
  <div class="index">
    <img :src="bgImg" class="backImg" />
    <div class="content">
      <p class="sign-up-time">报名时间</p>
      <p class="end-itme">{{starttime}}-{{endtime}}</p>
      <button class="index-but" @click="clickSignup">点击报名</button>
      <button class="index-but" @click="clickQuery">报名查询</button>
      <button class="index-but" @click="clickDetails">活动详情</button>
    </div>
    <van-popup v-model="show" class="popup">
      <div class="event-details">
         <h3>活动详情</h3>
         <p v-html="description" class="description">{{description}}</p>
         <button class="details-but" @click="clickNextPage">下一页</button>
      </div>
    </van-popup>
    <van-popup v-model="show1" class="popup">
      <div class="event-details">
         <h3>报名规则</h3>
         <p v-html="rule" class="description">{{rule}}</p>
         <button class="details-but" @click="clickRead">已阅读</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import {index} from '../../api/api'
export default {
  name: 'index',
  data () {
    return {
      show:false,
      show1:false,
      bgImg:'',
      starttime:'',
      endtime:'',
      activityStatus:'',
      signState:'',
      description:'',
      rule:'',
    }
  },
  mounted () {
    let that = this
    let activityNo = localStorage.getItem("activityNo")
    that.$getRequest(index+"?activityNo="+activityNo).then( res => {
      if(res.data.code === 0){
         console.log(res)
         let {bgImg,starttime,endtime,activityStatus,signState,description,rule} = res.data.activityInfo
         that.bgImg = bgImg
         that.starttime = that.formatDate(starttime)
         that.endtime = that.formatDate(endtime)
         that.activityStatus = activityStatus
         that.signState = signState
         that.description = description
         that.rule = rule
      }else{
        console.log(res)
      }
    })
  },
  methods: {
    formatDate(now) {
      let time2 = new Date(now)
      let month=time2.getMonth()+1;
      let date=time2.getDate();
      return month+"月"+date+"日";
    },
    clickSignup(){
      let that = this
       let act = that.activityStatus
       let signState = that.signState
      switch(act){
        case act = '0':
          that.$dialog({ message: '不好意思！暂时还未开始' });
          break
        case act = '1':
          switch(signState){
            case signState = '-1':
              that.show = true
              break
            case signState = '0':
              that.$dialog({ message: '已经报名,待审核中...' });
              break
            case signState = '1':
              that.$dialog({ message: '已经报名，审核已通过！' });
              break
            case signState = '2':
              that.$dialog({ message: '已经报名，已取消！' });
              break
            case signState = '3':
              that.$dialog({ message: '审核失败！' });
              break
          }
          break
        case act = '2':
          that.$dialog({ message: '成功结束' });
          break
        case act = '3':
          that.$dialog({ message: '失败结束' });
          break
        case act = '4':
          that.$dialog({ message: '活动结束' });
      }
    },
    clickNextPage(){
      this.show = false
      this.show1 = true
    },
    clickRead(){
      this.show1 = false
      this.$router.push({path:'/signup',query:{bgImg:this.bgImg,description:this.description,rule:this.rule}})
    },
    clickQuery(){
      this.$router.push({path:'/signupquery'})
    },
    clickDetails(){
     this.show = true
    }
  }
}
</script>

<style >

</style>