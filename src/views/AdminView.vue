<template>
  <div class="container">
    <router-link to="/" class="back-link">Вернуться на главную</router-link>
    <div class="screen">
      <div class="screen__content">
        <h1 class="admin-title">Админ панель</h1>
        <div class="forms-container">
          <button
              @click="showAddMenuItemForm"
              class="button">Добавить Раздел</button>
        </div>
        <AddMenuItemForm
            v-if="isAddMenuItemFormVisible"
            @add-menu-item="addMenuItem" />
      </div>
      <div class="screen__content">
        <MenuSections
            :menuItems="menuItems"
            @add-sub-section="showAddSubSectionForm" />
      </div>
      <AddSubSectionForm
          v-if="isAddSubSectionFormVisible"
          :menuItems="menuItems"
          :selectedSection="selectedSection"
          @add-sub-section="addSubSection" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AddMenuItemForm from '@/components/admin/AddMenuItemForm.vue';
import AddSubSectionForm from '@/components/admin/AddSubSectionForm.vue';
import MenuSections from '@/components/admin/MenuSections.vue';

export default {
  components: {
    AddMenuItemForm,
    AddSubSectionForm,
    MenuSections
  },
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
    addMenuItem(item) {
      this.$store.dispatch('addMenuItem', { name: item, subsections: [] });
      this.isAddMenuItemFormVisible = false;
    },
    addSubSection(data) {
      console.log(this.selectedSection);
      this.$store.dispatch('addSubSection', { sectionIndex: data.sectionIndex, subsection: { name: data.subsection } });
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


.forms-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex: 1;
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


</style>