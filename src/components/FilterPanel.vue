<template>
  <div class="filter-panel el-card">
    <div class="el-form-item">
      <label class="el-form-item__label">章节筛选</label>
      <el-select
        v-model="filter.chapter"
        multiple
        filterable
        allow-create
        placeholder="选择章节"
        @change="applyFilter"
      >
        <!-- 确保没有全选选项 -->
        <el-option v-for="chapter in chapters" :key="chapter" :label="chapter" :value="chapter"></el-option>
      </el-select>
      <!-- 恢复全选按钮 -->
      <el-button @click="selectAll('chapter')" size="small">全选</el-button>
      <el-button @click="clearSelection('chapter')" size="small">清空</el-button>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label">级别筛选</label>
      <el-select
        v-model="filter.level"
        multiple
        filterable
        allow-create
        placeholder="选择级别"
        @change="applyFilter"
      >
        <!-- 确保没有全选选项 -->
        <el-option v-for="level in levels" :key="level" :label="level" :value="level"></el-option>
      </el-select>
      <!-- 恢复全选按钮 -->
      <el-button @click="selectAll('level')" size="small">全选</el-button>
      <el-button @click="clearSelection('level')" size="small">清空</el-button>
    </div>
    <!-- 移除模式切换组件 -->
    <div class="el-form-item">
      <el-button @click="reset" type="default">重置筛选</el-button>
    </div>
  </div>
</template>

<script>
// 移除 ModeSwitcher 导入

export default {
  name: 'FilterPanel',
  // 移除 ModeSwitcher 组件注册
  props: ['initialFilter', 'chapters', 'levels'],
  data() {
    return {
      filter: { chapter: [], level: [] }
    }
  },
  methods: {
    applyFilter() {
      const chapter = this.filter.chapter.includes('all') ? null : this.filter.chapter.length > 0 ? this.filter.chapter.map(Number) : null;
      const level = this.filter.level.includes('all') ? null : this.filter.level.length > 0 ? this.filter.level.map(Number) : null;
      console.log('即将发送的筛选条件:', { chapter, level }); // 添加日志
      this.$emit('filter-changed', { chapter, level });
    },
    selectAll(type) {
      if (type === 'chapter') {
        this.filter.chapter = [...this.chapters].map(Number);
      } else {
        this.filter.level = [...this.levels].map(Number);
      }
      this.applyFilter();
    },
    clearSelection(type) {
      if (type === 'chapter') {
        this.filter.chapter = [];
      } else {
        this.filter.level = [];
      }
      this.applyFilter();
    },
    reset() {
      this.filter = { chapter: [], level: [] };
      this.$emit('reset');
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
  width: 300px; /* 选择框拉长自适应 */
}
.el-button {
  margin-left: 10px; /* 跟全选按钮增加间隙 */
}
</style>