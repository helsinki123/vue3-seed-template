<!--
<template>
  <div>
    自定义menu导航菜单
    <ul class="loncom_left_navcon">
      <li v-for="item in leftNavList" :key="item.name">
        <router-link :to="item.url" ref="lon_link">
          <div class="lon_nav" ref="lon_nav">
            <em><img :src="item.icon" /></em>
            <span v-if="navbtn == 'close'">{{ item.name }}</span>
            <span v-if="navbtn == 'open'">{{ item.fullName }}</span>
          </div>
          <dl v-show="navbtn == 'open'">
            <dd v-for="inItem in item.item" :key="inItem.fullName">
                <span>{{ inItem.fullName }}</span>
            </dd>
          </dl>
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, unref } from "vue";
const navbtn = "open";
const leftNavList = [
  {
    fullName: "aa",
    icon: "",
    name: "aa日志",
    url: "/pages/DIYpage/test1",
    item: [
      {
        fullName: "test1",
        icon: "",
        name: "test1",
        url: "/pages/DIYpage/test1",
      },
    ],
  },
  {
    fullName: "bb",
    icon: "",
    name: "bb日志",
    url: "/pages/DIYpage/test2",
    item: [
      {
        fullName: "test2",
        icon: "",
        name: "test2",
        url: "/pages/DIYpage/test2",
      },
    ],
  },
];
</script>

<style scoped>
.loncom_left_navcon{
  width: 200px;
}
.loncom_left_navcon li dl {
  background: #d0f0f5;
  display: none;
}
.loncom_left_navcon li .router-link-active dl {
  display: block;
}
</style>


<template>
  <div>
    <h1>百度Map</h1>
    <div id="aaa"></div>
  </div>
</template>
  
<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
onMounted(() => {
  var map = new BMapGL.Map("aaa");
  // 创建地图实例
  var point = new BMapGL.Point(116.404, 39.915);
  // 创建点坐标
  map.centerAndZoom(point, 15);
});
const navbtn = "open";
</script>
<style scpoed>
.bm-view,
#container,
#aaa {
  width: 100vw;
  height: 100vh;
  border: 1px solid black;
}
.baidu {
  width: 500px;
  height: 500px;
}
.bm-view {
  width: 100%;
  height: 300px;
}
#main,
#container {
  width: 500px;
  height: 500px;
  border: 1px solid black;
}
.echartbox_con {
  width: 500px;
  height: 500px;
  border: 1px solid black;
}
.index_box3 {
  width: 100%;
  height: 800px;
}
.echartbox_con {
  width: 100%;
  height: calc(100% - 35px);
  height: 500px;
}
.box1 {
  height: 200px;
  width: 90%;
  margin: 10px;
  background-color: goldenrod;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.loncom_left_navcon li dl {
  background: #d0f0f5;
  display: none;
}
.loncom_left_navcon li .router-link-active dl {
  display: block;
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
-->