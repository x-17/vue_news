<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ aticle_info.title }}</h1>

      <!-- 用户信息 -->
      <van-cell
        center
        :title="aticle_info.aut_name"
        :label="formatDate(aticle_info.pubdate)"
      >
        <template #icon>
          <!-- 头像 -->
          <img :src="aticle_info.aut_photo" alt="hehe" class="avatar" />
        </template>
        <template #default>
          <div>
            <!-- 是否关注了作者 -->
            <van-button
              type="info"
              size="mini"
              v-if="aticle_info.is_followed"
              @click="followedFN(true)"
              >已关注</van-button
            >
            <van-button
              icon="plus"
              type="info"
              size="mini"
              plain
              v-else
              @click="followedFN(false)"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="aticle_info.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="aticle_info.attitude === 1"
          @click="likeFN(true)"
          >已点赞</van-button
        >
        <van-button
          icon="good-job-o"
          type="danger"
          plain
          size="small"
          v-else
          @click="likeFN(false)"
          >点赞</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import {
  getArticleDetailAPI,
  isFollowedAPI,
  notFollowedAPI,
  islikeAPI,
  notlikeAPI,
} from "@/api/index.js";
import { timeAgo } from "@/utils/date.js";
export default {
  data() {
    return {
      aticle_info: {},
    };
  },
  props: {
    art_id: String,
  },
  methods: {
    //格式化日期
    formatDate(time) {
      return timeAgo(time);
    },
    //关注和取关
    async followedFN(flag) {
      if (flag) {
        const res = await isFollowedAPI(this.aticle_info.aut_id);
        console.log(res);
        this.aticle_info.is_followed = false;
      } else {
        await notFollowedAPI(this.aticle_info.aut_id);
        this.aticle_info.is_followed = true;
      }
    },
    //点赞和取消
    async likeFN(flag) {
      if (flag) {
        const res = await islikeAPI(this.aticle_info.art_id);
        this.aticle_info.attitude = 0;
        console.log(res);
      } else {
        await islikeAPI(this.aticle_info.art_id);
        this.aticle_info.attitude = 1;
      }
    },
  },
  watch: {
    async art_id() {
      this.aticle_info = {};
      const res = await getArticleDetailAPI(this.art_id);
      console.log("文章刷新缓存", res);
      this.aticle_info = res.data.data;
    },
  },
  async created() {
    const res = await getArticleDetailAPI(this.art_id);
    console.log("文章", res);
    this.aticle_info = res.data.data;
  },
};
</script>
<style lang="less" scoped>
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>