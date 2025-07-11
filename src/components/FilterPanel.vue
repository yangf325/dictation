<template>
  <div class="filter-panel el-card">
    <div class="el-form-item">
      <label class="el-form-item__label">章节筛选</label>
      <!-- 使用 Element UI 组件语法 -->
      <el-select v-model="filter.chapter" placeholder="所有章节" @change="applyFilter">
        <el-option label="所有章节" value="null"></el-option>
        <el-option v-for="chapter in chapters" :key="chapter" :label="chapter" :value="chapter"></el-option>
      </el-select>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label">级别筛选</label>
      <!-- 使用 Element UI 组件语法 -->
      <el-select v-model="filter.level" placeholder="所有级别" @change="applyFilter">
        <el-option label="所有级别" value="null"></el-option>
        <el-option v-for="level in levels" :key="level" :label="level" :value="level"></el-option>
      </el-select>
    </div>
    <div class="el-form-item">
      <el-button @click="reset" type="default">重置筛选</el-button>
      <!-- 移除应用筛选按钮 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterPanel',
  props: ['initialFilter', 'chapters', 'levels'],
  data() {
    return {
      filter: { chapter: null, level: null }
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