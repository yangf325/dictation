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
      @first-question="firstQuestion"
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
import questions from "./datas/data.js";
import chapter5Questions from "./datas/data5.js";
import chapter6Questions from "./datas/data6.js";
import chapter7Questions from "./datas/data7.js";
import chapter8Questions from "./datas/data8.js";
import chapter9to11Questions from "./datas/data9.js";
import chapter12Questions from "./datas/data12.js";
import chapter13Questions from "./datas/data13.js";
import chapter14Questions from "./datas/data14.js";
import chapter15Questions from "./datas/data15.js";
import chapter16Questions from "./datas/data16.js";
import chapter17Questions from "./datas/data17.js";
import chapter18Questions from "./datas/data18.js";
import chapter19Questions from "./datas/data19.js";
import chapter20Questions from "./datas/data20.js";
import chapter21Questions from "./datas/data21.js";
import chapter22Questions from "./datas/data22.js";
import chapter23Questions from "./datas/data23.js";

console.log("chapter12Questions", chapter12Questions);

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
      allQuestions: [
        ...questions,
        ...chapter5Questions,
        ...chapter6Questions,
        ...chapter7Questions,
        ...chapter8Questions,
        ...chapter9to11Questions,
        ...chapter12Questions,
        ...chapter13Questions,
        ...chapter14Questions,
        ...chapter15Questions,
        ...chapter16Questions,
        ...chapter17Questions,
        ...chapter18Questions,
        ...chapter19Questions,
        ...chapter20Questions,
        ...chapter21Questions,
        ...chapter22Questions,
        ...chapter23Questions,
      ],
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
    firstQuestion() {
      this.currentIndex = 0;
      this.$refs.inputInteraction.clearAnswer();
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
