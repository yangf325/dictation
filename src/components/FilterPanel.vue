<template>
  <div class="filter-panel el-card" style="position: relative">
    <!-- 章节筛选部分 -->
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
        <el-option
          v-for="chapter in chapters"
          :key="chapter"
          :label="chapter"
          :value="chapter"
        ></el-option>
      </el-select>
      <el-button @click="selectAll('chapter')" size="small">全选</el-button>
      <el-button @click="clearSelection('chapter')" size="small"
        >清空</el-button
      >
    </div>
    <!-- 级别筛选部分 -->
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
        <el-option
          v-for="level in levels"
          :key="level"
          :label="level"
          :value="level"
        ></el-option>
      </el-select>
      <el-button @click="selectAll('level')" size="small">全选</el-button>
      <el-button @click="clearSelection('level')" size="small">清空</el-button>
    </div>
    <!-- 移除多余的模式切换组件，并在合适位置添加以下代码 -->
    <div class="mode-switcher-container">
      <ModeSwitcher
        class="mode-switcher-original"
        @mode-changed="$emit('mode-changed', $event)"
      />
    </div>
  </div>
</template>

<script>
import ModeSwitcher from "./ModeSwitcher.vue";

export default {
  name: "FilterPanel",
  components: {
    ModeSwitcher,
  },
  props: ["initialFilter", "chapters", "levels"],
  data() {
    return {
      filter: { chapter: [], level: [] },
    };
  },
  methods: {
    applyFilter() {
      const chapter = this.filter.chapter.includes("all")
        ? null
        : this.filter.chapter.length > 0
        ? this.filter.chapter.map(Number)
        : null;
      const level = this.filter.level.includes("all")
        ? null
        : this.filter.level.length > 0
        ? this.filter.level.map(Number)
        : null;
      console.log("即将发送的筛选条件:", { chapter, level });
      this.$emit("filter-changed", { chapter, level });
    },
    selectAll(type) {
      if (type === "chapter") {
        this.filter.chapter = [...this.chapters].map(Number);
      } else {
        this.filter.level = [...this.levels].map(Number);
      }
      this.applyFilter();
    },
    clearSelection(type) {
      if (type === "chapter") {
        this.filter.chapter = [];
      } else {
        this.filter.level = [];
      }
      this.applyFilter();
    },
    reset() {
      this.filter = { chapter: [], level: [] };
      this.$emit("reset");
    },
  },
};
</script>

<style scoped>
.filter-panel {
  padding: 20px 20px 0 20px;
  position: relative; /* 为绝对定位子元素创建定位上下文 */
}
.el-form-item {
  margin-bottom: 22px;
  display: block;
  margin-right: 20px;
}
.el-select {
  width: 300px;
}
.el-button {
  margin-left: 10px;
}
.mode-switcher-container {
  position: absolute;
  top: 20px; /* 与章节筛选对齐，根据 padding 调整 */
  right: 20px; /* 距离右侧 20px */
}
</style>
