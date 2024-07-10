<template>
  <div>
    <breadcrumbs/>
    <router-link to="/admin">админ</router-link>
    <br>
    <router-link to="/login">логин</router-link>

    <h1>Главная</h1>
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <router-link :to="`/section/${index}`">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: {Breadcrumbs},
  computed: {
    ...mapState(['menuItems'])
  }
}
</script>
<style scoped>
</style>