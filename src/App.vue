<template>
  <div id="app">
    <NavigationBar
      :categories="categoriesWithCount"
      @select-category="selectCategory"
    />
    <AddCard @add-card="addCard" />
    <div class="card-list">
      <CardList
        :cards="sortedCards"
        @edit-card="editCard"
        @delete-card="deleteCard"
      />
    </div>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import AddCard from './components/AddCard.vue';
import CardList from './components/CardList.vue';
import NavigationBar from './components/NavigationBar.vue';

export default {
  components: {
    AddCard,
    CardList,
    NavigationBar,
  },
  data() {
    return {
      cards: [],
      categories: ['所有', 'Vue', 'Vue3', 'ES6', 'JavaScript', 'CSS'],
      selectedCategory: '所有',
    };
  },
  computed: {
    filteredCards() {
      if (this.selectedCategory === '所有') {
        return this.cards;
      }
      return this.cards.filter(card => card.category === this.selectedCategory);
    },
    sortedCards() {
      return this.filteredCards.sort((a, b) => a.rating - b.rating);
    },
    categoriesWithCount() {
      const categoryCount = this.categories.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
      }, {});

      this.cards.forEach(card => {
        if (categoryCount[card.category] !== undefined) {
          categoryCount[card.category]++;
        }
      });

      return this.categories.map(
        category => `${category} (${categoryCount[category]})`,
      );
    },
  },
  methods: {
    async fetchCards() {
      try {
        const querySnapshot = await getDocs(collection(db, 'cards'));
        this.cards = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    },
    async addCard(card) {
      try {
        card.rating = 0; // 設置新卡片的初始評分為 0
        const docRef = await addDoc(collection(db, 'cards'), card);
        this.cards.push({ id: docRef.id, ...card });
        this.sortCards(); // 添加卡片後立即排序
      } catch (error) {
        console.error('Error adding card:', error);
      }
    },
    async deleteCard(id) {
      try {
        await deleteDoc(doc(db, 'cards', id));
        this.cards = this.cards.filter(card => card.id !== id);
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    },
    async editCard(updatedCard) {
      try {
        const cardRef = doc(db, 'cards', updatedCard.id);
        await updateDoc(cardRef, {
          question: updatedCard.question,
          answer: updatedCard.answer,
          rating: updatedCard.rating,
        });
        this.cards = this.cards.map(card =>
          card.id === updatedCard.id ? updatedCard : card,
        );
        this.sortCards(); // 編輯卡片後立即排序
      } catch (error) {
        console.error('Error editing card:', error);
      }
    },
    sortCards() {
      this.cards.sort((a, b) => a.rating - b.rating);
    },
    selectCategory(category) {
      this.selectedCategory = category.split(' ')[0]; // 去掉計數部分
    },
  },
  created() {
    this.fetchCards();
  },
};
</script>

<style>
/* 全局樣式 */
body {
  background-color: #121212; /* 深色背景 */
  color: #ffffff; /* 字體顏色 */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  text-align: center;
  margin-top: 60px;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
