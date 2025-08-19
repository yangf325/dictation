<template>
  <div class="input-interaction">
    <el-input
      v-model="userAnswer"
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 10 }"
      placeholder="请输入答案"
      class="auto-height-textarea"
    ></el-input>
    <div class="answer-section">
      <div v-if="showAnswer && currentQuestion">
        <h4>口诀：{{ currentQuestion.short }}</h4>
        <h4>正确答案：</h4>
        <el-tag
          v-for="(item, index) in currentQuestion.answer"
          :key="index"
          style="display: block; margin-bottom: 5px; font-size: 24px"
        >
          {{ index + 1 }}. {{ item }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-interaction {
  margin: 10px 0;
  display: flex;
  gap: 20px;
  height: calc(100vh - 200px);
}

.input-interaction > * {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.auto-height-textarea >>> .el-textarea__inner {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  font-size: 24px;
}

.answer-section {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
}

.answer-section h4 {
  margin-top: 0;
}

.el-tag {
  font-size: 16px;
  white-space: wrap;
  height: auto;
}
</style>

<script>
export default {
  name: "InputInteraction",
  props: {
    showAnswer: {
      type: Boolean,
      default: false,
    },
    currentQuestion: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      userAnswer: "",
    };
  },
  mounted() {
    // 移除 = 键监听
    // window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    // 移除对应的事件解绑
    // window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    clearAnswer() {
      this.userAnswer = "";
    },
    submitAnswer() {
      this.$emit("input-answer", this.userAnswer);
    },
    toggleAnswer() {
      this.$emit("toggle-answer", !this.showAnswer);
    },
  },
};
</script>
