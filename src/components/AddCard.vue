<template>
  <div>
    <form @submit.prevent="submitCard">
      <input v-model="question" placeholder="輸入問題" required />
      <textarea v-model="answer" placeholder="輸入答案" required></textarea>
      <select v-model="category" required>
        <option disabled value="">選擇分類</option>
        <option>Vue</option>
        <option>Vue3</option>
        <option>ES6</option>
        <option>JavaScript</option>
        <option>CSS</option>
      </select>
      <button type="submit">新增卡片</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: '',
      answer: '',
      category: '',
    };
  },
  methods: {
    submitCard() {
      const newCard = {
        question: this.question,
        answer: this.answer,
        category: this.category,
        rating: 0, // 設置新卡片的初始評分為 0
      };
      this.$emit('add-card', newCard);
      this.question = '';
      this.answer = '';
      this.category = '';
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

input,
textarea,
select,
button {
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

textarea {
  resize: vertical; /* 允許垂直調整大小 */
  min-height: 100px; /* 設置最小高度 */
}

button {
  background-color: #6200ea;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #3700b3;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

/* RWD 斷點 */
@media (max-width: 768px) {
  form {
    width: 90%;
  }
}
</style>
