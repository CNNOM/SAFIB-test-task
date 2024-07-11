<template>
  <div class="section">
    <div class="section-header">
      <h2>{{ item.name }}</h2>
      <button @click="showAddSubSectionForm(index)" class="button">Вложить</button>
    </div>
    <ul class="subsections">
      <li v-for="(subsection, subIndex) in item.children" :key="subIndex">
        {{ subsection.name }}
        <nested-section :item="subsection" :index="subIndex" @addSubSection="showAddSubSectionForm" :depth="depth + 1" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NestedSection',
  props: ['item', 'index', 'depth'],
  methods: {
    showAddSubSectionForm(index) {
      this.$emit('addSubSection', index);
    }
  }
}
</script>

<style scoped>
.section {
  margin-left: calc(1rem * v-bind(depth));
}

.subsections {
  list-style-type: none;
  padding: 0;
}

.subsections li {
  margin-left: 1rem;
}
</style>