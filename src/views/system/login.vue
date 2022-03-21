<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">WELCOME</p>
            <div class="input-c">
                <el-input v-model="account" placeholder="用户名" clearable @on-blur="verifyAccount" />
                <p class="error">{{accountError}}</p>
            </div>
            <div class="input-c">
                <el-input type="password" v-model="pwd"  placeholder="密码" clearable @on-blur="verifyPwd"
                @keyup.enter="submit" />
                <p class="error">{{pwdError}}</p>
            </div>
            <el-button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</el-button>
            <p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p>
        </div>
    </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
export default {
    name: 'login',
    data() {
        return {
            account: 'admin',
            pwd: 'admin',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            bg: {},
        }
    },
    created() {
        // this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
    },
    watch: {
        $route: {
            handler(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        },
    },
    methods: {
        verifyAccount() {
            if (this.account !== 'admin') {
                this.accountError = '账号为admin'
            } else {
                this.accountError = ''
            }
        },
        verifyPwd() {
            if (this.pwd !== 'admin') {
                this.pwdError = '密码为admin'
            } else {
                this.pwdError = ''
            }
        },
        register() {

        },
        forgetPwd() {

        },
        submit() {
            if (this.account === 'admin' && this.pwd === 'admin') {
                this.isShowLoading = true
                // 登陆成功 设置用户信息
                localStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4')
                localStorage.setItem('userName', '小明')
                // 登陆成功 假设这里是后台返回的 token
                localStorage.setItem('token', 'i_am_token')
                this.$router.push({ path: this.redirect || '/' })
            } else {
                if (this.account !== 'admin') {
                    this.accountError = '账号为admin'
                }

                if (this.pwd !== 'admin') {
                    this.pwdError = '密码为admin'
                }
            }
        },
    },
}
</script>

<style>
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: url("https://th.bing.com/th/id/R.39dcd664bde64afcff6a731a8c37e8b9?rik=EpNMTURFbfMutQ&pid=ImgRaw&r=0") no-repeat;
    background-size:100% 100%;

}
.login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}
.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}
.login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
}
.login-vue .input-c {
    margin: auto;
    width: 200px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .submit {
    width: 200px;
}
.login-vue .account {
    margin-top: 30px;
}
.login-vue .account span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
</style>
