<template>
  <div class="mode-switcher">
    <el-radio-group v-model="currentMode" @change="handleChange">
      <el-radio-button label="write">默写模式</el-radio-button>
      <el-radio-button label="recite">背诵模式</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'ModeSwitcher',
  data() {
    return {
      currentMode: 'write'
    }
  },
  methods: {
    handleChange(mode) {
      this.$emit('mode-changed', mode)
    }
  }
}
</script>

<style scoped>
.mode-switcher {
  margin: 20px 0;
}
</style>