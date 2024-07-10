<template>

  <div class="container">
    <div class="screen">
      <div class="screen__content">
        <form class="login" @submit.prevent="login">
          <div class="login__field">
            <i class="login__icon fas fa-user"></i>
            <input  v-model="username" type="text" class="login__input" placeholder="User name / Email">
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input v-model="password" type="password" class="login__input" placeholder="Password">
          </div>
          <button class="button login__submit" type="submit">
            <span class="button__text">Log In Now</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </button>
        </form>
      </div>
      <div class="screen__background">
        <span class="screen__background__shape screen__background__shape4"></span>
        <span class="screen__background__shape screen__background__shape3"></span>
        <span class="screen__background__shape screen__background__shape2"></span>
        <span class="screen__background__shape screen__background__shape1"></span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

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

<style scoped>

</style>