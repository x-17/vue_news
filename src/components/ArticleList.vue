<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :disabled="finished"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        offset="50"
        @load="onLoad"
      >
        <ArticleItem
          v-for="item in articleList"
          :key="item.art_id"
          :artObj="item"
          @remove-article="removeArticle"
          :ishow="true"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAllArticleListAPI } from "@/api/index.js";
import ArticleItem from "@/components/ArticleItem.vue";
export default {
  // 大驼峰命名法：每个单词的首字母大写
  name: "ArtList",
  data() {
    return {
      articleList: [],
      preTimestamp: new Date().getTime(),
      finished: false,
      loading: false,
      refreshing: false,
      isfresh: false,
    };
  },
  components: {
    ArticleItem,
  },
  props: {
    nowArticleID: Number,
  },
  methods: {
    //获取某个频道的文章
    async getArticle() {
      const res = await getAllArticleListAPI({
        channel_id: this.nowArticleID,
        timestamp: this.preTimestamp,
      });
      this.preTimestamp = res.data.data.pre_timestamp;
      if (this.isfresh) {
        this.articleList = [...res.data.data.results, ...this.articleList];
      } else {
        this.articleList = [...this.articleList, ...res.data.data.results];
      }
      console.log(res);
      this.loading = false;
      this.isfresh = false;
      this.refreshing = false;
      if (res.data.data.pre_timestamp === null) {
        this.finished = true;
      }
    },
    //上拉加载
    onLoad() {
      this.getArticle();
    },
    //下拉刷新
    onRefresh() {
      this.isfresh = true;
      this.getArticle();
    },
    //删除文章
    removeArticle(artid) {
      this.articleList = this.articleList.filter((val) => val.art_id != artid);
      if (this.articleList.length < 10) {
        this.getArticle();
      }
    },
  },
  created() {
    this.getArticle();
  },
};
</script>

<style lang="less" scoped></style>