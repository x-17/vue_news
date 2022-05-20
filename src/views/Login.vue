<template>
  <div class="login-container">
    <van-nav-bar title="校园头条●登录" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="user.mobile"
          required
          name="mobile"
          label="手机号"
          placeholder="请输入11位手机号"
          :rules="[
            {
              required: true,
              message: '请填写正确手机号',
              pattern:
                /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            },
          ]"
        />
        <van-field
          v-model="user.code"
          type="password"
          required
          name="code"
          label="密码"
          placeholder="请输入6位密码"
          :rules="[
            {
              required: true,
              message: '请填写正确密码',
              pattern: /^[0-9a-zA-Z-_]{6}$/,
            },
          ]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="load"
          :disabled="load"
          loading-text="正在登录..."
          loading-type="spinner"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from "@/api/index.js";
import { Notify } from "vant";
import { setToken } from "@/utils/token.js";

export default {
  methods: {
    //点击登录按钮
    async onSubmit(values) {
      this.load = true;
      console.log("submit", values);
      try {
        const res = await loginAPI(this.user);
        console.log(res);
        // 成功通知
        Notify({ type: "success", message: "登录成功" });
        setToken(res.data.data.token);
        this.$router.push("/layout");
      } catch (error) {
        // 危险通知
        Notify({ type: "danger", message: "手机号或密码错误" });
        console.log(error);
      }
      this.load = false;
    },
  },
  data() {
    return {
      user: {
        mobile: "15647358979",
        code: "246810",
      },
      load: false,
    };
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .van-nav-bar {
    background-color: #007bff;
  }
  /deep/ .van-nav-bar__title {
    color: white;
  }
  .van-button--primary {
    background-color: #007bff;
    border: 0.02667rem solid #007bff;
  }
}
</style>