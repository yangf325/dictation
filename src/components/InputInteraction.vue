<template>
  <div class="input-interaction">
    <el-input
      v-model="userAnswer"
      type="textarea"
      :rows="8" 
      placeholder="请输入答案"
    ></el-input>
    <div class="answer-section"> <!-- 移除 v-if 条件，确保始终占位 -->
      <div v-if="showAnswer && currentQuestion">
        <h4>正确答案：</h4>
        <el-tag
          v-for="(item, index) in currentQuestion.answer"
          :key="index"
          style="display: block; margin-bottom: 5px"
        >
          {{ item }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

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
    }
  },
};
</script>

<style scoped>
.input-interaction {
  margin: 20px 0;
  display: flex;
  gap: 20px;
}
.input-interaction > * {
  flex: 1;
}
.answer-section {
  margin-top: 0;
  border: 1px solid #dcdfe6; /* 添加边框 */
  border-radius: 4px; /* 边框圆角 */
  min-height: 120px; /* 设置最小高度，确保不展示答案时也占位 */
  padding: 10px; /* 添加内边距 */
}
.answer-section h4 {
  margin-top: 0;
}
</style>
