<template>
  <div class="container">
    <router-link to="/" class="back-link">Вернуться на главную</router-link>
    <div class="screen">
      <div class="screen__content">
        <h1 class="admin-title">Админ панель</h1>
        <div class="forms-container">
          <button @click="showAddMenuItemForm" class="button">Добавить Раздел</button>
        </div>
        <add-menu-item-form :isVisible="isAddMenuItemFormVisible" @add-menu-item="addMenuItem" />
      </div>
      <div class="screen__content">
        <div v-for="(item, index) in menuItems" :key="index" class="section">
          <nested-section :item="item" :index="index" @addSubSection="showAddSubSectionForm" />
        </div>
      </div>
      <add-sub-section-form :isVisible="isAddSubSectionFormVisible" :menuItems="menuItems" @add-sub-section="addSubSection" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NestedSection from '@/components/admin/NestedSection.vue';
import AddMenuItemForm from '@/components/admin/AddMenuItemForm.vue';
import AddSubSectionForm from '@/components/admin/AddSubSectionForm.vue';

export default {
  components: {
    NestedSection,
    AddMenuItemForm,
    AddSubSectionForm
  },
  data() {
    return {
      isAddMenuItemFormVisible: false,
      isAddSubSectionFormVisible: false
    };
  },
  computed: {
    ...mapState(['menuItems'])
  },
  methods: {
    ...mapActions(['addMenuItem', 'addSubSection']),
    showAddMenuItemForm() {
      this.isAddMenuItemFormVisible = true;
      this.isAddSubSectionFormVisible = false;
    },
    showAddSubSectionForm(index) {
      this.selectedSection = index;
      this.isAddSubSectionFormVisible = true;
    },
    addMenuItem(newItem) {
      this.$store.dispatch('addMenuItem', { name: newItem, children: [] });
      this.isAddMenuItemFormVisible = false;
    },
    addSubSection(data) {
      this.$store.dispatch('addSubSection', data);
      this.isAddSubSectionFormVisible = false;
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