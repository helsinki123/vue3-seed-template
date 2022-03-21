import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from "./router/index.js"
import './static/styles/common.scss' // 公共css
import request from "@/static/js/http.js"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { ElMessage } from 'element-plus'
import * as Icons from "@element-plus/icons-vue";
NProgress.configure({
  easing: 'ease', // 动画方式    
  speed: 500, // 递增进度条的速度    
  showSpinner: true, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})
router.beforeEach((to, _from, next) => {
  NProgress.start();
  const whiteList = ['/login']
  if (localStorage.getItem("token") || whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    ElMessage('请登录')
    router.push({ path: '/login' })
  }
});
router.afterEach((to, _from) => {
  NProgress.done();
});
const app = createApp(App)
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
app.config.globalProperties.$http = request
app.use(router)
app.use(ElementPlus)
app.mount('#app')
