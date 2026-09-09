<template>
  <div class="card">
    <h3>{{ item.title }}</h3>
    <p>{{ item.value }}</p>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style>
.card {
  background: white;
  padding: 30px;
  border-radius: 10px;
}
</style>
