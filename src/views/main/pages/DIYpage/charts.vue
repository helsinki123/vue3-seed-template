<template>
  <div>
    <div class="index index_box3">
      <div class="echartbox boxshow">
        <div class="echart_left">
          <div class="echartbox_title">告警统计(按区域)</div>
          <div class="echartbox_con" id="barChar" ref="barChar"></div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { hbarChar } from "@static/js/js/basic.js";
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// import  {
//   UploadFile,
//   UploadRawFile,
//   UploadProgressEvent,
// } from 'element-plus'

const imageUrl = ref('')
const handleAvatarSuccess = (res, file) => {
  imageUrl.value = URL.createObjectURL(file.raw)
}
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('Avatar picture must be JPG format!')
  }
  if (!isLt2M) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
  }
  return isJPG && isLt2M
}
onMounted(() => {
  hbarChar("barChar");
});
</script>

<style scoped>
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
