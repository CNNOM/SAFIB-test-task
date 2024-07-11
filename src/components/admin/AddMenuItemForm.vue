<template>
  <div class="forms-container">
    <form @submit.prevent="handleSubmit" class="admin-form">
      <div class="login__field">
        <i class="login__icon fas fa-folder"></i>
        <input v-model="newItem" class="login__input" placeholder="Новый раздел">
      </div>
      <div class="login__field">
        <i class="login__icon fas fa-image"></i>
        <input type="file" id="card-image" @change="handleImageUpload" class="login__input" accept="image/*">
      </div>
      <button type="submit" class="button login__submit">
        <span class="button__text">Добавить раздел</span>
        <i class="button__icon fas fa-chevron-right"></i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: '',
      newImage: null
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleSubmit() {
      const formData = new FormData();
      formData.append('name', this.newItem);
      if (this.newImage) {
        formData.append('image', this.newImage);
      }
      this.$emit('add-menu-item', formData);
      this.newItem = '';
      this.newImage = null;
      this.$refs.fileInput.value = '';
    }
  }
}
</script>