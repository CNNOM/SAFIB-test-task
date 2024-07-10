<template>
  <div>
    <span v-for="(crumb, index) in breadcrumbs" :key="index">
      > <router-link :to="crumb.path">{{ crumb.name }}</router-link>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      const breadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs')) || [];
      console.log(breadcrumbs)
      console.log(this.$route)
      console.log(this)


      return breadcrumbs;

    },
    sectionName() {
      const index = this.$route.params.index;
      return this.menuItems[index] ? this.menuItems[index].name : 'Неизвестный раздел';
    }
  }
}
</script>