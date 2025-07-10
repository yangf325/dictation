<template>
  <div class="question-display">
    <el-card v-if="mode === 'write'" shadow="hover">
      <h3>{{ currentQuestion.title }}</h3>
      <el-button v-if="showAnswer" type="info" size="small">查看答案</el-button>
      <el-button @click="prevQuestion" size="small">上一题</el-button>
      <el-button @click="nextQuestion" size="small">下一题</el-button>
    </el-card>
    <el-card v-else shadow="hover">
      <el-list :data="questions">
        <el-list-item v-for="item in questions" :key="item.id">{{ item.title }}</el-list-item>
      </el-list>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'QuestionDisplay',
  props: ['questions', 'mode'],
  data() {
    return {
      currentIndex: 0,
      showAnswer: false
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex]
    }
  },
  methods: {
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--
        this.$emit('prev-question')
      }
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++
        this.$emit('next-question')
      }
    }
  }
}
</script>

<style scoped>
.question-display {
  margin: 20px 0;
}
</style>