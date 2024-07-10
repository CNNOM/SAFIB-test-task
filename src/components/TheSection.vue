<template>
  <div>
    <Breadcrumbs />

    <h1>Раздел {{ sectionName }}</h1>
    <div v-if="sectionContent">
      <p>{{ sectionContent }}</p>
    </div>
    <ul v-if="menuItems[$route.params.index] && menuItems[$route.params.index].subsections">
      <li v-for="(subsection, subIndex) in menuItems[$route.params.index].subsections" :key="subIndex">
        <router-link :to="`/section/${$route.params.index}/${subIndex}`">{{ subsection.name }}</router-link>
      </li>
    </ul>
    <p v-else>Нет доступных подразделов.</p>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: { Breadcrumbs },
  computed: {
    ...mapState(['menuItems']),
    sectionName() {
      const index = this.$route.params.index;
      return this.menuItems[index] ? this.menuItems[index].name : 'Неизвестный раздел';
    },
    sectionContent() {
      const index = this.$route.params.index;
      return this.menuItems[index].content;
    }
  }
}
</script>
<style scoped>
</style>