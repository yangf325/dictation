<template>
  <div class="question-display">
    <div v-if="mode === 'write'" tabindex="0">
      <div class="ask-wrap">
        <div class="question-header">
          <div class="level-tags">
            <el-tag
              v-if="currentQuestion?.level === 1"
              style="background-color: #c00000; color: #fff"
              >必备</el-tag
            >
            <el-tag
              v-if="currentQuestion?.level === 2"
              style="background-color: #9933ff; color: #fff"
              >重要</el-tag
            >
            <el-tag
              v-if="currentQuestion?.level === 3"
              style="background-color: #ffcc00; color: #fff"
              >可选</el-tag
            >
          </div>
          <div class="progress-info">
            {{ currentIndex + 1 }}/{{ questions.length }}
          </div>
          <span class="question-title">{{ currentQuestion?.title || "" }}</span>
        </div>
        <div class="action-buttons">
          <el-button @click="$emit('first-question')" size="small"
            >第一题</el-button
          >
          <el-button @click="$emit('prev-question')" size="small"
            >+上题+</el-button
          >
          <el-button @click="$emit('random-question')" size="small"
            >*随机*</el-button
          >
          <el-button @click="$emit('next-question')" size="small"
            >-下题-</el-button
          >
          <el-button @click="$emit('toggle-answer', !showAnswer)" size="small"
            >=答案=</el-button
          >
        </div>
      </div>
    </div>
    <!-- 仅在非默写模式显示背诵卡片 -->
    <div v-else class="card-grid">
      <el-card
        v-for="(item, index) in questions"
        :key="index"
        shadow="hover"
        class="question-card"
      >
        <div class="card-header">
          <div class="title-container">
            <span class="card-title">{{ index + 1 }}.{{ item.title }}</span>
            <div class="card-short" v-if="item.short">{{ item.short }}</div>
          </div>
          <div class="card-level-tags">
            <el-tag
              v-if="item.level === 1"
              style="background-color: #c00000; color: #fff"
              >必备</el-tag
            >
            <el-tag
              v-if="item.level === 2"
              style="background-color: #9933ff; color: #fff"
              >重要</el-tag
            >
            <el-tag
              v-if="item.level === 3"
              style="background-color: #ffcc00; color: #fff"
              >可选</el-tag
            >
          </div>
        </div>
        <div class="card-answers">
          <div
            v-for="(ans, ansIndex) in item.answer"
            :key="ansIndex"
            class="answer-item"
          >
            {{ ansIndex + 1 }}. {{ ans }}
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionDisplay",
  props: {
    questions: {
      type: Array,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    showAnswer: {
      type: Boolean,
      required: true,
    },
    isRandom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeNames: [], // 控制折叠面板展开状态
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex];
    },
  },
  methods: {
    handleAnswerClick() {
      this.$emit("toggle-answer", !this.showAnswer);
    },
    // 移除 handleMouseDown 方法
    handleKeyDown(event) {
      const keys = ["+", "*", "-", "="];
      if (keys.includes(event.key)) {
        event.preventDefault();
        if (event.key === "+") {
          // / 键
          this.$emit("prev-question");
        } else if (event.key === "*") {
          // * 键
          this.$emit("random-question");
        } else if (event.key === "-") {
          // - 键
          this.$emit("next-question");
        } else if (event.key === "=") {
          // = 键
          this.$emit("toggle-answer", !this.showAnswer);
        } else if (event.key === "Home") {
          //home jian
          // this.$emit("first-question");
        }
      }
    },
  },
  mounted() {
    if (this.mode === "write") {
      document.addEventListener("keydown", this.handleKeyDown);
      this.$el.focus();
    }
  },
  beforeUnmount() {
    if (this.mode === "write") {
      document.removeEventListener("keydown", this.handleKeyDown);
    }
  },
};
</script>

<style>
.question-display {
  padding: 10px 0 0 0;
}
.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.question-title {
  font-size: 20px;
  font-weight: bold;
}
.level-tags {
  display: flex;
  gap: 5px;
}
.progress-info {
  margin: 10px 0;
  color: #666;
}
.action-buttons {
  display: flex;
  gap: 10px;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
}
.question-card {
  min-height: 200px;
  padding: 5px; 
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 5px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 5px;
}
.title-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.card-short {
  font-size: 14px;
  color: #666;
  font-style: italic;
}
.card-index {
  margin-right: 5px;
  font-weight: bold;
}
.card-title {
  font-weight: bold;
  font-size: 20px; /* 降低标题字体大小 */
}
.card-level-tags {
  display: flex;
  gap: 5px;
}
.card-answers {
  max-height: 180px;
  overflow-y: auto;
  padding: 5px; /* 减少答案区域内边距 */
  margin-top: 5px; /* 减少答案区域上边距 */
  background-color: #f5f7fa;
  border-radius: 4px;
}
.answer-item {
  margin-bottom: 3px; /* 减少答案项之间的间隙 */
  font-size: 18px;
}
/* 减小 el-card__body 与父元素的间隙 */
.question-display .el-card__body {
  padding: 10px !important;
}
.question-card {
  min-height: 200px;
  padding: 5px; /* 进一步减少卡片内边距 */
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 8px; /* 再次缩小卡片之间的间隙 */
}
.ask-wrap {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  display: flex;
  padding: 20px;
}
.question-header {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  margin: 0;
}
.progress-info {
  margin: 0 10px;
}
</style>
