<template>
  <div class="login-module">
    <div class="login-block">
      <h1>账号密码登录</h1>
      <el-form
        ref="loginMsgForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="off"
        label-position="left"
      >
        <el-form-item prop="userName">
          <el-input 
            v-model="loginForm.userName"
            type="text"
            auto-complete="off"
            clearable
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input 
            v-model="loginForm.passWord"
            type="text"
            auto-complete="off"
            placeholder="请输入密码"
            clearable
          />
        </el-form-item>
      </el-form>  
      <div>  
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </div>    
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
       userName: '',
       passWord: ''
      },
      loginRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
   }
  },
  methods: {
    // 登录
    handleLogin() {
      this.$refs.loginMsgForm.validate(async valid => {
         if (valid) {
           const result = await login({
            account: this.loginForm.userName.trim(),
            // password: CiphertextEncrypt.encrypt({
            //   type: "base64",
            //   ciphertext: this.loginForm.passWord.trim()
            // }),
            password: this.loginForm.passWord.trim(),
            device_type: 2
          });
          console.log(result)
         } else {
           return false;
         }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-module {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-block {
    width: 460px;
    height: 540px;
    padding: 40px;
    box-shadow: 0px 25px 88px 0px rgba(11,15,53,0.08);
    border-radius: 5px;
    box-sizing: border-box;
    /deep/
    .login-form {
      .el-input {
        width: 100%;
        box-sizing: border-box;
        border-radius: 5px;
        margin-bottom: 20px;
        .el-input__inner {
          padding-left: 40px;
          padding-right: 30px;
          height: 50px;
          line-height: 50px;
          color: #879cbb;
          box-sizing: border-box;
          width: 100%;
        }
      }
    }
  }
}
</style>