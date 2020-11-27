<template>
  <div class="signup">
    <img :src="bgImg" class="backImg" :style="{ height: height }" />
    <div class="form">
      <van-field
        v-model="name"
        label="姓名"
        :border="false"
        clearable
        @blur="inBlur"
        @focus="inFocus"
      />
      <van-field
        v-model="phone"
        label="联系方式"
        :border="false"
        clearable
        @blur="inBlur"
        @focus="inFocus"
      />
      <van-field
        v-model="unitName"
        label="单位"
        :border="false"
        clearable
        @blur="inBlur"
        @focus="inFocus"
      />
      <van-field
        v-model="officeName"
        label="职务"
        :border="false"
        clearable
        @blur="inBlur"
        @focus="inFocus"
      />
      <div class="radio">
        <label>赞助意向</label>
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="0">有</van-radio>
          <van-radio name="1">否</van-radio>
        </van-radio-group>
      </div>
    </div>
    <button class="signup-submit" @click="clickSubmit">提交报名</button>
    <button class="signup-submit" @click="clickDetails">活动详情</button>
    <van-popup v-model="show" :close-on-click-overlay="false" class="popup">
      <h3>恭喜您！报名成功！</h3>
      <p>报名结果我们将通过真龙微信发送消息告知您的报名结果。</p>
      <p class="p-text">请注意查看！</p>
      <button class="ok-but" @click="clickOk">确定</button>
    </van-popup>
    <van-popup v-model="show1" :close-on-click-overlay="false" class="popup">
      <h3>温馨提示</h3>
      <p>亲，您的报名信息正在审核中 请耐心等待审核结果~~</p>
      <button class="ok-but" @click="clickOk">确定</button>
    </van-popup>
    <van-popup v-model="show2" class="popup1">
      <div class="event-details">
        <h3>活动详情</h3>
        <p v-html="description" class="description">{{ description }}</p>
        <button class="details-but" @click="clickNextPage">下一页</button>
      </div>
    </van-popup>
    <van-popup v-model="show3" class="popup1">
      <div class="event-details">
        <h3>报名规则</h3>
        <p v-html="rule" class="description">{{ rule }}</p>
        <button class="details-but" @click="clickRead">已阅读</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { sign } from "../../api/api";
export default {
  name: "signup",
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      show3: false,
      bgImg: "",
      name: "",
      phone: "",
      unitName: "",
      officeName: "",
      radio: "",
      takePartner: "",
      takeNum: "",
      description: "",
      rule: "",
      height: "",
    };
  },
  mounted() {
    let that = this;
    that.bgImg = that.$route.query.bgImg;
    that.description = that.$route.query.description;
    that.rule = that.$route.query.rule;
  },
  methods: {
    inBlur() {
      this.height = 100 + "%";
      let u = navigator.userAgent,
        app = navigator.appVersion;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
      if (isAndroid) {
        setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded();
          document.activeElement.scrollIntoView();
        }, 100);
      }
    },
    inFocus() {
      this.height = "auto";
    },
    clickSubmit() {
      let that = this;
      if (
        that.name === "" ||
        that.name === null ||
        typeof that.name === undefined
      ) {
        that.$toast("请输入您的姓名！");
        return;
      } else if (!that.name.replace(/[^\u4E00-\u9FA5]/g, "")) {
        that.$toast("姓名不能包含英文、数字或符号！");
        return;
      }
      if (
        that.phone === "" ||
        that.phone === null ||
        typeof that.phone === undefined
      ) {
        that.$toast("请输入正确的联系方式！");
        return;
      } else if (that.phone.replace(/^[0-9]*$/g, "")) {
        that.$toast("联系方式只允许0~9的数字！");
        return;
      } else if (that.phone.length !== 11) {
        that.$toast("联系方式长度为11位数字！");
        return;
      }
      if (
        that.unitName === "" ||
        that.unitName === null ||
        typeof that.unitName === undefined
      ) {
        that.$toast("请输入正确的单位名称！");
        return;
      }
      if (
        that.officeName === "" ||
        that.officeName === null ||
        typeof that.officeName === undefined
      ) {
        that.$toast("请输入正确的职务名称！");
        return;
      }
      if (
        that.radio === "" ||
        that.radio === null ||
        typeof that.radio === undefined
      ) {
        that.$toast("请选择是否同意赞助意向！");
        return;
      }
      let params = {
        activityNo: localStorage.getItem("activityNo"),
        name: that.name,
        phone: that.phone,
        suportintention: that.radio,
        unitName: that.unitName,
        officeName: that.officeName,
        takePartner: that.takePartner,
        takeNum: that.takeNum,
      };
      that.$postRequest(sign, params).then((res) => {
        if (res.data.code === 0) {
          that.show = true;
          that.name = "";
          that.phone = "";
          that.radio = "";
          that.unitName = "";
          that.officeName = "";
          that.takePartner = "";
          that.takeNum = "";
        } else if (res.data.code === 500) {
          that.show1 = true;
        } else {
          that.$toast.fail(res.data.msg);
        }
      });
    },
    clickOk() {
      this.show = false;
      this.$router.push({ path: "/" });
    },
    clickDetails() {
      this.show2 = true;
    },
    clickNextPage() {
      this.show2 = false;
      this.show3 = true;
    },
    clickRead() {
      this.show3 = false;
    },
  },
  created() {},
};
</script>

<style>
</style>