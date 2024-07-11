<template>
  <div class="container">
    <router-link to="/" class="back-link">Вернуться на главную</router-link>
    <div class="screen">
      <div class="screen__content">
        <h1 class="admin-title">Админ панель</h1>
        <div class="forms-container">
          <button @click="showAddMenuItemForm" class="button">Добавить Раздел</button>
        </div>
        <div class="forms-container" v-if="isAddMenuItemFormVisible">
          <form @submit.prevent="addMenuItem" class="admin-form">
            <div class="login__field">
              <i class="login__icon fas fa-folder"></i>
              <input v-model="newItem" class="login__input" placeholder="Новый раздел">
            </div>
            <button type="submit" class="button login__submit">
              <span class="button__text">Добавить раздел</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
      </div>
      <div class="screen__content">
        <div v-for="(item, index) in menuItems" :key="index" class="section">
          <div class="section-header">
            <h2>{{ item.name }}</h2>
            <button @click="showAddSubSectionForm(index)" class="button">Вложить</button>
          </div>
          <ul class="subsections">
            <li v-for="(subsection, subIndex) in item.subsections" :key="subIndex">{{ subsection.name }}</li>
          </ul>
        </div>
      </div>
      <div class="screen__content" v-if="isAddSubSectionFormVisible">
        <div class="forms-container">
          <form @submit.prevent="addSubSection" class="admin-form">
            <div class="login__field">
              <i class="login__icon fas fa-folder"></i>
              <select v-model="selectedSection" class="login__input">
                <option v-for="(item, index) in menuItems" :key="index" :value="index">{{ item.name }}</option>
              </select>
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-folder-open"></i>
              <input v-model="newSubSection" class="login__input" placeholder="Новый подраздел">
            </div>
            <button type="submit" class="button login__submit">
              <span class="button__text">Добавить подраздел</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
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
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      newItem: '',
      newSubSection: '',
      selectedSection: '',
      isAddMenuItemFormVisible: false,
      isAddSubSectionFormVisible: false
    };
  },
  computed: {
    ...mapState(['menuItems'])
  },
  methods: {
    ...mapActions(['addMenuItem', 'addSubSection']),
    addMenuItem() {
      this.$store.dispatch('addMenuItem', { name: this.newItem, subsections: [] });
      this.newItem = '';
      this.isAddMenuItemFormVisible = false;
    },
    addSubSection() {
      this.$store.dispatch('addSubSection', { sectionIndex: this.selectedSection, subsection: { name: this.newSubSection } });
      this.newSubSection = '';
      this.isAddSubSectionFormVisible = false;
    },
    showAddMenuItemForm() {
      this.isAddMenuItemFormVisible = true;
      this.isAddSubSectionFormVisible = false;
    },
    showAddSubSectionForm(index) {
      this.selectedSection = index;
      this.isAddSubSectionFormVisible = true;
    }
  }
}
</script>

<style scoped>
.container {
  overflow: hidden;
}
.screen {
  background: linear-gradient(90deg, #5D54A4, #7C78B8);
  position: relative;
  height: auto;
  padding: 20px;
  width: auto;
  box-shadow: 0px 0px 24px #5C5696;
  display: flex;
  flex-direction: column;
  border-radius: 26px;
}

.login__input {
  background-color: white;
  border-radius: 26px;
  width: 350px;
  border: 1px solid #5C5696;
}

.login__submit {
  width: 350px;
}

.forms-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex: 1;
}

.admin-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
}

.admin-form:last-child {
  margin-right: 0;
}

.login__field {
  margin-bottom: 20px;
}

.button {
  margin-top: auto;
}
.admin-title {
  color: #5C5696;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}
.back-link {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  border: 1px solid white;
  border-radius: 25px;
  padding: 10px;
}

.back-link:hover {
  border: 1px solid #5C5696;
  color: #5C5696;
  background-color: white;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.subsections {
  list-style-type: none;
  padding: 0;
}
</style>