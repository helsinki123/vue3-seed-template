<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
        <el-button :icon="CirclePlus" type="primary" @click="handleAdd">
          新增</el-button
        >
        <el-popconfirm title="批量删除" @confirm="handleDel(chooseData)">
          <template #reference>
            <el-button
              type="danger"
              :icon="Delete"
              :disabled="chooseData.length === 0"
            >
              批量删除</el-button
            >
          </template>
        </el-popconfirm>
        <el-button type="primary" @click="handleDownload">导出</el-button>
      </div>
      <div class="layout-container-form-search">
        <el-input
          v-model="query.input"
          placeholder="请输入关键词进行检索"
          @change="getTableData(true)"
        ></el-input>
        <el-button
          type="primary"
          :icon="Search"
          class="search-btn"
          @click="getTableData(true)"
        >
          搜索</el-button
        >
      </div>
    </div>
    <div class="layout-container-table">
      <Table
        ref="table"
        v-model:page="page"
        v-loading="loading"
        :showIndex="true"
        :showSelection="true"
        :data="tableData"
        @selection-change="handleSelectionChange"
        @getTableData="getTableData"
      >
        <el-table-column prop="anime" label="动漫名称(英文)" align="center" />
        <el-table-column prop="character" label="character" align="center" />
        <el-table-column prop="quote" label="quote" align="center" />
        <!-- <el-table-column prop="radioName" label="单选框" align="center" /> -->
        <el-table-column label="操作" align="center" fixed="right" width="200">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="删除" @confirm="handleDel([scope.row])">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </Table>
      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show" />
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref, reactive,getCurrentInstance } from "vue";
import Table from "@/components/table/index.vue";
import { getData, del } from "@/api/table";
import Layer from "./layer.vue";
import { ElMessage } from "element-plus";
import { selectData, radioData } from "./enum";
import { Avatar } from "@element-plus/icons-vue";
import { CirclePlus, Delete, Search } from "@element-plus/icons-vue";
const internalInstance = getCurrentInstance();
const handleDownload = () => {
  import("@/vendor/Export2Excel").then((excel) => {
    const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
    const data = jsonToArray();
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: "filename",
      autoWidth: 200,
      bookType: "xlsx",
    });
  });
};
const jsonToArray = () => {
  const filterVal = ["chooseName", "name", "radioName"];
  let res = tableData.value.map((i) => {
    return filterVal.map((j) => {
      return i[j];
    });
  });
  return res;
};
const defaultParams = {
  page:1,
  input:""
}
// 存储搜索用的数据
const query = reactive({
  input: "Naruto",
});
// 弹窗控制器
const layer = reactive({
  show: false,
  title: "新增",
  showButton: true,
});
// 分页参数, 供table使用
const page = reactive({
  index: 1,
  size: 20,
  total: 0,
});
const loading = ref(true);
const tableData = ref([]);
const chooseData = ref([]);
const handleSelectionChange = (val) => {
  chooseData.value = val;
};
// 获取表格数据
function getTabData(params) {
      internalInstance.appContext.config.globalProperties.$http
        .get(`https://animechan.vercel.app/api/quotes/anime?title=${params.input}&page=${params.page}`)
        .then((res) => {
          tableData.value = res
          loading.value = false;
        });
    }
const getTableData = ({page}) => {
  loading.value = true;
  let params = {
    page: page?page:1,
    ...query,
  };
  getTabData(params)
  }
// 删除功能
const handleDel = (data) => {
  let params = {
    ids: data
      .map((e) => {
        return e.id;
      })
      .join(","),
  };
  del(params).then((res) => {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getTableData(tableData.value.length === 1 ? true : false);
  });
};
// 新增弹窗功能
const handleAdd = () => {
  layer.title = "新增数据";
  layer.show = true;
  delete layer.row;
};
// 编辑弹窗功能
const handleEdit = (row) => {
  layer.title = "编辑数据";
  layer.row = row;
  layer.show = true;
};
getTableData(defaultParams);
</script>

<style lang="scss" scoped>
</style>