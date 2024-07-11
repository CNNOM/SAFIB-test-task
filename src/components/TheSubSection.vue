<template>
  <div>
    <Breadcrumbs />
    <h1 class="title">Подраздел {{ subSectionName }}</h1>
    <div v-if="subSectionContent">
      <p>{{ subSectionContent }}</p>
    </div>
    <div v-if="cardsForSubSection.length">
      <div v-for="(card, index) in cardsForSubSection" :key="index" class="wrapper">
        <div class="product-img">
          <img v-if="card.image" :src="card.image" alt="Card Image">
        </div>
        <div class="product-info">
          <div class="product-text">
            <h1>{{ card.title }}</h1>
            <h2>by {{ card.author || 'Unknown' }}</h2>
            <p>{{ card.description }}</p>
          </div>
          <div class="product-price-btn">
            <p><span>{{ card.price || '0' }}</span>$</p>
            <button type="button">buy now</button>
          </div>
        </div>
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


.wrapper {
  height: 420px;
  width: 654px;
  margin: 50px auto;
  border-radius: 7px 7px 7px 7px;
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.product-img img{
  float: left;
  height: 420px;
  width: 327px;
}

.product-img img {
  border-radius: 7px 0 0 7px;
}

.product-info {
  float: left;
  height: 420px;
  width: 327px;
  border-radius: 0 7px 10px 7px;
  background-color: #ffffff;
}

.product-text {
  height: 300px;
  width: 327px;
}

.product-text h1 {
  margin: 0 0 0 38px;
  padding-top: 52px;
  font-size: 34px;
  color: #474747;
}

.product-text h1,
.product-price-btn p {
  font-family: 'Bentham', serif;
}

.product-text h2 {
  margin: 0 0 47px 38px;
  font-size: 13px;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  color: #d2d2d2;
  letter-spacing: 0.2em;
}

.product-text p {
  height: 125px;
  margin: 0 0 0 38px;
  font-family: 'Playfair Display', serif;
  color: #8d8d8d;
  line-height: 1.7em;
  font-size: 15px;
  font-weight: lighter;
  overflow: hidden;
}

.product-price-btn {
  height: 103px;
  width: 327px;
  margin-top: 17px;
  position: relative;
}

.product-price-btn p {
  display: inline-block;
  position: absolute;
  top: -13px;
  height: 50px;
  font-family: 'Trocchi', serif;
  margin: 0 0 0 38px;
  font-size: 28px;
  font-weight: lighter;
  color: #474747;
}

span {
  display: inline-block;
  height: 50px;
  font-family: 'Suranna', serif;
  font-size: 34px;
}

.product-price-btn button {
  float: right;
  display: inline-block;
  height: 50px;
  width: 176px;
  margin: 0 40px 0 16px;
  box-sizing: border-box;
  border: transparent;
  border-radius: 60px;
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ffffff;
  background-color: #5D54A4;
  cursor: pointer;
  outline: none;
}

.product-price-btn button:hover {
  background-color: #7875B5;
}
</style>
