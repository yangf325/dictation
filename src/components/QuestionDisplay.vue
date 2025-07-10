<template>
  <div class="question-display">
    <el-card v-if="mode === 'write'" shadow="hover">
      <span class="span-title">{{ currentQuestion.title }}</span>
      <el-button v-if="showAnswer" type="info" size="small">查看答案</el-button>
      <el-button @click="$emit('prev-question')" size="small">上一题</el-button>
      <el-button @click="$emit('next-question')" size="small">下一题</el-button>
    </el-card>
    <el-card v-else shadow="hover">
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item, index) in questions" :key="index" :name="index.toString()">
          <template #title>
            {{ item.title }}
          </template>
          <div class="answer-content">
            <el-tag v-for="(ans, ansIndex) in item.answer" :key="ansIndex" style="margin: 5px;">
              {{ ans }}
            </el-tag>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'QuestionDisplay',
  props: ['questions', 'mode', 'currentIndex', 'showAnswer'],
  data() {
    return {
      activeNames: [] // 控制折叠面板展开状态
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex]
    }
  }
}
</script>

<style scoped>
.question-display {
  margin: 20px 0;
}
.span-title {
  margin-right: 20px;
  display: inline-block;
}
.answer-content {
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
.el-collapse-item__header {
  font-weight: bold;
}
</style>