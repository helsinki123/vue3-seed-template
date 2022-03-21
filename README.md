# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

```
在 Vite2 与 Vue3 中使用Mockjs
1. 安装mockjs

npm install mockjs --save-dev
2. 安装vite-plugin-mock

npm i vite-plugin-mock cross-env -D
3.在 package.json 中设置环境变量

复制代码
{
    "scripts": {
        // 修改dev构建脚本的命令
        "dev": "cross-env NODE_ENV=development vite",
        "build": "vite build",
        "serve": "vite preview"
    }
}
复制代码
4.在 vite.config.js 中添加 mockjs 插件

复制代码
import vue from "@vitejs/plugin-vue"
import { viteMockServe } from "vite-plugin-mock"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        vue(),
        viteMockServe({
            supportTs: true     //如果使用 js发开，则需要配置 supportTs 为 false
        })
    ]
})
复制代码
5.在项目中根目录创建 mock 文件夹，建立getUsers.ts在其中创建需要的数据接口

复制代码
// 仅做示例: 通过GET请求返回一个名字数组
export default [
    {
        url: "/api/getUsers",
        method: "get",
        response: () => {
            return {
                code: 0,
                message: "ok",
                data: ["tom", "jerry"],
            }
        }
    }
]
复制代码
 6. 修改App.vue，请求接口，显示数据

 

复制代码
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div v-for="(item,index) in users">
    {{index+1}}-{{item}}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios"

export default defineComponent({
  name: 'App',
  setup() {
    let users = ref([])

    onMounted(()=>{
      axios.get(`/api/getUsers`).then(res=>{
        users.value = res.data.data
        console.log('users', users)
      }).catch(err=>{
        console.log(err)
      })
    })

    return { users }
  }
})
</script>
```