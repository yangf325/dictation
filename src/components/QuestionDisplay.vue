<template>
  <div class="question-display">
    <el-card v-if="mode === 'write'" shadow="hover">
      <span class="span-title">{{ currentQuestion.title }}</span>
      <!-- 通过内联样式控制透明度 -->
      <span :style="{ opacity: isRandom ? 0 : 1 }">{{ currentIndex + 1 }}/{{ questions.length }}</span>
      <el-button @click="$emit('prev-question')" size="small">上题</el-button>
      <el-button @click="$emit('next-question')" size="small">下题</el-button>
      <el-button @click="$emit('random-question')" size="small">随机</el-button>
      <el-button @click="$emit('toggle-answer', !showAnswer)" size="small">=答案=</el-button>
    </el-card>
    <el-card v-else shadow="hover">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(item, index) in questions"
          :key="index"
          :name="index.toString()"
        >
          <template #title>
            {{ item.title }}
          </template>
          <div class="answer-content">
            <el-tag
              v-for="(ans, ansIndex) in item.answer"
              :key="ansIndex"
              style="margin: 5px"
              @click="handleAnswerClick"
            >
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
  props: {
    questions: {
      type: Array,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    showAnswer: {
      type: Boolean,
      required: true
    },
    isRandom: {
      type: Boolean,
      default: false
    }
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
      this.$emit('toggle-answer', !this.showAnswer);
    }
  }
};
</script>

<style scoped>
.question-display {
  margin: 20px 0;
}
.span-title {
  width: 60%;
  margin-right: 20px;
  display: inline-block;
}
/* 添加进度样式 */
span {
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
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
