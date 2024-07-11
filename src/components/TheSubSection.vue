<template>
  <div>
    <Breadcrumbs />
    <h1 class="title">Подраздел {{ subSectionName }}</h1>
    <div v-if="subSectionContent">
      <p>{{ subSectionContent }}</p>
    </div>
    <div v-if="cardsForSubSection.length">
      <h2>Карточки для этого подраздела:</h2>
      <div v-for="(card, index) in cardsForSubSection" :key="index" class="card">
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
        <p>{{ card.features }}</p>
        <img v-if="card.image" :src="card.image" alt="Card Image">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: { Breadcrumbs },
  data() {
    return {
      cards: []
    };
  },
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
    },
    cardsForSubSection() {
      const index = this.$route.params.index;
      const subIndex = this.$route.params.subIndex;
      return this.cards.filter(card => card.subsection === this.menuItems[index].subsections[subIndex].name);
    }
  },
  mounted() {
    this.loadCardsFromLocalStorage();
    console.log(window.location.href);
  },
  methods: {
    loadCardsFromLocalStorage() {
      const cards = JSON.parse(localStorage.getItem('cards')) || [];
      this.cards = cards;
    }
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

.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
}

.card img {
  max-width: 100%;
  height: auto;
}
</style>
