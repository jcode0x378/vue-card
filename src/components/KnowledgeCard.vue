<template>
  <div class="card">
    <div v-if="isEditing">
      <input v-model="editedQuestion" placeholder="輸入問題" />
      <textarea v-model="editedAnswer" placeholder="輸入答案"></textarea>
      <div class="stars">
        <span v-for="star in 5" :key="star" @click="setRating(star)">
          <i :class="star <= editedRating ? 'fas fa-star' : 'far fa-star'"></i>
        </span>
      </div>
      <div class="button-group">
        <button class="small-button" @click="saveEdit">保存</button>
        <button class="small-button" @click="cancelEdit">取消</button>
      </div>
    </div>
    <div v-else>
      <p>{{ card.question }}</p>
      <button @click="showAnswer = !showAnswer">
        {{ showAnswer ? '隱藏答案' : '顯示答案' }}
      </button>
      <p v-if="showAnswer" v-html="formattedAnswer" class="answer"></p>
      <div class="stars">
        <span v-for="star in 5" :key="star" @click="setRating(star)">
          <i :class="star <= card.rating ? 'fas fa-star' : 'far fa-star'"></i>
        </span>
      </div>
      <div class="button-group">
        <button class="small-button" @click="startEdit">編輯</button>
        <button class="small-button" @click="confirmDelete">刪除</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KnowledgeCard',
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showAnswer: false,
      isEditing: false,
      editedQuestion: '',
      editedAnswer: '',
      editedRating: 0,
    };
  },
  computed: {
    formattedAnswer() {
      return this.card.answer.replace(/\n/g, '<br>');
    },
  },
  methods: {
    startEdit() {
      this.isEditing = true;
      this.editedQuestion = this.card.question;
      this.editedAnswer = this.card.answer.replace(/<br>/g, '\n');
      this.editedRating = this.card.rating || 0;
    },
    saveEdit() {
      this.isEditing = false;
      this.$emit('edit-card', {
        ...this.card,
        question: this.editedQuestion,
        answer: this.editedAnswer.replace(/\n/g, '<br>'),
        rating: this.editedRating,
      });
    },
    cancelEdit() {
      this.isEditing = false;
    },
    setRating(star) {
      if (this.isEditing) {
        this.editedRating = this.editedRating === star ? star - 1 : star;
      } else {
        const newRating = this.card.rating === star ? star - 1 : star;
        this.$emit('edit-card', {
          ...this.card,
          rating: newRating,
        });
      }
    },
    confirmDelete() {
      if (confirm('確定要刪除這張卡片嗎？')) {
        this.$emit('delete-card', this.card.id);
      }
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  width: 400px;
  box-sizing: border-box;
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

button {
  background-color: #6200ea;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  margin: 10px 0;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

button:hover {
  background-color: #3700b3;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.small-button {
  padding: 5px 10px;
  width: auto;
}

input,
textarea {
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.stars {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.stars i {
  color: #ffd700; /* 金色 */
  cursor: pointer;
  margin: 0 5px;
}

.answer {
  text-align: left;
}

/* RWD 斷點 */
@media (max-width: 768px) {
  .card {
    width: 90%;
  }
}
</style>
