<template>
  <div>
    <KnowledgeCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
      @edit-card="$emit('edit-card', $event)"
      @delete-card="$emit('delete-card', $event)"
    />
  </div>
</template>

<script>
import KnowledgeCard from './KnowledgeCard.vue';

export default {
  name: 'CardList',
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
  components: {
    KnowledgeCard,
  },
};
</script>

<style scoped></style>
