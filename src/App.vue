<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// 移除所有导入和组件定义，因为这些应该在路由组件中处理

export default {
  name: 'App',
  mounted() {
    // 生产环境下检查密码验证状态
    if (process.env.NODE_ENV === 'production') {
      const isVerified = localStorage.getItem('passwordVerified') === 'true';
      if (!isVerified && this.$route.path !== '/password') {
        this.$router.push('/password');
      }
    }
  }
}
</script>
