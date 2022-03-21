<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always"> Always </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover"> Hover </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never"> Never </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <el-button class="button" type="text">Operation button</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ 'List item ' + o }}
      </div>
    </el-card>
    <div class="index index_box3">
      <div class="echartbox boxshow">
        <div class="echart_left">
          <div class="echartbox_title">告警统计(按区域)</div>
          <div class="echartbox_con" id="barChar" ref="barChar"></div>
        </div>
      </div>
    </div>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { hbarChar } from "@static/js/js/basic.js";
onMounted(() => {
  hbarChar("barChar");
});
const imageUrl = ref("");
const handleAvatarSuccess = (res, file) => {
  imageUrl.value = URL.createObjectURL(file.raw);
};
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error("Avatar picture must be JPG format!");
  }
  if (!isLt2M) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
  }
  return isJPG && isLt2M;
};
</script>

<style lang="scss" scoped>
.box {
  height: 100vh;
  padding: 15px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  margin: 10px 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>