<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="userprofile.photo"
            @click="changeImage"
          />
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            v-show="false"
            ref="iptfile"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="userprofile.name"
        @click="editName"
      />
      <van-cell
        title="生日"
        is-link
        :value="userprofile.birthday"
        @click="editBirthday"
      />
    </van-cell-group>
    <!-- 修改名字的弹窗 -->
    <van-dialog
      v-model="show"
      title="名称"
      show-cancel-button
      :before-close="beforeClose"
    >
      <input type="text" class="iptname" v-getFocus v-model="iptUserName" />
    </van-dialog>
    <!-- 修改生日得弹窗 -->
    <van-popup
      v-model="birthdayShow"
      position="bottom"
      :style="{ height: '50%' }"
      round
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择生日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="dateCancel"
        @confirm="dateConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import {
  getuserProfile,
  editPhotoAPI,
  editNameAndBirthAPI,
} from "@/api/index.js";
import { Dialog, Notify } from "vant";
import { dateToStr } from "@/utils/date.js";
export default {
  name: "UserEdit",
  data() {
    return {
      userprofile: {},
      show: false,
      iptUserName: "",
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      currentDate: null,
      birthdayShow: false,
    };
  },
  created() {
    this.initUserEdit();
  },
  methods: {
    async initUserEdit() {
      const res = await getuserProfile();
      console.log("编辑资料", res);
      this.userprofile = res.data.data;
      this.iptUserName = res.data.data.name;
    },
    //换头像
    async onFileChange(e) {
      if (e.target.files[0] === 0) return;
      console.log(e.target.files);
      const fo = new FormData();
      fo.append("photo", e.target.files[0]);
      const res = await editPhotoAPI(fo);
      console.log("修改头像", res);
      this.userprofile.photo = res.data.data.photo;
    },
    // 点击头像触发input-file
    changeImage() {
      this.$refs.iptfile.click();
    },
    // 换名字
    editName() {
      this.show = true;
    },
    //点击确认修改名字
    async beforeClose(action, done) {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5-_]{1,7}$/;
      if (action === "confirm") {
        if (reg.test(this.iptUserName)) {
          //发送请求并修改名字
          const res = await editNameAndBirthAPI({ name: this.iptUserName });
          if (res.data.message === "OK") {
            this.userprofile.name = this.iptUserName;
            console.log("修改名字", res);
            Notify({ type: "success", message: "修改成功" });
            done();
          } else {
            Notify({ type: "danger", message: "修改失败请稍后再试" });
          }
        } else {
          Notify({ type: "danger", message: "用户名输入有误" });
          done(false);
        }
      } else {
        done();
      }
    },
    //点击生日出现选择框
    editBirthday() {
      this.birthdayShow = true;
      this.currentDate = new Date(this.userprofile.birthday);
    },
    //生日取消按钮
    dateCancel() {
      this.birthdayShow = false;
    },
    //生日确认按钮
    async dateConfirm() {
      const res = await editNameAndBirthAPI({
        birthday: dateToStr(this.currentDate),
      });
      if (res.data.message === "OK") {
        console.log("修改生日", res);
        this.userprofile.birthday = dateToStr(this.currentDate);
        this.birthdayShow = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
}

.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
  /deep/ .van-dialog__content {
    display: flex;
    justify-content: center;
    .iptname {
      display: inline-block;
      outline: none;
      border: none;
      padding: 10px 0;
      text-align: center;
    }
  }
}
</style>