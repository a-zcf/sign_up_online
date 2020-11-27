<template>
  <div class="signupquery">
    <img :src="bgImg" class="backImg" />
    <div class="query">
      <!-- <h3>报名查询</h3> -->
      <p class="act-sign">
        {{
          act === "0"
            ? "很抱歉！活动暂时还未开始！"
            : "" || (act === "1" && sign === "-1")
            ? "抱歉！您还未报名，未查到您的报名记录"
            : act === "1" && sign === "0"
            ? "已经报名,待审核中..."
            : act === "1" && sign === "1"
            ? "恭喜您！报名成功，审核通过"
            : act === "1" && sign === "2"
            ? "已经报名，且已取消"
            : act === "1" && sign === "3"
            ? "审核失败!"
            : "" || act==="2"
            ? "成功结束"
            : "" || act==="3"
            ? "失败结束!"
            : "" || act==="4"
            ? "活动结束"
            : "" || act===""
            ? "很抱歉！查不到您的报名记录"
            :''
        }}
      </p>
    </div>
    <button class="sign-but" v-if="act==='1'&&sign==='-1'" @click="clickSign">点击报名</button>
  </div>
</template>

<script>
import { index } from "../../api/api";
export default {
  name: "signupquery",
  data() {
    return {
    //   bgImg: require("../../assets/img/elh.png"),
      act: "",
      sign: "",
      bgImg:"",
      description:"",
      rule:""
    };
  },
  mounted() {
    let that = this;
    let activityNo = localStorage.getItem("activityNo");
    that.$getRequest(index + "?activityNo=" + activityNo).then((res) => {
      if (res.data.code === 0) {
        let {bgImg, activityStatus, signState,description, rule} = res.data.activityInfo;
        that.bgImg = bgImg
        that.act = activityStatus;
        that.sign = signState;
        that.description = description
        that.rule = rule
      } else {
        console.log(res);
      }
    });
  },
  methods: {
      clickSign(){
        this.$router.push({path:'/signup',query:{bgImg:this.bgImg,description:this.description,rule:this.rule}})
      }
  },
};
</script>

<style>
</style>