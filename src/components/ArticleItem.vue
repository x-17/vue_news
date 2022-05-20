<template>
  <div @click="gotoArticle">
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <!-- 单张图片 -->
          <img
            :src="artObj.cover.images[0]"
            alt=""
            class="thumb"
            v-if="artObj.cover.type == 1"
          />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="artObj.cover.type == 3">
          <img
            :src="item"
            alt=""
            class="thumb"
            v-for="(item, index) in artObj.cover.images"
            :key="index"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span
            >{{ artObj.aut_name }} &nbsp;&nbsp;{{ artObj.comm_count }}评论
            &nbsp;&nbsp; {{ formatTime(artObj.pubdate) }}</span
          >
          <!-- 关闭按钮 -->
          <van-icon name="cross" @click.stop="show = true" v-if="ishow" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      :cancel-text="bottomText"
      get-container="body"
      @cancel="cancelFN"
      @close="closeFN"
    />
  </div>
</template>
<script>
import { timeAgo } from "@/utils/date.js";
import reports from "@/api/reports.js";
import { dislikeArticleAPI, reportArticleAPI } from "@/api/index.js";
import { Notify } from "vant";
export default {
  data() {
    return {
      show: false,
      actions: [{ name: "不感兴趣" }, { name: "反馈垃圾内容" }],
      bottomText: "取消",
    };
  },
  props: {
    artObj: Object,
    ishow: Boolean,
  },
  methods: {
    formatTime(time) {
      return timeAgo(time);
    },
    async onSelect(action) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      if (action.name === "反馈垃圾内容") {
        this.actions = reports;
        this.bottomText = "返回";
      } else if (action.name === "不感兴趣") {
        try {
          await dislikeArticleAPI(this.artObj.art_id);
          this.$emit("remove-article", this.artObj.art_id);
          Notify({ type: "success", message: "反馈成功" });
        } catch (error) {
          Notify({ type: "danger", message: "反馈失败" });
        }
        this.show = false;
      } else {
        try {
          await reportArticleAPI({
            target: this.artObj.art_id,
            type: action.value,
          });
          this.$emit("remove-article", this.artObj.art_id);
          Notify({ type: "success", message: "反馈成功" });
        } catch (error) {
          Notify({ type: "danger", message: "反馈失败" });
        }
        this.show = false;
      }
    },
    //二级标题回退
    cancelFN() {
      if (this.bottomText === "返回") {
        this.show = true;
        this.actions = [{ name: "不感兴趣" }, { name: "反馈垃圾内容" }];
        this.bottomText = "取消";
      }
    },
    //关闭时数据复原
    closeFN() {
      if (this.bottomText === "返回") {
        this.actions = [{ name: "不感兴趣" }, { name: "反馈垃圾内容" }];
        this.bottomText = "取消";
      }
    },
    //文章详情
    gotoArticle() {
      this.$router.push(`/article_detail/${this.artObj.art_id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>