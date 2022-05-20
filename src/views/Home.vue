<template>
  <div class="home-container">
    <!-- 顶部导航 -->
    <van-nav-bar fixed>
      <template #right>
        <van-icon
          name="search"
          size="0.53rem"
          color="#fff"
          @click="gotoSearch"
        />
      </template>
      <template #left>
        <span class="title">头条新闻</span>
      </template>
    </van-nav-bar>
    <!-- 滚动条 -->
    <van-tabs
      v-model="active"
      sticky
      offset-top="1.22667rem"
      color="#007bff"
      animated
    >
      <van-tab
        v-for="item in userChannels"
        :key="item.id"
        :title="item.name"
        :name="item.id"
      >
        <ArticleList :nowArticleID="active"></ArticleList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannelsAPI } from "@/api/index.js";
import ArticleList from "@/components/ArticleList.vue";
export default {
  data() {
    return {
      active: 0,
      userChannels: [],
      show: false,
    };
  },
  methods: {
    //获取频道
    async getChannel() {
      const res = await getUserChannelsAPI();
      console.log("频道", res);
      this.userChannels = res.data.data.channels;
    },
    gotoSearch() {
      this.$router.push("/search");
    },
  },
  created() {
    //获取频道
    this.getChannel();
  },
  components: {
    ArticleList,
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
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
  .title {
    color: white;
    font-size: 16px;
  }
}
</style>