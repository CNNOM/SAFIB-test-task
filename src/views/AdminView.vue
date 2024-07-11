<template>
  <div class="container">
    <div class="back-link">
      <router-link to="/" class="back-link-router">Вернуться на главную</router-link>
      <router-link to="/content" class="back-link-router">создать карточку</router-link>
    </div>
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

    addMenuItem(formData) {
      const item = {
        name: formData.get('name'),
        image: formData.get('image'),
        subsections: []
      };
      this.$store.dispatch('addMenuItem', item);
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.screen {
  background: linear-gradient(90deg, #5D54A4, #7C78B8);
  position: relative;
  height: 600px;
  width: 360px;
  box-shadow: 0px 0px 24px #5C5696;
}

.screen__content {
  z-index: 1;
  position: relative;
  height: 100%;
}

.screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #FFF;
  top: -50px;
  right: 120px;
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #6C63AC;
  top: -172px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #5D54A4, #6A679E);
  top: -24px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: #7E7BB9;
  top: 420px;
  right: 50px;
  border-radius: 60px;
}

.login {
  width: 320px;
  padding: 30px;
  padding-top: 156px;
}

.login__field {
  padding: 20px 0px;
  position: relative;
}

.login__icon {
  position: absolute;
  top: 30px;
  color: #7875B5;
}

.login__input {
  border: none;
  border-bottom: 2px solid #D1D1D4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  font-weight: 700;
  width: 75%;
  transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
  outline: none;
  border-bottom-color: #6A679E;
}

.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #4C489D;
  box-shadow: 0px 2px 2px #5C5696;
  cursor: pointer;
  transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
  border-color: #6A679E;
  outline: none;
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: #7875B5;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.screen {
  background: linear-gradient(90deg, #5D54A4, #7C78B8);
  position: relative;
  height: 600px;
  width: 360px;
  box-shadow: 0px 0px 24px #5C5696;
}

.screen__content {
  z-index: 1;
  position: relative;
  height: 100%;
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
  display: block;
  top: 20px;
  right: 20px;

}

.back-link-router{
  top: 20px;
  right: 20px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  border: 1px solid white;
  border-radius: 25px;
  padding: 10px;
}

.back-link-router:hover {
  border: 1px solid #5C5696;
  color: #5C5696;
  background-color: white;
}


</style>