<template>
  <div>    <router-link to="/">Вернуться на главную</router-link>


    <h1>Админ панель</h1>
    <form @submit.prevent="addMenuItem">
      <input v-model="newItem" placeholder="Новый раздел">
      <button type="submit">Добавить раздел</button>
    </form>
    <form @submit.prevent="addSubSection">
      <select v-model="selectedSection">
        <option v-for="(item, index) in menuItems" :key="index" :value="index">{{ item.name }}</option>
      </select>
      <input v-model="newSubSection" placeholder="Новый подраздел">
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
      newSubSection: '',
      selectedSection: ''
    };
  },
  computed: {
    ...mapState(['menuItems'])
  },
  methods: {
    ...mapActions(['addMenuItem', 'addSubSection']),
    addMenuItem() {
      this.$store.dispatch('addMenuItem', { name: this.newItem });
      this.newItem = '';
    },
    addSubSection() {
      this.$store.dispatch('addSubSection', { index: this.selectedSection, subsection: { name: this.newSubSection } });
      this.newSubSection = '';
    }
  }
}
</script>