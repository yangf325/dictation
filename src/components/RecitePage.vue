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
          <button
            class="mode-toggle-btn"
            @click="toggleMode(index)"
            :class="{ mode2: cardModes[index] == 'read' }"
          >
            {{ modes[cardModes[index]] }}
          </button>
          <div class="question-chapter">第{{ question.chapter }}章</div>
        </div>
        <div class="card-body">
          <h3 class="question-title">{{ question.title }}</h3>
          <div class="question-short" v-if="question.short">
            <span class="short-label">速记:</span> {{ question.short }}
          </div>
          <div class="answer-input-container">
            <div class="question-answer" v-if="cardModes[index] === 'read'">
              <div class="answer-title">答案:</div>
              <ul>
                <li
                  class="answer-item"
                  v-for="(ans, ansIndex) in question.answer"
                  :key="ansIndex"
                >
                  {{ansIndex + 1}}、{{ ans }}
                </li>
              </ul>
            </div>
            <div class="input-area" v-else>
              <textarea
                v-model="userAnswers[index]"
                placeholder="请输入答案..."
                :rows="Math.max(3, question.answer.length)"
              ></textarea>
            </div>
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
// 导入18-23章数据
import chapter18Questions from "../datas/data18.js";
import chapter19Questions from "../datas/data19.js";
import chapter20Questions from "../datas/data20.js";
import chapter21Questions from "../datas/data21.js";
import chapter22Questions from "../datas/data22.js";
import chapter23Questions from "../datas/data23.js";

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
        ...chapter18Questions,
        ...chapter19Questions,
        ...chapter20Questions,
        ...chapter21Questions,
        ...chapter22Questions,
        ...chapter23Questions,
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
      // 新增模式相关状态
      modes: {
        read: "去默写",
        write: "去阅读",
      },
      cardModes: {}, // 存储每个卡片的模式
      userAnswers: {}, // 存储用户的答案
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
      // 初始化所有卡片模式为阅读模式
      this.filteredQuestions.forEach((_, index) => {
        this.$set(this.cardModes, index, "read");
        this.$set(this.userAnswers, index, "");
      });
    },
    handleScroll() {
      this.showBackToTop = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    // 新增切换模式方法
    toggleMode(index) {
      const currentMode = this.cardModes[index];
      const newMode = currentMode === "read" ? "write" : "read";
      this.$set(this.cardModes, index, newMode);
    },
    // 新增检查答案方法
    checkAnswer(index) {
      const question = this.filteredQuestions[index];
      const userAnswer = this.userAnswers[index];
      // 这里可以实现答案检查逻辑
      alert(
        `你的答案:\n${userAnswer}\n\n正确答案:\n${question.answer.join("\n")}`
      );
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
  padding: 5px;
}

/* 问题卡片样式 */
.question-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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

/* 新增模式切换按钮样式 */
.mode-toggle-btn {
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 22px;
  cursor: pointer;
  margin: 0 5px;
  width: 120px;
  height: 40px;
}
.mode-toggle-btn.mode2 {
  background-color: #34a853;
}

.question-chapter {
  font-size: 24px;
  color: #666;
}

.card-body {
  flex: 1;
}

.question-title {
  font-size: 22px;
  font-weight: bold;
  margin: 5px 0;
  color: #333;
}

.question-short {
  background-color: #f5f5f5;
  font-size: 20px;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 5px;
}

.short-label {
  font-weight: bold;
  color: #666;
  margin-right: 5px;
}

/* 答案和输入框容器 */
.answer-input-container {
  display: flex;
  flex-direction: column;
  min-height: 100px;
}

.question-answer {
  margin-top: 15px;
  flex: 1;
}

.answer-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.question-answer ul {
  padding-left: 0px;
  margin: 0;
}

.question-answer li {
  margin-bottom: 8px;
  line-height: 1.5;
}

/* 输入区域样式 */
.input-area {
  margin-top: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.input-area textarea {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 18px;
  resize: none;
  min-height: 100px;
}

.check-answer-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #34a853;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-start;
}

.card-footer {
  text-align: right;
  margin-top: 10px;
  font-size: 16px;
  color: #666;
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4285f4;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* 手机适配样式 */
@media (max-width: 600px) {
  .card-header {
    flex-wrap: wrap;
  }

  .level-tag,
  .mode-toggle-btn,
  .question-chapter {
    margin: 3px 0;
  }

  .mode-toggle-btn {
    order: 3;
  }
  .answer-item{
    list-style: none;
    padding: 0;
  }
}
</style>
