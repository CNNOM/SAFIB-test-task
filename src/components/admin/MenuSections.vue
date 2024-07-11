<template>
  <div v-for="(item, index) in menuItems" :key="index" class="section">
    <div class="section-header">
      <h2>{{ item.name }}</h2>
      <button @click="$emit('add-sub-section', index)" class="button">Вложить {{index}}</button>
    </div>
    <ul class="subsections">
      <li v-for="(subsection, subIndex) in item.subsections" :key="subIndex">{{ subsection.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['menuItems']
}
</script>

<style scoped>

.button {
  margin-top: auto;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.subsections {
  list-style-type: none;
  padding: 0;
}
</style>