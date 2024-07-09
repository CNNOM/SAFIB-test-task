<template>
  <div>
    <router-link to="/">Вернуться на главную</router-link>

    <h1>Админ меню</h1>
    <form @submit.prevent="addMenuItem">
      <input v-model="newItem.name" placeholder="Name" />
      <input v-model="newItem.url" placeholder="URL" />
      <input v-model="newItem.content" placeholder="Content" />
      <button type="submit">Добавить</button>
    </form>
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        {{ item.name }} - {{ item.url }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      newItem: {name: '', url: '', content: ''}
    };
  },
  computed: {
    ...mapState(['menuItems'])
  },
  methods: {
    ...mapActions(['addMenuItem']),
    addMenuItem() {
      this.$store.dispatch('addMenuItem', this.newItem);
      this.newItem = {name: '', url: '', content: ''};
    }
  }
}
</script>