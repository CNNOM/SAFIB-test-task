<template>
  <div>
    <router-link to="/">Вернуться на главную</router-link>

    <h1>Авторизация</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username">
      <input v-model="password" type="password" placeholder="Пароль">
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      const success = await this.$store.dispatch('login', {username: this.username, password: this.password});
      if (success) {
        this.$router.push('/admin');
      } else {
        alert('Invalid credentials');
      }
    }
  }
}
</script>