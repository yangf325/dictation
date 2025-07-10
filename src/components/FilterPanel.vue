<template>
  <div class="filter-panel el-card">
    <div class="el-form-item">
      <label class="el-form-item__label">章节筛选</label>
      <select v-model="filter.chapter" class="el-select">
        <option value="null" class="el-option">所有章节</option>
        <option v-for="chapter in chapters" :key="chapter" :value="chapter" class="el-option">{{ chapter }}</option>
      </select>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label">级别筛选</label>
      <select v-model="filter.level" class="el-select">
        <option value="null" class="el-option">所有级别</option>
        <option v-for="level in levels" :key="level" :value="level" class="el-option">{{ level }}</option>
      </select>
    </div>
    <div class="el-form-item">
      <button @click="reset" class="el-button el-button--default">重置筛选</button>
      <button @click="applyFilter" class="el-button el-button--primary">应用筛选</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterPanel',
  props: ['initialFilter'],
  data() {
    return {
      filter: { chapter: null, level: null },
      chapters: [1, 2, 3], // 示例章节数据，实际使用时替换为真实数据
      levels: [1, 2, 3] // 示例级别数据，实际使用时替换为真实数据
    }
  },
  methods: {
    applyFilter() {
      this.$emit('filter-changed', {
        chapter: this.filter.chapter === 'null' ? null : Number(this.filter.chapter),
        level: this.filter.level === 'null' ? null : Number(this.filter.level)
      })
    },
    reset() {
      this.filter = { chapter: null, level: null }
      this.$emit('reset')
    }
  }
}
</script>

<style scoped>
.filter-panel {
  padding: 20px;
}
.el-form-item {
  margin-bottom: 22px;
  display: inline-block;
  margin-right: 20px;
}
.el-select {
  width: 180px;
}
</style>