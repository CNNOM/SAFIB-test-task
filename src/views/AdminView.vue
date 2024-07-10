<template>
  <div>
    <router-link to="/">Вернуться на главную</router-link>

    <h1>Админ панель</h1>
    <form @submit.prevent="addMenuItem">
      <input v-model="newItem" placeholder="Новый раздел">
      <textarea v-model="newItemContent" placeholder="Содержание раздела"></textarea>
      <button type="submit">Добавить раздел</button>
    </form>
    <form @submit.prevent="addSubSection">
      <select v-model="selectedSection">
        <option v-for="(item, index) in menuItems" :key="index" :value="index">{{ item.name }}</option>
      </select>
      <input v-model="newSubSection" placeholder="Новый подраздел">
      <textarea v-model="newSubSectionContent" placeholder="Содержание подраздела"></textarea>
      <button type="submit">Добавить подраздел</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      newItem: '',
      newItemContent: '',
      newSubSection: '',
      newSubSectionContent: '',
      selectedSection: ''
    };
  },
  computed: {
    ...mapState(['menuItems'])
  },
  methods: {
    ...mapActions(['addMenuItem', 'addSubSection']),
    addMenuItem() {
      this.$store.dispatch('addMenuItem', {name: this.newItem, content: this.newItemContent});
      this.newItem = '';
      this.newItemContent = '';
    },
    addSubSection() {
      this.$store.dispatch('addSubSection', {
        index: this.selectedSection,
        subsection: {name: this.newSubSection, content: this.newSubSectionContent}
      });
      this.newSubSection = '';
      this.newSubSectionContent = '';
    }
  }
}
</script>