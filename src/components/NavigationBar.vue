<template>
  <div class="navigation-bar">
    <button
      v-for="category in categories"
      :key="category"
      @click="$emit('select-category', category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.navigation-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

button {
  background-color: #6200ea;
  color: #ffffff;
  border: none;
  border-radius: 5px; /* 圓角 */
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s; /* 特效 */
  margin: 0 5px; /* 按鈕之間的間距 */
}

button:hover {
  background-color: #3700b3;
  transform: scale(1.05); /* 放大效果 */
}

button:active {
  transform: scale(0.95); /* 點擊效果 */
}
</style>
