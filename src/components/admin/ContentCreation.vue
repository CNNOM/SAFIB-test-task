<template>
  <div>
    <router-link to="/" class="back-link-router">Вернуться на главную</router-link>

    <div v-for="(item, index) in menuItems" :key="index" class="section">
      <h2 @click="toggleSubsections(index)">{{ item.name }}</h2>
      <ul v-if="item.showSubsections && item.subsections && item.subsections.length > 0" class="subsections">
        <li v-for="(subsection, subIndex) in item.subsections" :key="subIndex">
          {{ subsection.name ? subsection.name : 'Подразделов нет' }}
          <button @click="selectSubsection(subsection)">Выбрать</button>
        </li>
      </ul>
    </div>

    <div v-if="selectedSubsection" class="card-creation">
      <h3>Создать карточку для {{ selectedSubsection.name }}</h3>
      <form @submit.prevent="createCard">
        <div>
          <label for="card-title">Название:</label>
          <input id="card-title" v-model="newCard.title" required>
        </div>
        <div>
          <label for="card-description">Описание:</label>
          <textarea id="card-description" v-model="newCard.description" required></textarea>
        </div>
        <div>
          <label for="card-features">Характеристики:</label>
          <textarea id="card-features" v-model="newCard.features" required></textarea>
        </div>
        <div>
          <label for="card-image">Изображение:</label>
          <input type="file" id="card-image" @change="handleImageUpload">
        </div>
        <div>
          <label for="card-font">Шрифт:</label>
          <select id="card-font" v-model="newCard.font">
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>
        <div>
          <label for="card-color">Цвет текста:</label>
          <input type="color" id="card-color" v-model="newCard.color">
        </div>
        <button type="submit">Создать карточку</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedSubsection: null,
      newCard: {
        title: '',
        description: '',
        features: '',
        image: null,
        font: 'Arial',
        color: '#000000'
      },
      cards: []
    };
  },
  computed: {
    ...mapState(['menuItems'])
  },
  methods: {
    selectSubsection(subsection) {
      this.selectedSubsection = subsection;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newCard.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    createCard() {
      const card = {...this.newCard, subsection: this.selectedSubsection.name};
      this.cards.push(card);
      this.saveCardsToLocalStorage();
      this.newCard = {
        title: '',
        description: '',
        features: '',
        image: null,
        font: 'Arial',
        color: '#000000'
      };
    },
    saveCardsToLocalStorage() {
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },
    loadCardsFromLocalStorage() {
      const cards = JSON.parse(localStorage.getItem('cards')) || [];
      this.cards = cards;
    },
    toggleSubsections(index) {
      this.$store.commit('toggleSubsections', index);
    }
  },
  mounted() {
    this.loadCardsFromLocalStorage();
  }
};
</script>

<style scoped>
.section {
  margin-bottom: 20px;
}

.section h2 {
  cursor: pointer;
}

.subsections li {
  cursor: pointer;
  margin-bottom: 5px;
}

.card-creation form {
  display: flex;
  flex-direction: column;
}

.card-creation label {
  margin-top: 10px;
}

.cards-display .card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
}

.cards-display img {
  max-width: 100%;
  height: auto;
}
</style>