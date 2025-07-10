<template>
  <div class="input-interaction">
    <el-input
      v-model="userAnswer"
      type="textarea"
      :rows="4"
      placeholder="请输入答案"
    ></el-input>
    <div class="div"></div>
    <el-button type="primary" @click="submitAnswer">提交答案</el-button>
    <el-button @click="toggleAnswer">切换答案显示</el-button>
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
  methods: {
    submitAnswer() {
      this.$emit("input-answer", this.userAnswer);
    },
    toggleAnswer() {
      this.$emit("toggle-answer", !this.showAnswer);
    },
    clearAnswer() {
      this.userAnswer = "";
    },
  },
};
</script>

<style scoped>
.input-interaction {
  margin: 20px 0;
  .div {
    margin-top: 10px;
  }
}
</style>
