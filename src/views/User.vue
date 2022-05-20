<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="userinfo.photo" alt="" class="avatar" />
        </template>
        <template #title>
          <span class="username">{{ userinfo.name }}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{ userinfo.art_count }}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{ userinfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{ userinfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link to="/useredit" />
      <van-cell icon="warning-o" title="退出登录" is-link @click="exit" />
    </van-cell-group>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { getuserInfo } from "@/api/index.js";
import { removeToken } from "@/utils/token.js";
export default {
  data() {
    return {
      userinfo: {},
    };
  },
  methods: {
    async getUserBase() {
      const res = await getuserInfo();
      this.userinfo = res.data.data;
      console.log("基础资料", res);
    },
    exit() {
      Dialog.confirm({
        title: "退出登录",
        message: "要走的人留不住",
      })
        .then(() => {
          // on confirm
          removeToken();
          this.$router.replace("/login");
        })
        .catch(() => {
          // on cancel
          console.log("取消退出");
        });
    },
  },
  created() {
    this.getUserBase();
  },
  // 被激活了
  activated() {
    // 只要组件被激活了，就重新初始化用户的信息
    this.getUserBase();
  },
};
</script>

<style lang="less" scoped>
.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>