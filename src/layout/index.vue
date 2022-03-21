<template>
  <el-container style="height: 100vh">
    <el-aside :width="isCollapse ? '60px' : '200px'">
      <el-scrollbar>
        <el-menu
          :router="openRoute"
          :collapse="isCollapse"
          class="layout-menu"
          background-color="var(--system-menu-background)"
          text-color="var(--system-menu-text-color)"
          active-text-color="var(--system-primary-color)"
        >
          <el-menu-item index="/dashboard" class="home">
            <h1>XXX管理系统Home</h1>
          </el-menu-item>
          <template v-for="menu in menuData">
            <menuTree
              v-if="menu.children.length > 0"
              :key="menu.index"
              :menu="menu"
            ></menuTree>
          </template>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 用户信息 -->
        <div class="head-left flex" >
          <div class="flex center control-menu" @click="opendStateChange">
            <el-icon v-if="isCollapse"><expand /></el-icon>
            <el-icon v-else><fold /></el-icon>
          </div>
          <div><breadcrumb></breadcrumb></div>
        </div>
        <div class="user-info">
          <el-dropdown>
            <span class="el-dropdown-link">
              管理员
              <el-icon><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <hr />
      <div class="navTag">
        <!-- <div v-for="item in menuList" :key="item.path">
              {{ item.meta.title }}
            </div> -->
        <el-tag
          v-for="tag in menuList"
          :key="tag.name"
          class="mx-1"
          closable
          :type="tag.type"
          @close="handleClose(tag)"
        >
          <router-link :to="tag.path">
            {{ tag.meta.title }}
          </router-link>
        </el-tag>
      </div>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref, reactive, getCurrentInstance, watch, onMounted } from "vue";
import menuTree from "./childMenu.vue";
import breadcrumb from "@comps/breadCumb/index.vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "menufather",
  components: {
    menuTree,
    breadcrumb,
  },
  props: {},
  setup() {
    let isCollapse = ref(true);
    function opendStateChange() {
      isCollapse.value = !isCollapse.value;
    }
    function loginOut() {
      alert("bye bye");
      localStorage.removeItem("token");
      router.push("/login");
    }
    function handleClose(tag) {
      menuList.value.forEach((item, index) => {
        if (item.path === tag.path) {
          menuList.value.splice(index, 1);
        }
      });
      // menuList.value.splice()
    }
    const route = useRoute();
    const router = useRouter();
    const currentRoute = ref(router.currentRoute.value.path);
    watch(
      () => route,
      (newValue, oldValue) => {
      }
    );
    const openRoute = true;
    // 访问 globalProperties
    const internalInstance = getCurrentInstance();
    function testAjax() {
      internalInstance.appContext.config.globalProperties.$http
        .get("/api/shop/goods/category/all")
        .then((res) => {});
    }
    let menuList = ref([]);
    const defaultMenu = {
      path: "/dashboard",
      meta: { title: "首页", hideClose: true },
    };
    if (menuList.value.length === 0) {
      // 判断之前有没有调用过
      addMenu(defaultMenu);
    }
    // 添加新的菜单项
    function addMenu(menu) {
      let { path, meta, name } = menu;
      if (meta.hideTabs) {
        return;
      }

      let hasMenu = menuList.value.some((obj) => {
        return obj.path === path;
      });
      if (!hasMenu) {
        menuList.value.push({
          path,
          meta,
          name,
        });
      }
    }
    router.afterEach((to, from) => {
      addMenu(route);
    });
    const menuData = reactive([
      {
        index: "1",
        name: "crudTable",
        icon: "",
        children: [
          {
            index: "1-1",
            name: "crudTable",
            path: "/pages/crudTable",
            children: [],
          },
        ],
      },
      {
        index: "2",
        name: "crudTableCopy",
        icon: "",
        path: "",
        children: [
          {
            index: "2-1",
            name: "crudTableCopy",
            path: "/pages/crudTableCopy",
            children: [],
          },
        ],
      },
      {
        index: "3",
        name: "DIYpage",
        icon: "",
        path: "",
        children: [
          {
            index: "3-1",
            name: "DIYpage",
            path: "/pages/DIYpage",
            children: [],
          },
        ],
      },
    ]);
    return {
      openRoute,
      testAjax,
      menuData,
      menuList,
      defaultMenu,
      addMenu,
      handleClose,
      currentRoute,
      loginOut,
      opendStateChange,
      isCollapse,
    };
  },
};
</script>
<style lang="scss" scoped>
.common-layout {
  height: 100vh;
}
.el-scrollbar {
  background-color: var(--system-menu-background);
}
.layout-menu {
  width: 100%;
  &.collapse {
    margin-left: 0px;
  }
  :deep() {
    .el-menu-item,
    .el-sub-menu {
      background-color: var(--system-menu-background) !important;
    }
    .el-menu-item i,
    .el-menu-item-group__title,
    .el-submenu__title i {
      color: var(--system-menu-text-color);
    }
    .el-menu-item,
    .el-submenu__title {
      &.is-active {
        background-color: var(--system-primary-color) !important;
        color: var(--system-primary-text-color) !important;
        i {
          color: var(--system-primary-text-color) !important;
        }
        &:hover {
          background-color: var(--system-primary-color) !important;
          color: var(--system-primary-text-color) !important;
        }
      }
      &:hover {
        background-color: var(--system-menu-hover-background) !important;
      }
    }
    .el-submenu {
      &.is-active {
        > .el-submenu__title,
        > .el-submenu__title i {
          color: var(--system-menu-submenu-active-color) !important;
        }
      }
      .el-menu-item {
        background-color: var(--system-menu-children-background) !important;
        &.is-active {
          background-color: var(--system-primary-color) !important;
          color: var(--system-primary-text-color) !important;
          &:hover {
            background-color: var(--system-primary-color) !important;
            color: var(--system-primary-text-color) !important;
          }
        }
        &:hover {
          background-color: var(--system-menu-hover-background) !important;
        }
      }
    }
    .el-submenu {
      .el-submenu__title {
        background-color: var(--system-menu-children-background) !important;
        &:hover {
          background-color: var(--system-menu-hover-background) !important;
        }
      }
    }
  }
}

.home {
  color: white;
  display: flex;
  justify-content: center;
}
.el-main {
  // border: 1px solid black;
  background-color: var(--system-container-background);
  // margin: 10px;
  padding: 0;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: var(--system-header-background);
  padding-right: 22px;
  .head-left{
.control-menu{
  padding: 0 10px;
}
  }
}
.right-box {
  display: flex;
  justify-content: center;
  align-items: center;
  .function-list {
    display: flex;
    .function-list-item {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      :deep(i) {
        color: var(--system-header-text-color);
      }
    }
  }
  .user-info {
    margin-left: 20px;
    .el-dropdown-link {
      color: var(--system-header-breadcrumb-text-color);
    }
  }
}
.wrap {
  width: 200px;
  height: 100vh;
  // background-color: aqua;
  .el-menu {
    height: 100%;
  }
}
// p {
//   width: 200px;
//   height: 200px;
//   margin-top: 50px;
//   background-color: aqua;
// }
.navTag {
  text-align: left;
  padding-left: 20px;
  height: 34px;
  line-height: 34px;
}
</style>
