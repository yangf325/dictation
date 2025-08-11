<template>
  <div class="recite-page">
    <!-- 固定筛选区域 -->
    <div class="filter-container">
      <div class="filter-title">筛选条件</div>
      <div class="filter-item">
        <label>章节筛选</label>
        <select v-model="selectedChapter" @change="filterQuestions">
          <option value="">全部章节</option>
          <option
            v-for="chapter in uniqueChapters"
            :key="chapter"
            :value="chapter"
          >
            {{ chapter }}
          </option>
        </select>
      </div>
      <div class="filter-item">
        <label>级别筛选</label>
        <select v-model="selectedLevel" @change="filterQuestions">
          <option value="">全部级别</option>
          <option value="1">必备(1)</option>
          <option value="2">重要(2)</option>
          <option value="3">可选(3)</option>
        </select>
      </div>
    </div>

    <!-- 背诵卡片区域 -->
    <div class="card-container" ref="cardContainer">
      <div
        v-for="(question, index) in filteredQuestions"
        :key="index"
        class="question-card"
      >
        <div class="card-header">
          <div
            class="level-tag"
            :class="{
              'level-1': question.level === 1,
              'level-2': question.level === 2,
              'level-3': question.level === 3,
            }"
          >
            {{ levelLabels[question.level] }}
          </div>
          <div class="question-chapter">第{{ question.chapter }}章</div>
        </div>
        <div class="card-body">
          <h3 class="question-title">{{ question.title }}</h3>
          <div class="question-short" v-if="question.short">
            <span class="short-label">速记:</span> {{ question.short }}
          </div>
          <div class="question-answer">
            <div class="answer-title">答案:</div>
            <ul>
              <li
                class="answer-item"
                v-for="(ans, ansIndex) in question.answer"
                :key="ansIndex"
              >
                {{ ans }}
              </li>
            </ul>
          </div>
        </div>
        <div class="card-footer">
          {{ index + 1 }}/{{ filteredQuestions.length }}
        </div>
      </div>
    </div>

    <!-- 回到顶部按钮 -->
    <button class="back-to-top" v-if="showBackToTop" @click="scrollToTop">
      ↑
    </button>
  </div>
</template>

<script>
import questions from "../datas/data.js";
import chapter5Questions from "../datas/data5.js";
import chapter6Questions from "../datas/data6.js";
import chapter7Questions from "../datas/data7.js";
import chapter8Questions from "../datas/data8.js";
import chapter9to11Questions from "../datas/data9.js";
import chapter12Questions from "../datas/data12.js";
import chapter13Questions from "../datas/data13.js";
import chapter14Questions from "../datas/data14.js";
import chapter15Questions from "../datas/data15.js";
import chapter16Questions from "../datas/data16.js";
import chapter17Questions from "../datas/data17.js";

export default {
  name: "RecitePage",
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
      ],
      filteredQuestions: [],
      selectedChapter: "",
      selectedLevel: "",
      showBackToTop: false,
      levelLabels: {
        1: "必备",
        2: "重要",
        3: "可选",
      },
    };
  },
  computed: {
    uniqueChapters() {
      return [
        ...new Set(this.allQuestions.map((question) => question.chapter)),
      ].sort((a, b) => a - b);
    },
  },
  mounted() {
    this.filterQuestions();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    filterQuestions() {
      this.filteredQuestions = this.allQuestions.filter((question) => {
        const chapterMatch =
          !this.selectedChapter ||
          question.chapter === parseInt(this.selectedChapter);
        const levelMatch =
          !this.selectedLevel ||
          question.level === parseInt(this.selectedLevel);
        return chapterMatch && levelMatch;
      });
    },
    handleScroll() {
      this.showBackToTop = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
/* 基础样式 */
.recite-page {
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 80px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* 筛选区域样式 */
.filter-container {
  top: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.filter-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.filter-item {
  margin-bottom: 10px;
}

.filter-item label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
}

.filter-item select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

/* 卡片容器样式 */
.card-container {
  padding: 15px;
}

/* 问题卡片样式 */
.question-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.level-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

.level-1 {
  background-color: #c00000;
}

.level-2 {
  background-color: #9933ff;
}

.level-3 {
  background-color: #ffcc00;
}

.question-chapter {
  font-size: 24px;
  color: #666;
}

.card-body {
  flex: 1;
}

.question-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.question-short {
  background-color: #f5f5f5;
  font-size: 28px;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.short-label {
  font-weight: bold;
  color: #666;
  margin-right: 5px;
}

.question-answer {
  margin-top: 15px;
}

.answer-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.question-answer ul {
  padding-left: 20px;
  margin: 0;
}

.question-answer li {
  margin-bottom: 8px;
  line-height: 1.5;
  color: #444;
}

.card-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}
.answer-item {
  font-size: 28px;
  font-weight: bold;
}

/* 回到顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #409eff;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.back-to-top:hover {
  background-color: #2e8ae6;
}
</style>
