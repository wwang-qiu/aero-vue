<template>
  <div class="cards">
    <homeItem v-for="item in stats" :key="item.title" :item="item"></homeItem>
  </div>
</template>

<script setup>
import homeItem from "./homeItem.vue";

defineProps({
  stats: {
    type: Array,
    required: true,
  },
});
</script>

<style>
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>
