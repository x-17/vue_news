<template>
  <div>
    <!-- Header 头部区域 -->
    <div class="search-header">
      <!-- 后退图标 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="18"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-model.trim="kw"
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        v-getFocus
        @input="inputThrottle"
        @search="gotoSearchResult"
      />
    </div>
    <!-- 搜索建议 -->
    <div class="sugg-list" v-if="kw.length != 0">
      <div
        class="sugg-item"
        v-for="(item, i) in suggestList"
        :key="i"
        v-html="fontLight(item, kw)"
        @click="suggestFN(item)"
      ></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="history = []" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(tag, i) in history"
          :key="i"
          @click="historyFN(tag)"
          >{{ tag }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { searchSuggestionAPI } from "@/api";
export default {
  name: "Search",
  data() {
    return {
      // 搜索关键词
      kw: "",
      timer: null,
      suggestList: [],
      // history: ["API", "java", "css", "前端", "后台接口", "python"],
      history: JSON.parse(localStorage.getItem("history") || "[]"),
    };
  },
  watch: {
    // 监视历史记录的变化
    history(newVal) {
      // 持久化存储到本地
      localStorage.setItem("history", JSON.stringify(newVal));
    },
  },
  methods: {
    inputThrottle() {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        if (this.kw.length === 0) {
          this.suggestList = [];
          return;
        }
        const res = await searchSuggestionAPI(this.kw);
        this.suggestList = res.data.data.options;
        // 把搜索关键词加入到搜索历史中
        if (
          !this.history.some((item) => item === this.kw) &&
          this.kw.length != 0
        ) {
          this.history.unshift(this.kw);
        }
        console.log(this.suggestList);
      }, 300);
    },
    fontLight(source, target) {
      if (!source || !target) return;
      const reg = new RegExp(target, "gi");
      return source.replace(reg, this.light);
    },
    light(match) {
      return `<span style="color:red;">${match}</span>`;
    },
    //跳转到搜索结果界面
    gotoSearchResult() {
      this.$router.push(`/search_result/${this.kw}`);
    },
    //联想菜单点击
    suggestFN(str) {
      this.$router.push(`/search_result/${str}`);
    },
    //历史记录点击
    historyFN(str) {
      this.$router.push(`/search_result/${str}`);
    },
  },
  activated() {
    this.kw = "";
  },
};
</script>

<style lang="less" scoped>
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  // 后退按钮
  .goback {
    padding-left: 14px;
  }
  // 搜索组件
  .van-search {
    flex: 1;
  }
}
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>