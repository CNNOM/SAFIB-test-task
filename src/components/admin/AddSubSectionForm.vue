<template>
  <div class="forms-container" v-if="isVisible">
    <form @submit.prevent="submitForm" class="admin-form">
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
</template>

<script>
export default {
  props: ['isVisible', 'menuItems'],
  data() {
    return {
      selectedSection: '',
      newSubSection: ''
    };
  },
  methods: {
    submitForm() {
      this.$emit('add-sub-section', { sectionIndex: this.selectedSection, subsection: { name: this.newSubSection, children: [] } });
      this.newSubSection = '';
    }
  }
}
</script>
<style scoped>
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

</style>
