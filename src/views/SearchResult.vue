<template>
  <div class="search-result-container">
    <!-- 点击实现后退效果 -->
    <van-nav-bar
      title="搜索结果"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
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
          v-for="item in resultList"
          :key="item.art_id"
          :artObj="item"
          :ishow="false"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem.vue";
import { searchResultAPI } from "@/api/index.js";
export default {
  name: "SearchResult",
  data() {
    return {
      page: 1,
      resultList: [],
      finished: false,
      loading: false,
      refreshing: false,
      isfresh: false,
    };
  },
  created() {
    this.getkwArticle();
  },
  props: {
    kw: String,
  },
  watch: {
    kw() {
      (this.page = 1),
        (this.resultList = []),
        (this.finished = false),
        (this.loading = false),
        (this.refreshing = false),
        this.getkwArticle();
    },
  },
  components: {
    ArticleItem,
  },
  methods: {
    //获取相关关键字文章信息
    async getkwArticle() {
      const res = await searchResultAPI({
        page: this.page,
        q: this.kw,
      });
      if (res.data.data.results.length === 0) {
        this.finished = true;
        return;
      }
      this.page++;
      if (this.isfresh) {
        this.resultList = [...res.data.data.results, ...this.resultList];
      } else {
        this.resultList = [...this.resultList, ...res.data.data.results];
      }
      this.loading = false;
      this.isfresh = false;
      this.refreshing = false;
      console.log(res);
    },
    //上拉加载
    onLoad() {
      this.getkwArticle();
    },
    //下拉刷新
    onRefresh() {
      this.isfresh = true;
      this.getkwArticle();
    },
  },
};
</script>
<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
  .van-nav-bar {
    background-color: #007bff;
    /deep/ .van-nav-bar__title {
      color: white;
    }
    /deep/ .van-icon {
      color: white;
    }
  }
}
</style>