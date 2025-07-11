<template>
  <div id="app">
    <FilterPanel
      @filter-changed="handleFilterChanged"
      @reset="resetFilters"
      @mode-changed="handleModeChanged"
      :chapters="uniqueChapters"
      :levels="uniqueLevels"
    />
    <!-- 移除下面这行注释 -->
    <!-- <ModeSwitcher @mode-changed="handleModeChanged" /> -->
    <QuestionDisplay
      :questions="filteredQuestions"
      :mode="currentMode"
      :currentIndex="currentIndex"
      :showAnswer="showAnswer"
      @answer-show="handleAnswerShow"
      @prev-question="prevQuestion"
      @next-question="nextQuestion"
      @random-question="randomQuestion"
      @toggle-answer="toggleAnswer"
    />
    <InputInteraction
      v-if="currentMode === 'write'"
      :show-answer="showAnswer"
      :current-question="filteredQuestions[currentIndex]"
      ref="inputInteraction"
      @input-answer="handleInputAnswer"
      @toggle-answer="toggleAnswer"
    />
  </div>
</template>

<script>
import FilterPanel from "./components/FilterPanel.vue";
import ModeSwitcher from "./components/ModeSwitcher.vue";
import QuestionDisplay from "./components/QuestionDisplay.vue";
import InputInteraction from "./components/InputInteraction.vue";
import questions from "./data.js";

export default {
  name: "App",
  components: {
    FilterPanel,
    ModeSwitcher,
    QuestionDisplay,
    InputInteraction,
  },
  data() {
    return {
      allQuestions: questions,
      filteredQuestions: [],
      currentMode: "write",
      currentFilter: { chapter: null, level: null },
      showAnswer: false,
      currentIndex: 0,
    };
  },
  created() {
    this.filterQuestions();
  },
  methods: {
    handleFilterChanged(filter) {
      console.log("接收到的筛选条件:", filter); // 添加日志
      this.currentFilter = filter;
      this.filterQuestions();
    },
    resetFilters() {
      this.currentFilter = { chapter: null, level: null };
      this.filterQuestions();
    },
    filterQuestions() {
      this.filteredQuestions = this.allQuestions.filter((question) => {
        // 处理章节筛选
        let chapterMatch = true;
        if (
          this.currentFilter.chapter &&
          this.currentFilter.chapter.length > 0
        ) {
          chapterMatch = this.currentFilter.chapter.includes(question.chapter);
        }

        // 处理级别筛选
        let levelMatch = true;
        if (this.currentFilter.level && this.currentFilter.level.length > 0) {
          levelMatch = this.currentFilter.level.includes(question.level);
        }

        return chapterMatch && levelMatch;
      });
      console.log("过滤后的题目数量:", this.filteredQuestions.length);
    },
    handleModeChanged(mode) {
      this.currentMode = mode;
    },
    handleAnswerShow(question) {
      // 这里可以添加具体的答案显示逻辑，例如弹窗展示答案等
      console.log("点击了答案:", question);
    },
    handleInputAnswer(answer) {
      // 处理输入答案逻辑
    },
    toggleAnswer(showAnswer) {
      this.showAnswer = showAnswer;
      // 移除隐藏答案时清空输入框的逻辑
      // if (!showAnswer) {
      //   // 隐藏答案时清空输入框
      //   this.$refs.inputInteraction.clearAnswer();
      // }
    },
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.$refs.inputInteraction.clearAnswer();
      }
    },
    nextQuestion() {
      if (this.currentIndex < this.filteredQuestions.length - 1) {
        this.currentIndex++;
        this.$refs.inputInteraction.clearAnswer();
      }
    },
    randomQuestion() {
      if (this.filteredQuestions.length > 0) {
        this.currentIndex = Math.floor(
          Math.random() * this.filteredQuestions.length
        );
        this.$refs.inputInteraction.clearAnswer();
      }
    },
  },
  computed: {
    uniqueChapters() {
      return [
        ...new Set(this.allQuestions.map((question) => question.chapter)),
      ];
    },
    uniqueLevels() {
      return [...new Set(this.allQuestions.map((question) => question.level))];
    },
  },
};
</script>
