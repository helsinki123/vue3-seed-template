<template>
  
<el-sub-menu v-if="menu.children.length > 0" :index="menu.index" class="test">
    <template #title>
      <el-icon><document-copy /></el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <template v-for="child in menu.children">
      <menu-tree
        v-if="child.children.length > 0"
        :menu="child"
        :key="child.index"
      ></menu-tree>
      <el-menu-item
        v-else
        :index="child.path"
        :key="child.index"
        @click="jump(child.path)"
        >{{ child.name }}</el-menu-item
      >
    </template>
  </el-sub-menu>
    
</template>

<script>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CirclePlus, Delete, Search } from "@element-plus/icons-vue";
import { router } from "../router";
export default {
  name: "menu-tree",
  props: {
    menu: {},
  },
  setup(props, ctx) {
    const router = useRouter();
    const route = useRoute();
    function jump(path) {
    }
    onMounted(() => {});
    return {
      jump,
    };
  },
};
</script>

<style lang="scss" scoped>

  
      .el-menu-item, .el-submenu {
        background-color: var(--system-menu-background) !important;
      }
      // .el-menu-item i, .el-menu-item-group__title, .el-submenu__title i {
      //   color: var(--system-menu-text-color);
      // }
      // .el-menu-item, .el-submenu__title{
      //   &.is-active {
      //     background-color: var(--system-primary-color) !important;
      //     color: var(--system-primary-text-color) !important;
      //     i {
      //       color: var(--system-primary-text-color) !important;
      //     }
      //     &:hover {
      //       background-color: var(--system-primary-color) !important;
      //       color: var(--system-primary-text-color) !important;
      //     }
      //   }
      //   &:hover {
      //     background-color: var(--system-menu-hover-background) !important;
      //   }
      // }
      // .el-submenu {
      //   &.is-active {
      //     >.el-submenu__title, >.el-submenu__title i {
      //       color: var(--system-menu-submenu-active-color) !important;
      //     }
      //   }
      //   .el-menu-item {
      //     background-color: var(--system-menu-children-background) !important;
      //     &.is-active {
      //       background-color: var(--system-primary-color) !important;
      //       color: var(--system-primary-text-color) !important;
      //       &:hover {
      //         background-color: var(--system-primary-color) !important;
      //         color: var(--system-primary-text-color) !important;
      //       }
      //     }
      //     &:hover {
      //       background-color: var(--system-menu-hover-background) !important;
      //     }
      //   }
      // }
      // .el-submenu {
      //   .el-submenu__title {
      //     background-color: var(--system-menu-children-background) !important;
      //     &:hover {
      //       background-color: var(--system-menu-hover-background) !important;
      //     }
      //   }
      // }
    
  



</style>
