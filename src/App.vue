<template>
  <div id="app">
    <FilterPanel 
      @filter-changed="handleFilterChanged" 
      @reset="resetFilters"
      :chapters="uniqueChapters"
      :levels="uniqueLevels"
    />
    <ModeSwitcher @mode-changed="handleModeChanged" />
    <QuestionDisplay
      :questions="filteredQuestions"
      :mode="currentMode"
      :currentIndex="currentIndex"
      :showAnswer="showAnswer"
      @answer-show="handleAnswerShow"
      @prev-question="prevQuestion"
      @next-question="nextQuestion"
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
import allQuestions from "./data.js";

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
      allQuestions: allQuestions,
      filteredQuestions: [],
      currentMode: "write", // write: 默写模式, recite: 背诵模式
      currentFilter: { chapter: null, level: null },
      showAnswer: false,
      currentIndex: 0
    }
  },
  created() {
    this.filterQuestions();
  },
  methods: {
    handleFilterChanged(filter) {
      this.currentFilter = filter;
      this.filterQuestions();
    },
    resetFilters() {
      this.currentFilter = { chapter: null, level: null };
      this.filterQuestions();
    },
    filterQuestions() {
      this.filteredQuestions = this.allQuestions.filter((question) => {
        const chapterMatch =
          !this.currentFilter.chapter ||
          question.chapter === this.currentFilter.chapter;
        const levelMatch =
          !this.currentFilter.level ||
          question.level === this.currentFilter.level;
        return chapterMatch && levelMatch;
      });
    },
    handleModeChanged(mode) {
      this.currentMode = mode;
    },
    handleAnswerShow(questionId) {
      // 处理显示答案逻辑
    },
    handleInputAnswer(answer) {
      // 处理输入答案逻辑
    },
    toggleAnswer(showAnswer) {
      this.showAnswer = showAnswer;
      if (!showAnswer) {
        // 隐藏答案时清空输入框
        this.$refs.inputInteraction.clearAnswer();
      }
    },
    prevQuestion() {
      if (this.currentIndex > 0) this.currentIndex--
    },
    nextQuestion() {
      if (this.currentIndex < this.filteredQuestions.length - 1) this.currentIndex++
    }
  },
  computed: {
    uniqueChapters() {
      return [...new Set(this.allQuestions.map(question => question.chapter))];
    },
    uniqueLevels() {
      return [...new Set(this.allQuestions.map(question => question.level))];
    }
  }
}
</script>
