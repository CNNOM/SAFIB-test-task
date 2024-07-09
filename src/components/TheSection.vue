<template>
  <div>
    <h1>{{ menuItem.name }}</h1>
    <p>{{ menuItem.content }}</p>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    menuItem() {
      const index = this.$route.params.index;
      return this.$store.state.menuItems[index];
    }
  }
}
</script>