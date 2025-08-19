<template>
  <div class="password-prompt">
    <div class="password-container">
      <h2>请输入访问密码</h2>
      <el-input
        type="password"
        v-model="password"
        placeholder="输入密码"
        @keyup.enter="checkPassword"
      ></el-input>
      <el-button type="primary" @click="checkPassword" style="margin-top: 20px">确定</el-button>
      <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordPrompt',
  data() {
    return {
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    checkPassword() {
      // 这里设置你的密码，可以设置多个密码
      const validPasswords = ['66'];
      
      if (validPasswords.includes(this.password)) {
        // 密码正确，设置本地存储标记
        localStorage.setItem('passwordVerified', 'true');
        
        // 获取之前保存的路径，如果不存在则默认为'/'
        const previousPath = localStorage.getItem('previousPath') || '/';
        this.$router.push(previousPath);
      } else {
        this.errorMsg = '密码错误，请重试';
        setTimeout(() => {
          this.errorMsg = '';
        }, 2000);
      }
    }
  }
}
</script>

<style scoped>
.password-prompt {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.password-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 10px;
}
</style>