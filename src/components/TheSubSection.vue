<template>
  <div>
    <Breadcrumbs />
    <h1 class="title">Подраздел {{ subSectionName }}</h1>
    <div v-if="subSectionContent">
      <p>{{ subSectionContent }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: { Breadcrumbs },
  computed: {
    ...mapState(['menuItems']),
    subSectionName() {
      const index = this.$route.params.index;
      const subIndex = this.$route.params.subIndex;
      return this.menuItems[index] && this.menuItems[index].subsections[subIndex]
          ? this.menuItems[index].subsections[subIndex].name
          : 'Неизвестный подраздел';
    },
    subSectionContent() {
      const index = this.$route.params.index;
      const subIndex = this.$route.params.subIndex;
      return this.menuItems[index].subsections[subIndex].content;
    }
  },
  mounted() {
    console.log(window.location.href);
  }
}
</script>
<style scoped>
.title {
  color: #5C5696;
  font-size: 24px;
  margin: 20px;
  text-align: center;
}
</style>