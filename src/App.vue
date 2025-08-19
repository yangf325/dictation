<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// 移除所有导入和组件定义，因为这些应该在路由组件中处理

export default {
  name: 'App',
  created() {
    // 在created钩子中就检查验证状态，而不是等到mounted
    if (process.env.NODE_ENV === 'production') {
      const isVerified = localStorage.getItem('passwordVerified') === 'true';
      if (!isVerified && this.$route.path !== '/password') {
        this.$router.push('/password');
      } else if (isVerified && this.$route.path === '/password') {
        // 如果已经验证通过但仍在密码页面，则重定向到首页
        this.$router.push('/');
      }
    }
  },
  mounted() {
    // 可以保留mounted钩子，作为双重保险
    if (process.env.NODE_ENV === 'production') {
      const isVerified = localStorage.getItem('passwordVerified') === 'true';
      if (!isVerified && this.$route.path !== '/password') {
        this.$router.push('/password');
      } else if (isVerified && this.$route.path === '/password') {
        this.$router.push('/');
      }
    }
  }
}
</script>
