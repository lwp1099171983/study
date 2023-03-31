<template>
  <view className="{styles.section}">
    <Image className="{styles.img}" source="{}" />
    <button type="default" @click="login">微信登陆</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "登陆页面",
    };
  },
  onLoad() {},
  onShow() {},
  methods: {
    goto(url) {
      uni.switchTab({
        url: url,
      });
    },
    async login() {
      const authCode = await this.getAuthCode();
      console.log(authCode);
      this.goto("/pages/index/index");
    },
    getAuthCode: function getAuthCode() {
      return new Promise(function (resolve) {
        wx.login({
          success: function success(res) {
            return resolve(res.code);
          },
          fail: function fail() {
            return resolve(false);
          },
        });
      });
    },
  },
};
</script>

<style></style>
